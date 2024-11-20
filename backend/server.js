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

const {blogData, commentData} = require('./schema/blogSchema');
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



app.post('/api/addblog', upload.single('image'), async (req, res) => {
  const { userId, title, author, content } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;  // Get the image URL if available

  console.log('Received blog post data:');
  console.log(title, author, userId);
  console.log(content);

  const newData = new blogData({
    title,
    author,
    userId,
    content,
    image: imageUrl,  // Save the image URL in the blog post
  });

  try {
    await newData.save();
    res.status(201).json(newData);  // Return the newly created blog post
  } catch (error) {
    res.status(500).json({ message: 'Error adding blog post', error });
  }
});

app.get('/api/getallblogs',async(req,res)=>{
    const blogs = await blogData.find();
    res.json({blogs})
})

app.get('/api/getBlog',async(req,res)=>{

})

app.post('/api/blogs/:blogId/comments', async (req, res) => {
  console.log('recieved');
  try {
    const { blogId } = req.params;
    const { content, userId } = req.body; 
    console.log(userId);
    console.log(content)
    const newComment = new commentData({
      content,
      user: userId,
    });

    // Save the comment to the database
    const savedComment = await newComment.save();

    // Find the blog post and add the comment ID to its comments array
    const blog = await blogData.findById(blogId);
    blog.comments.push(savedComment);
    await blog.save();

    // Populate the user field for the newly saved comment
    const populatedComment = await savedComment.populate('user', 'username email');
    console.log(populatedComment)
    res.status(201).json(populatedComment);
  } catch (error) {
    res.status(500).json({ message: 'Error adding comment', error });
  }
});

app.get('/api/blogs/:blogId/comments', async (req, res) => {
  try {
    const { blogId } = req.params;

    const blog = await blogData.findById(blogId).populate({
      path: 'comments',
      populate: { path: 'user', select: 'username email' } 
    });

    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    res.status(200).json(blog.comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ message: 'Error fetching comments', error });
  }
});