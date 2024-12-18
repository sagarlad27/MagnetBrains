const asyncHandler=require("express-async-handler")
const User=require("../models/userModel.js");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

const registerUser = asyncHandler(async (req, res)=>{
    const {name, email, password}=req.body;
    
    if(!name || !email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const userAvailable=await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("User already registered!");
    }

    const hashPassword= await bcrypt.hash(password,10);
    const user= await User.create({
        name, 
        email,    
        "password":hashPassword 
    })
    if(user){
        res.status(201).json({_id:user._id, name:user.name, email:user.email});
    }else{
        res.status(400);
        throw new Error("User not register");
    }
    
})

/*const loginUser = asyncHandler(async (req, res)=>{
    const {email,password}=req.body;
    
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const user= await User.findOne({email});
    if(user && (await bcrypt.compare(password,user.password))){
        const accessToken= jwt.sign({
            user:{
                id:user.id,
                name:user.name,
                email:user.email,
                role:user.role     
            },
        },process.env.SECRET_KEY,{expiresIn:"60m"})
        res.status(200).json({accessToken,"name":user.name,"user_id":user._id, "role":user.role });
    }else{
        res.status(401);
        throw new Error("Invalid credentials");
    }
    
});*/

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        // Generate JWT token with user data
        const accessToken = jwt.sign(
            {
                user: {  // Corrected to match 'user' key
                    id: user._id,  // Using '_id' instead of 'id'
                    name: user.name,
                    email: user.email,
                    role: user.role
                },
            },
            process.env.SECRET_KEY,
            { expiresIn: "60m" }
        );

        res.status(200).json({
            accessToken,
            name: user.name,
            user_id: user._id,  // Corrected to '_id'
            role: user.role
        });
    } else {
        res.status(401);
        throw new Error("Invalid credentials");
    }
});

module.exports={registerUser, loginUser};