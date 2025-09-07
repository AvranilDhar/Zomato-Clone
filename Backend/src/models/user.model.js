import mongoose, {Schema} from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new Schema({
    fullName : {
        type: String,
        required : true,
        trim : true,
    },
    userName : {
        type: String,
        required : true,
        trim : true,
        unique : true,
        index : true
    },
    email : {
        type: String,
        required : true,
        trim : true,
        unique : true,
        index : true
    },
    phoneNumber :{
        type: String,
        required : true,
        trim : true,
        unique : true,
        index : true
    },
    password : {
        type : String
    }
},{timeseries:true,timestamps:true});

//!hash password before saving it
userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password,10);
    next();
});

//!custome functions of this userSchema
//! (1)

userSchema.method.isPasswordValid = async function (reqPassword){
    return await bcrypt.compare(reqPassword,this.password);
}

//! (2)

userSchema.methods.generateRefreshToken =function () {
    return jwt.sign({
        _id:this._id
    },process.env.REFRESH_TOKEN_SECRET,{
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "15m"
    })
}

//! (3)

userSchema.methods.generateAccessToken =function () {
    return jwt.sign({
        _id:this._id
    },process.env.ACCESS_TOKEN_SECRET,{
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "15d"
    })
}

export const User = new mongoose.model("User", userSchema);