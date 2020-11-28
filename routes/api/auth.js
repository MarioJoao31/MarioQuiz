const express = require('express');
const router = express.Router();

//@rout get api/auth
//@desc test rout
//@access Public

router.get('/', (req,res)=> res.send('Auth route'));

module.exports =router;