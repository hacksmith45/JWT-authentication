const express = require('express')
const router = express.Router()
const { publicPosts,privatePosts } = require('../db')
const checkAuth = require('../middleware/checkAuth')

router.get('/public', (req,res) => {
    res.status(200).json(publicPosts)
})
                        //middleware
router.get('/private', checkAuth , (req,res) => {
   res.status(200).json(privatePosts)
})


module.exports = router