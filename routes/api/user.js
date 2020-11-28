const express = require('express');
const router = require.Router();

//@rout get api/users
//@desc test rout
//@access Public

router.get('/', (req,res)=> res.send('User route'));

module.exports =router;