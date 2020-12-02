const express = require('express');
const router = express.Router();
const { check, validationResult} = require ('express-validator');
const auth = require('../../middleware/auth');

const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

//@rout Post api/posts
//@desc Cria uma sala 
//@access private 

router.get('/',[auth ,
    [
    check('Texte','Texto é requerido!').not().isEmpty()
    
    ]
], async (req,res)=> {
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({error: errors.array()});
    }
});

module.exports =router;