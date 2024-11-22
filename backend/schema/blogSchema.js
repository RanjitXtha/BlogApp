const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'userData', required: true }, 
  content: { type: String, required: true }, 
  createdAt: { type: Date, default: Date.now } 
});

const blogSchema = new mongoose.Schema({
    title: {type:String, required:true},
    author: String,
    userId:String,
    description:String,
    likes:{ type:Number , min:0 ,default:0 },
    content: [
      {
        type: { type: String, enum: ["text", "image", "title"], required: true },
        content: { type: String, required: true },
   
      }
    ],
    tags: { type: [String], default: [] },
    comments:[commentSchema],
    createdAt: { type: Date, default: Date.now }
},{timestamps:true})

const blogData =  mongoose.model('blogData',blogSchema);
const commentData =  mongoose.model('commentData',commentSchema);

module.exports = {blogData , commentData};