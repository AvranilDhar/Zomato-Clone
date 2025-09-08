import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async(req , res) => {
    const {
        fullName,
        userName,
        email,
        phoneNumber,
        password
    } = req.body;
    const ifRegistered = await User.findOne({
            $or:[{email},{phoneNumber},{userName}]
        })
    if(ifRegistered) throw new ApiError(400,"USER ALREADY EXISTS");
    
    const user = await User.create({
        fullName,
        userName,
        email,
        phoneNumber,
        password
    });
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    res.cookie("refreshToken", refreshToken);

    const response = new ApiResponse(201,"USER REGISTERED SUCCESSFULLY",{
        user : {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            userName: user.userName,
            phoneNumber: user.phoneNumber
        },
        accessToken
    })

    res.status(201).json(response);
})
const loginUser = asyncHandler(async (req,res) => {
    const { userName , email , phoneNumber , password} = req.body;
    const user = await User.findOne({
        $or : [{email}, {phoneNumber}, {userName}]
    })
    if(!user) throw new ApiError(400,"USER NOT REGISTERED");

    const isPasswordValid = await user.isPasswordValid(password);
    if(!isPasswordValid) throw new ApiError(400, "INVALID CREDENTIALS");

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    res.cookie("refreshToken", refreshToken);

    const response = new ApiResponse(201,"USER LOGGED IN SUCCESSFULLY",{
        user : {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            userName: user.userName,
            phoneNumber: user.phoneNumber
        },
        accessToken
    }) 
    res.status(201).json(response)
})
export {registerUser,loginUser}