const express = require('express');
const router = express.Router();
const { check, validationResult} = require ('express-validator');
const auth = require('../../middleware/auth');

const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const checkObjectId = require('../../middleware/checkObjectId');

//@rout Post api/posts
//@desc Cria uma sala 
//@access private 

router.post('/',[auth ,
    [
    check('text','Texto é requerido!').not().isEmpty()    
    ]
], 
async (req,res)=> {
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({error: errors.array()});
    }

    try {
        const user = await User.findById(req.user.id).select('-password');

        const newPost = new Post ({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        });

        const post = await newPost.save();
        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }

    
});

//@rout Get api/posts
//@desc Busca todas as salas 
//@access private 

router.get("/",auth , async (req,res) => {
    try {
        const posts = await Post.find().sort({ date: -1});
        res.json(posts)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

//@rout Get api/posts/:id
//@desc Busca a sala por id 
//@access private 

router.get("/:id",auth , async (req,res) => {
    try {
        const post = await Post.findById(req.params.id);
        
        if (!post){
            return res.status(500).json({msg: 'Sala não foi encontrada'})
        }
        
        res.json(post);
    } catch (err) {
        console.error(err.message);
        if (!err.kind === 'ObjectId'){
            return res.status(500).json({msg: 'Sala não foi encontrada'})
        };
        res.status(500).send('Server error');
    }
});


//@rout DELTE api/posts/id
//@desc Delete sala por id 
//@access private 

router.delete("/:id",auth , async (req,res) => {
    try {
        const post = await Post.findById(req.params.id);
        
        if (!post){
            return res.status(401).json({msg: 'Sala não foi encontrada!'})
        };

        //chech user
        if(post.user.toString() !== req.user.id){
                return res.status(401).json({msg:'user não autorizado'})
        }

        await post.remove();      
        res.json({msg: 'Sala removida'});
    } catch (err) {
        console.error(err.message);
        if (!err.kind === 'ObjectId'){
            return res.status(500).json({msg: 'Sala não foi encontrada'})
        };
        res.status(500).send('Server error');
    }
});

//@rout PUT api/posts/like/:id 
//@desc Like a sala 
//@access private 

router.put('/like/:id',auth,async (req, res) =>{
    try {
        const post = await Post.findById(req.params.id);
    
        // Check if the post has already been liked
        if (post.likes.some(like => like.user.toString() === req.user.id)) {
          return res.status(400).json({ msg: 'Sala ja tem like' });
        }
    
        post.likes.unshift({ user: req.user.id });
    
        await post.save();
    
        return res.json(post.likes);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
});


//@rout PUT api/posts/unlike/:id 
//@desc remove like da sala 
//@access private 

router.put('/unlike/:id',auth,async (req, res) =>{
    try {
        const post = await Post.findById(req.params.id);

        // Check if the post has not yet been liked
        if (!post.likes.some(like => like.user.toString() === req.user.id)) {
        return res.status(400).json({ msg: 'Post has not yet been liked' });
        }
        
    
         // remove the like
        post.likes = post.likes.filter(
        ({ user }) => user.toString() !== req.user.id
        );

        await post.save();
    
        return res.json(post.likes);

          } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
});


//@rout POST api/posts/Comment/:id
//@desc Comenta a sala  
//@access private 

router.post(
    '/comment/:id',
    [
      auth,
      
      [check('text', 'Text is required').not().isEmpty()]
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      try {
        const user = await User.findById(req.user.id).select('-password');
        const post = await Post.findById(req.params.id);
  
        const newComment = {
          text: req.body.text,
          name: user.name,
          avatar: user.avatar,
          user: req.user.id
        };
  
        post.comments.unshift(newComment);
  
        await post.save();
  
        res.json(post.comments);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
  );

  
//@rout Delete api/posts/Comment/:id/:comment_id
//@desc elimina comentario  
//@access private 
router.delete("/:id/:comment_id",auth , async (req,res) => {
    try {
        const post = await Post.findById(req.params.id);
        
        //pull comentario 
        const comment= post.comments.find(comment => comment.id === req.params.comment_id);
        // ve se comentario existe
        if(!comment){
            return res.status(404).json({msg: 'comentario nao existe'});
        }

        //checka user
        if(comment.user.toString()!== req.user.id){
            return res.status(404).json({msg :'User nao tem autorizacao'})
        }

        post.comments = post.comments.filter(
            ({ id }) => id !== req.params.comment_id
          );
        
        await post.save();

        res.json(post.comments);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
});



module.exports = router;
