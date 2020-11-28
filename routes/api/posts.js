const express = require('express');
const router = require.Router();

//@rout get api/posts
//@desc test rout
//@access Public

router.get('/', (req,res)=> res.send('posts route'));

module.exports =router;