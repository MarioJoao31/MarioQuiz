const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');
const { chec, validationResult, check }= require('express-validator');
const auth = require('../../middleware/auth');

const User = require('../../models/User')

//@rout get api/auth
//@desc test rout
//@access Public

router.get('/',auth, async (req,res)=>{ 
    try{
        const user= await User.findById(req.user.id).select('-password');

        res.json(user);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

//@rout get api/auth
//@desc autenticar user e token
//@access Public

router.post('/',[
    check('email', 'Credenciais invalidas')
        .isEmail(),
    check('password','requere a password').exists()
    
    ],
    async (req,res)=> {
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const { email , password} = req.body;

    try{
        // ver se usuario existe!!!
        let user= await User.findOne({email});

        if(!user){
           return res
           .status(400)
           .json({ errors: [{msg: 'Credenciais invalidas'}] });
        }

        //compara a password com a password da base de dados
        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res
           .status(400)
           .json({ errors: [{msg: 'Credenciais invalidas'}] });
        }

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