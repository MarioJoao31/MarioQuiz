const express = require('express');
const router = express.Router();

//@rout get api/posts
//@desc test rout
//@access Public

router.get('/', (req,res)=> res.send('posts route'));

module.exports =router;