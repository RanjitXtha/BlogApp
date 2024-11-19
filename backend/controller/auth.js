const bcrypt = require('bcryptjs');
const userSchema = require('../schema/userSchema');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'mysecretkey';

const SignUp = async(req,res)=>{
    const {email,username,password} = req.body;
    const profilePic = req.file ? req.file.filename : null;
    
    const existingUser = await userSchema.findOne({email});
    if(existingUser){
        console.log('user already exists');
        return res.status(400).json({message:'User already exists'})
    }

    const hashedPassword =await bcrypt.hash(password,10);

    const newUser = new userSchema({
       username , email, password:hashedPassword , profilePic 
    })

    await newUser.save();

    const userId = newUser._id;

    const token = jwt.sign({ userId, username , profilePic }, SECRET_KEY, { expiresIn: '7d' });
    return res.json({token})

}


const LogIn = async(req,res)=>{
    const {email , password} = req.body;
    const user = await userSchema.findOne({email})

    if(!user){
        console.log('user doesnt exist');
        return res.status(404).json({message:'User doesnt exist'})
    }

    const isPasswordCorrect = await bcrypt.compare(password , user.password);

    if(!isPasswordCorrect){
        console.log('Incorrect Password');
        return res.status(400).json({message:'Incorrect Password'})
    }
    const username = user.username;
    const userId = user._id;
    const profilePic = user.profilePic;

    const token = jwt.sign({userId ,username , profilePic },SECRET_KEY ,{expiresIn: '7d'} );
    return res.json({token});

}

module.exports = {SignUp , LogIn};