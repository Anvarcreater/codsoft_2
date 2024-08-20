const express = require('express');
const {User,Project,Task} = require('../Models/collection');
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken");

const router = express.Router();

router.post('/signup',async(req,res)=>{
    const {email,password } = req.body;
    if(email === '' || password === ''){
        return res.json({message:"Input fields should not be Empty..."});
    }
    if(password.length < 7){
        return res.json({message:"Password should have atleast 8 character"});
    }
    const email_id =await User.findOne({email});
    if(email_id){
        return res.json({message:"user already exist"});
    }
    const hashedpassword = await bcrypt.hash(password,10);
    const newuser= new User({
        email,
        password:hashedpassword,
    })
    await newuser.save();
    const token = jwt.sign({id:newuser._id,email:newuser.email},process.env.SECRETKEY,{expiresIn:'1h'});
    res.cookie("token",token,{httpOnly:true,maxAge:3600000});
    return res.json({status:true,message:"Signup successfully"});
})

router.post('/login',async (req,res)=>{
    const {email,password}=req.body;
    if(email === '' || password === ''){
        return res.json({message:"Input fields should not be Empty..."});
    }
    const user = await User.findOne({email});
    if(!user){
        return res.json({message:"user not found"});
    }
    const validpassword = await bcrypt.compare(password,user.password);
    if(!validpassword){
        return res.json({message:"incorrect password"});
    }else{
        const token = jwt.sign({id:user._id,email:user.email},process.env.SECRETKEY,{expiresIn:'1h'});
        res.cookie("token",token,{httpOnly:true,maxAge:3600000});
        return res.json({status:true,message:"login succesfully"});
    }
})

const verification= async (req,res,next)=>{
    try{
        const token = req.cookies.token;
        if(!token){
            return res.json({status:false,message:"Login first"});
        }
        const decoded =await jwt.verify(token,process.env.SECRETKEY);
        next();

    }catch(err){
        return res.json(err);
    }

}
router.get('/verify',verification,(req,res)=>{
    return res.json({status:true,message:"Authorized"});
})

router.get('/logout',(req,res)=>{
    res.clearCookie('token');
    return res.json({status:true,message:"logout successfully"});
})

router.post('/createproject',async (req,res)=>{
    const token = req.cookies.token;
    const {title,description}= req.body;
    try{
        const decoded = await jwt.verify(token,process.env.SECRETKEY);
        const id=decoded.id;
        const newproject = new Project({
            title,
            userid:id,
            description
        })
        await newproject.save();
        return res.json({status:true,message:"Project Created Successfully....."}); 
    }catch(err){
        return res.json({message:"Signup or login to create project"});
    }
})

router.get('/getproject',async(req,res)=>{
    const token = req.cookies.token;
    try{
        const decoded = await jwt.verify(token,process.env.SECRETKEY);
        const id=decoded.id;
        const projects = await Project.find({userid:id});
        return res.json({status:true,data:projects,message:"successfully retrieved projects"});
    }catch(err){
        return res.json({error:err});
    }
})

router.get('/viewproject/:id',async (req,res)=>{
    const id = req.params.id;
    try{
        const details = await Project.findOne({_id:id});
        return res.json({status:true,data:details,message:"view post details"})
    }catch(err){
        return res.json({message:err});
    }
})

router.get('/viewtasks/:id',async(req,res)=>{
    const projectid=req.params.id;
    try{
        const tasks = await Task.find({projectid:projectid});
        return res.json({status:true,data:tasks,message:"Tasks retrived"});
    }catch(err){
        return res.json({message:err});
    }
})

router.post('/assigntask', async(req,res)=>{
    const {projectid,taskname,taskstatus} = req.body;
    try{
        const newtask = new Task({
            projectid,
            taskname,
        })
        await newtask.save();
        return res.json({status:true,message:"task assigned successfully"});
    }catch(err){
        return res.json({message:err});
    }
})

router.delete('/deletetask/:id',async(req,res)=>{
    const id=req.params.id;
    try{
        await Task.findByIdAndDelete({_id:id});
        return res.json({status:true,message:"task deleted"});
    }catch(err){
        return res.json({error:err});
    }
})

router.put('/updatestatus/:id',async(req,res)=>{
    const id=req.params.id;
    const {taskstatus} = req.body;
    try{
        await Task.findByIdAndUpdate({_id:id},{taskstatus:taskstatus});
        return res.json({status:true,message:"status updated"});
    }catch(err){
        return res.json({error:err});
    }
})


module.exports=router;