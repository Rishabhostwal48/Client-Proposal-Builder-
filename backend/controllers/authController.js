const User = require("../models/User");
const bcrypt = require("bcryptjs")
const genrateToken = require("../utility/genrateToken")


const registerUser = async (req, res) => {
  try{
    const {name,email,password} = req.body

    const userExists = await User.findOne({email})
    if(userExists){
      return res.status(400).json({
        message: "User already exists",
      })
    }
    const handlePassword = await bcrypt.hash(password,10)

    const user = await User.create({
      name,
      email,
      password: handlePassword,
    })
    res.status(201).json({
      message:"User created successfully",
      user:{
        _id: user._id,
        name: user.name ,
        email: user.email,

      },
    })
  }catch(error){
    res.status(500).json({
      message: error.message,
    })
  }
};


const loginUser = async (req,res) =>{
  try{
  const {email,password} = req.body
  const user = await User.findOne({email})
  if (!user){
    return res.status(400).json({
      message: "Invalid Credentials",
    })
  }const checkPass= await bcrypt.compare(password,user.password)

  if(!checkPass){
    return res.status(400).json({
      message: "Invalid Credentials",
    })
  }

  return res.status(200).json({
      message: "Login Successful",
      token : genrateToken(user._id),
    })

  }catch(error){
    res.status(500).json({
      message: error.message,
    })
  }
}

const getProfile = async (req,res) =>{
  profile=req.user
  res.status(200).json({
    message: "Profile fetched successfully",
    profile,
  })
}

module.exports = {
  registerUser,
  loginUser,
  getProfile,
};