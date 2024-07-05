const User = require('../models/user-model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const JWT_SECRET_KEY = "MyName"

const signup = async(req,res)=>{
    const {name,email,passwd} = req.body
    let existingEmail;
    try {
        existingEmail = await User.findOne({email:email})
    } catch (error) {
        console.log(error)
    }
    if(existingEmail) return res.status(400).json({msg:"email already exists"})
    const hashedPasswd = await bcrypt.hash(passwd,10)
    const user = new User({
        name,email,passwd:hashedPasswd
    })
    try {
        await user.save()
        return res.status(201).json({msg:user})
    } catch (error) {
        return res.status(404).json({'msg':error})
    }
}

const login = async(req,res)=>{
    const {email,passwd} = req.body
    let existingUser;
    try {
        existingUser = await User.findOne({email:email})
    } catch (error) {
        console.log(error)
    }
    if(!existingUser) return res.status(200).json({msg:'User Not Found'})
    const isPasswdCorrect = await bcrypt.compareSync(passwd,existingUser.passwd)
    if(!isPasswdCorrect) return res.status(400).json({msg:"Wrong password"})
    const token = jwt.sign(
        {id:existingUser._id},JWT_SECRET_KEY,{expiresIn:"120s"}
    )
    res.cookie(String(existingUser._id),token,{
        path:'/',
        expires: new Date(Date.now() + 1000*30),
        httpOnly:true,
        sameSite:"lax"

    })
    return res.status(200).json({msg:'succesfully Logged In',user:existingUser,token})
}

const verifyToken = async(req,res,next) => {
    const cookies = req.headers.cookie
    const token = cookies.split("=")[1]
    console.log(cookies)
    if(!token) return res.status(404).json({msg:"No Token Found"})
    await jwt.verify(String(token),JWT_SECRET_KEY,(err,user)=>{
        if(err) return res.status(400).json({msg:"inValid Token"})
        console.log(user.id)
        req.id = user.id
    })
    next()
}

const getUser = async(req,res)=>{
    const userId = req.id
    let user;
    try {
        user = await User.findById(userId,"-passwd")
    } catch (error) {
        return res.status(404).json({msg:error})
    }
    if(!user){
        return res.status(400).json({msg:"User Not Found"})
    }
    return res.status(200).json({user});
}

exports.signup = signup
exports.login = login
exports.verifyToken = verifyToken
exports.getUser = getUser