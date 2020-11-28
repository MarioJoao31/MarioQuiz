const express = require('express');
const router = express.Router();

//@rout Post api/users
//@desc registar user 
//@access Public

router.post('/', (req,res)=> {
    console.log(req.body);
    res.send('User route')
});

module.exports =router;