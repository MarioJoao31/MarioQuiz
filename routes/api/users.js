const express = require('express');
const router = express.Router();
const { chec, validationResult, check }= require('express-validator/check');


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
    
], (req,res)=> {
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    console.log(req.body);
    res.send('User route')
});

module.exports =router;