const express = require('express')
const router = express.Router()
const { check,validationResult } = require('express-validator')
const { users } = require('../db')
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')


router.post('/signup', [
   check('email',"please provide a valid email").isEmail(),
   check('password',"please provide a password that is greater than 5 characters ").isLength({ min:6 })
   
], async (req,res) => {
   const { email, password } = req.body

    //VALIDATE THE INPUT
   const errors = validationResult(req)
   if(!errors.isEmpty()){
      return res.status(404).json({ errors: errors.array()})
   }

   //VALIDATE IF USER DOESN'T ALREADY EXISTS
   let user = users.find((user) => {
     return user.email === email
   })
   
   if(user){
    return res.status(400).json({
         "errors": [
         {
             "msg": "User already exists",
           
         }
     ]})
   }
   //hashing our password
   const hashedPassword = await bcrypt.hash(password,10)

   users.push({
      email,
      password:hashedPassword
   })

   const token = await JWT.sign({
      email
   }, "fchsh3b8ns03n8n39nc9nf9nf97ndkv9", {
       expiresIn: 3600000
   })
     
   res.json({
      token
   })


});


router.post('/login', async (req,res) => {
    const { password, email } = req.body

    let user = users.find((user) => {
       return user.email === email
    })

    if(!user){
      return res.status(400).json({
           "errors": [
           {
               "msg": "Invalid Credentials",
             
           }
       ]})
      
     }
    //Comparing password provided during login to hashed password in the custom database we created
    let isPasswordMatch = await bcrypt.compare(password, user.password);

    if(!isPasswordMatch){
      return res.status(400).json({
           "errors": [
           {
               "msg": "Invalid Credentials",
             
           }
       ]})
      
     }
     //sending jwt back to the client if the password is a match
     const token = await JWT.sign({
      email
   }, "fchsh3b8ns03n8n39nc9nf9nf97ndkv9", {
       expiresIn: 3600000
   })
     
   res.json({
      token
   }) 


   
})



router.get('/users', (req,res) => {
   res.json(users)
})

module.exports = router