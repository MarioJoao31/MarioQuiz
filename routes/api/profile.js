const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {check, validationResult}= require('express-validator');

const Profile = require('../../models/Profile');
const User= require('../../models/User');


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

    const {}
});

module.exports = router;