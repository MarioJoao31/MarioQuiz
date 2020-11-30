const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const router = express.Router();
const { chec, validationResult, check }= require('express-validator');

const User= require('../../models/User');

//express-validator para validar post para a bd
//@rout Post api/users
//@desc registar user 
//@access Public

router.post('/',[
    check('name','Name is required')
        .not()
        .isEmpty(),
    check('email', 'Porfavor introduza um email valido')
        .isEmail(),
    check('password','Introduza a merda da pass com mais de 6 caracteres')
        .isLength({ min: 6 })
    
],
    async (req,res)=> {
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {name , email , password} = req.body;

    try{
        // ver se usuario existe!!!
        let user= await User.findOne({email});

        if(user){
           return res.status(400).json({ errors: [{msg: 'User ja existente'}] });
        }
       
        



        // Get User gravatar (foto de email)
        const avatar= gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        });

        user = new User({
            name,
            email,
            avatar,
            password
        });




          // encrypt password
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();




        //Return jsonwebtoken
        const payload={
            user: {
                id: user.id
            }
        };
        
        jwt.sign(
            payload,
             config.get('jwtSecret'), 
             {expiresIn: 36000},
             (err, token) =>{
                 if(err) throw(err);
                 res.json({token});
             }
            );
             
    }catch(err){
        console.error(err.message);
        res.status(500).send('server Error');
    }

        

    console.log(req.body);
    
});

module.exports = router;