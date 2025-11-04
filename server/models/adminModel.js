import mongoose from "mongoose";

const AdminSchema=new mongoose.Schema({

    name:{
        type:String,
        required:true,
        maxLength:50,
    },
    email:{
        type:String,
        required:true,
        minLength:3,
        maxLength:30,
    },
    password:{
        type:String,
        required:true,
        minLength:6,
    },
    mobile:{
        type:String,
        required:true,
    },
    profilePic:{
        type:String,
        default:"https://thumbs.dreamstime.com/b/default-profile-picture-icon-high-resolution-high-resolution-default-profile-picture-icon-symbolizing-no-display-picture-360167031.jpg",

    },
    role:{
        type:String
    },
    isActive:{
        type:Boolean,
        default:true,
    },
},
{
    timestamps:true,
})

export const Admin=mongoose.model("Admin",AdminSchema);