const express = require('express');
const app = express();
const auth = require('./routes/auth')
const post = require('./routes/post')


app.use(express.json())
app.use('/auth',auth)
app.use('/posts',post)


app.get('/',(req,res) => {
     res.send('Hello Guys')
})



app.listen(5000,() => {
    console.log('Server is listening on port 5000....')
})

