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
    
        // Check if the post has already been liked
        if (post.likes.some(like => like.user.toString() === req.user.id).length === 0) {
          return res.status(400).json({ msg: 'Ainda nao deu like na sala' });
        }
        
    
        const removeIndex = post.likes
        .map(like => like.user.toString())
        .IndexOf(req.user.id);

        post.likes.splice(removeIndex,1);
        
        await post.save();
    
        return res.json(post.likes);
          } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
});



module.exports = router;
