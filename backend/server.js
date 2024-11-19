const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const dbURL = "mongodb+srv://alienshooternp:herecomesthepain12@nodetesting.ljo8jbk.mongodb.net/blog?retryWrites=true&w=majority";
const cors = require('cors');
const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const {blogData} = require('./schema/blogSchema');
const {SignUp , LogIn} = require('./controller/auth');

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'backend/uploads');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
  const upload = multer({ storage: storage });

mongoose.connect(dbURL).then(()=>{
    app.listen(5000);
    console.log('server created');
    console.log('connected to db');
}).catch((error)=>{console.log(error)});


app.post('/signup',upload.single('profilePic'),SignUp);
app.post('/login',LogIn);



app.post('/api/addblog',async(req,res)=>{
    const {userId ,title,author,content} = req.body;
    console.log('recived');
    console.log(title + author +userId );
    console.log(content)

    const newData = new blogData({
       title , author ,userId, content
    })

    await newData.save();
})

app.get('/api/blogs',async(req,res)=>{
    const blogs = await blogData.find();
    //res.json({blogs})
    console.log(blogs)
})
