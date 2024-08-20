const mongoose = require('mongoose');

const user = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true 
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true}
);

const User=new mongoose.model("User",user);

const project = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    description:{
        type:String,
        required:true
    }
});

const Project = new mongoose.model("project",project); 

const task = new mongoose.Schema({
    projectid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Project'
    },
    taskname:{
        type:String,
        required:true
    },
    taskstatus:{
        type:Boolean,
        default:false 
    }
});

const Task = new mongoose.model("task",task);

module.exports={
    User,
    Project,
    Task,
};