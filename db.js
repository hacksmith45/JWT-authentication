//custom database

const users = [
    {
        email:"susan@gmail.com",
        password:"123456789"
    }
];

const publicPosts = [
    {
       title:"Free tips on development",
       content:"These are some tips"
    },
    {
        title:"web development frameworks you need to know",
        content:"Here are some of them..."
     },
     {
        title:" Free tips on development",
        content:"These are some tips"
     },
    
]

//For Authenticated users
const privatePosts = [
    {
        title:"Paid tips on development",
        content:"Here are some tips"
     },
     {
        title:"Paid tips on development",
        content:"Here are some tips"
     },
     {
        title:"Paid tips on development",
        content:"Here are some tips"
     },
]


module.exports = { users,publicPosts,privatePosts }