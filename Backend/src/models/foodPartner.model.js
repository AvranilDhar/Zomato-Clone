import mongoose, {Schema} from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
const foodPartnerSchema = new Schema({
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

foodPartnerSchema.pre("save", async function (next) {
    return await bcrypt.hash(this.password,10);
    next();
})

//! methods

foodPartnerSchema.methods.isPasswordValid = async function (localPassword) {
    return await bcrypt.compare(localPassword, this.password);
}

foodPartnerSchema.methods.generateAccesToken = function() {
    return jwt.sign({
        _id : this._id
    },process.env.ACCESS_TOKEN_SECRET,{
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "15m"
    })
}
foodPartnerSchema.methods.generateRefreshToken = function() {
    return jwt.sign({
        _id : this._id
    },process.env.REFRESH_TOKEN_SECRET,{
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "15d"
    })
}

export const FoodPartner = new mongoose.model("FoodPartner",foodPartnerSchema);