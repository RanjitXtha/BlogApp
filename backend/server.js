const express = require('express');
const mongoose = require('mongoose');

const dbURL = "mongodb+srv://alienshooternp:herecomesthepain12@nodetesting.ljo8jbk.mongodb.net/blog?retryWrites=true&w=majority";
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const {blogData} = require('./schema/blogSchema');

mongoose.connect(dbURL).then(()=>{
    app.listen(5000);
    console.log('server created');
    console.log('connected to db');
}).catch((error)=>{console.log(error)});


app.post('/api/addblog',async(req,res)=>{
    const {title,author,content} = req.body;
    console.log('recived');
    console.log(title + author );
    console.log(content)

    const newData = new blogData({
        title , author , content
    })

    await newData.save();
})

app.get('/api/blogs',async(req,res)=>{
    const blogs = await blogData.find();
    //res.json({blogs})
    console.log(blogs)
})
