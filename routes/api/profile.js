const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {check, validationResult}= require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');


//@rout get api/profile/me
//@desc get current users profile
//@access Private

router.get('/me',auth,async (req,res)=>{

    try{
        const profile = await Profile.findOne({ user: req.user.id })
        .populate('user',['name','avatar']);
   
        if(!profile){
            return res.status(400).json({msg:'Nao existe nenhum perfil desse user'});
        }
        res.json(profile);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
});




//@rout get api/profile/
//@desc cria ou da update no perfil do user
//@access Private

router.post('/',
[ auth ,
     [
    check('status','status e requerido').not().isEmpty(),
    check('skills','Skills é requerido').not().isEmpty()
]
],
 async (req, res)=>{
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin
       } = req.body;

       //constuir um perfil objeto
       const profileFields= {};
       profileFields.user = req.user.id;
       if(company)profileFields.company = company;
       if(website)profileFields.website = website;
       if(location)profileFields.location = location;
       if(bio)profileFields.bio = bio;
       if(status)profileFields.status = status;
       if(githubusername)profileFields.githubusername = githubusername;
       if(skills){
           
           profileFields.skills = skills.split(',').map(skill => skill.trim());
       }

    //build social perfil object
    profileFields.social= {}
        if(youtube) profileFields.social.youtube = youtube;
        if(twitter) profileFields.social.twitter = twitter;
        if(facebook) profileFields.social.facebook = facebook;
        if(linkedin) profileFields.social.linkedin = linkedin;
        if(instagram) profileFields.social.instagram = instagram;
        

       try{
        let profile = await Profile.findOne({user: req.user.id});

        if(profile){
            //UPDATE
            profile = await Profile.findOneAndUpdate({user:req.user.id},
                 {$set: profileFields},
                 {new: true}
                 );
                 return res.json(profile);
        }

        //create
        profile = new Profile(profileFields);
        await profile.save();
        res.json(profile);

       }catch(err){
           console.error(err.message);
           res.status(500).send ('Server error');
       }

    }
);




//@rout get Get /profile/
//@desc Busca todos os perfies
//@access public

router.get('/', async (req,res) =>{
    try {
        const profiles = await Profile.find().populate('user',[ 'name','avatar' ]);
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.send(500).send('Server error');
    }
});


//@rout get Get /profile/user/:user_id
//@desc Get profile pelo o id
//@access public

router.get('/user/:user_id', async (req,res) =>{
    try {
        const profile = await Profile.findOne({user: req.params.user_id}).populate('user',
        [ 'name','avatar' ]);

        if(!profile)
         return res.status(400).json({msg: ' Perfil nao encontrado'});


        res.json(profile);
    } catch (err) {
        console.error(err.message);
        if(err.kind == 'ObjectId'){
            return res.status(400).json({msg: ' Perfil nao encontrado'});

        }
        res.send(500).send('Server error');
    }
});




//@rout Delete /profile
//@desc Elimina perfil, user & post
//@access public
router.delete('/', auth, async (req, res) => {
    try {
      // Remove user posts
      // Remove profile
      // Remove user
      await Promise.all([
        Post.deleteMany({ user: req.user.id }),
        Profile.findOneAndRemove({ user: req.user.id }),
        User.findOneAndRemove({ _id: req.user.id })
      ]);
  
      res.json({ msg: 'User deleted' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });



module.exports = router;