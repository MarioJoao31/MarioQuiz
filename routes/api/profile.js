const express = require('express');
const router = require.Router();

//@rout get api/profile
//@desc test rout
//@access Public

router.get('/', (req,res)=> res.send('profile route'));

module.exports =router;