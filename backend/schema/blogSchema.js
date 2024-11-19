const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {type:String, required:true},
    author: String,
    userId:String,
    content: [
      {
        type: { type: String, enum: ["text", "image", "title"], required: true },
        content: { type: String, required: true }
      }
    ],
    createdAt: { type: Date, default: Date.now }
},{timestamps:true})

const blogData =  mongoose.model('blogData',blogSchema);

module.exports = {blogData};