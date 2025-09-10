import { User } from "../models/user.model.js";
import { FoodPartner } from "../models/foodPartner.model.js";
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

    const response = new ApiResponse(200,"USER REGISTERED SUCCESSFULLY",{
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
    if(!isPasswordValid) throw new ApiError(401, "INVALID CREDENTIALS");

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

const logoutUser = asyncHandler(async function (req,res) {
    res.clearCookie("refreshToken");
    const response = new ApiResponse(203, "USER LOGGED OUT SUCCESSFULLY");
    res.status(203).json(response);
})

const registerFoodPartner = asyncHandler(async (req,res)=>{
    const {fullName , userName , email , phoneNumber , password } = req.body;
    const ifRegistered = await FoodPartner.findOne({
        $or : [{email}, {userName}, {phoneNumber}]
    })
    if(ifRegistered) throw new ApiError(402, "FOODPARTNER ALREADY EXISTS");
    const foodPartner = await FoodPartner.create({
        fullName,
        userName,
        email,
        phoneNumber,
        password
    });
    const accessToken = foodPartner.generateAccessToken();
    const refreshToken = foodPartner.generateRefreshToken();

    res.cookie("refreshToken", refreshToken);

    const response = new ApiResponse(202, "FOODPARTNER REGISTERED SUCCESSFULLY" , {
        foodPartner : {
            _id : this._id,
            fullName : this.fullName,
            userName : this.userName, 
            email : this.email,
            phoneNumber : this.phoneNumber
        },
        accessToken
    });

    res.status(202,response);
})

const loginFoodPartner = asyncHandler(async function (req,res) {
    const { fullName , userName , email , phoneNumber , password} = req.body;

    const ifFoodPartner = await FoodPartner.findOne({
        $or : [{email}, {userName}, {phoneNumber}]
    });
    if(!ifFoodPartner) throw new ApiError(404,"FOODPARTNER NOT REGISTERED");

    const isPasswordValid = await ifFoodPartner.isPasswordValid(password);

    if(!isPasswordValid) throw new ApiError(401, "INVALID CREDENTIALS");

    const accessToken = ifFoodPartner.generateAccessToken();
    const refreshToken = ifFoodPartner.generateRefreshToken();

    res.cookie("refreshToken", refreshToken);
    const response = new ApiResponse(205 , "FOODPARTNER LOGGED IN SUCCESFULLY",{
        ifFoodPartner : {
            _id : this._id,
            fullName : this.fullName,
            userName : this.userName, 
            email : this.email,
            phoneNumber : this.phoneNumber
        },accessToken
    });
    res.status(205,response);
})
const logoutFoodPartner = asyncHandler(async function (req,res) {
    res.clearCookie("refreshToken");
    const response = new ApiResponse(203, "FOOD PARTNER LOGGED OUT SUCCESSFULLY");
    res.status(206).json(response);
})
export {registerUser,loginUser, logoutUser , registerFoodPartner , loginFoodPartner , logoutFoodPartner}