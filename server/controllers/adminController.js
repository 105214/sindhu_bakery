import bcrypt from 'bcrypt'

import { generateToken } from '../utils/token.js'
import { Admin } from '../models/adminModel.js'



export const adminSignup=async(req , res ,next)=>{
    try {


        // collect user data
        const {name,email,password,mobile,profilePic}=req.body

        // data validation
        if(!name || !email || !password || !mobile){
            return res.status(400).json({message:"all fields required"})
        }

        const adminExist=await Admin.findOne({email})
        
        if(adminExist){
            return res.status(400).json({message:"admin already exist"})
        }

        // password hasing
        const hashedPassword=bcrypt.hashSync(password,10)

        const newAdmin=new Admin({
            name,
            email,
            password:hashedPassword,
            mobile,
            profilePic

        })
        await newAdmin.save()
    
// generate token using id and role

const token =generateToken(newAdmin._id,"admin")
res.cookie("token",token)

        res.json({data:newAdmin,message:"signup success"})
    } catch (error) {

        res.status(error.statusCode || 500).json({message:error.message || "internal server error"})
     
    }
}


export const adminLogin=async (req,res,next)=>{
    try {
      
        // collect user data
        const {email,password} = req.body

        // data validation
        if(!email || !password){
            return res.status(400).json({message:"all fields required"})
        }

        // check user exist
        const adminExist = await Admin.findOne({email})
     
        if(!adminExist){
            return res.status(404).json({message:"admin not found"})
        }
    
        // password match with db
        const passwordMatch = bcrypt.compareSync(password,adminExist.password)

        if(!passwordMatch){
            return res.status(401).json({message:"ivalid credentials"})
        }


        if(!adminExist.isActive){
            return res.status(401).json({message:"user not exist"})
        }
        // token


        const token =generateToken(adminExist._id,"admin")
        res.cookie("token",token)

        delete adminExist._doc.password
        res.json({ data:adminExist,message :"login success"})

    } catch (error) {
         res.status(error.statusCode || 500).json({message:error.message || "internal server error"})
     
    }
}