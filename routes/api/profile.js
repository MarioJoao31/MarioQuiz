const express = require('express');
const router = express.Router();

//@rout get api/profile
//@desc test rout
//@access Public

router.get('/', (req,res)=> res.send('profile route'));

module.exports =router;