import ErrorHandler from "../utils/errorHandler.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import {User} from "../models/User.js"
import { sendToken } from "../utils/sendToken.js";
import crypto from "crypto";
import cloudinary from "cloudinary";
import { SendOTP, sendEmail } from "../utils/sendOTP.js";



export const Register = catchAsyncError(async(req, res, next)=>{
    const {name,  phone,email, password, dob, designation, department, pan, category, aadhaar} = req.body;
    
    if(!pan || !password ) return next(new ErrorHandler("Please enter all field", 400));
    
        let user = await User.findOne({pan});
        if (user ) return next(new ErrorHandler("User Already Exist", 409));
        
      
          
      
          user = new User({
            name, phone, password, email, verified:true, dob, designation, department, pan, category, aadhaar
          });
          await user.save();

          res.status(200).json({
            success:true,
            message: "User created Successfully",
            user
          });

    });

export const CreateUser = catchAsyncError(async(req,res,next)=>{
  const admin = await User.findById(req.user._id);
  if(admin.role!=="admin") return next(new ErrorHandler("You are not allow to create new user", 400));
  const {name,  phone,email, password, dob, designation, department, pan, category} = req.body;
  if(!pan || !password ) return next(new ErrorHandler("Please enter all field", 400));

  let user = await User.findOne({pan});
  if (user ) return next(new ErrorHandler("User Already Exist", 409));
  
  
    

    user = new User({
      name, phone, password, email, verified:true, dob, designation, department, pan, category
    });
    await user.save();

    res.status(200).json({
      success:true,
      message: "User created Successfully",
      user
    });
})
function test_str(str){
     var idx = str.indexOf('@');
     var res = str.replace(str.slice(2, idx-1), "*".repeat(5));
     return res;
}

      
export const login = catchAsyncError(async (req, res, next) => {
    const { pan, password } = req.body;
  
    if (!pan || !password)
      return next(new ErrorHandler("Please enter all field", 400));
  
    const user = await User.findOne({ pan }).select("+password");
  
    if (!user) return next(new ErrorHandler("Incorrect Username or Password", 401));
  
    const isMatch = await user.comparePassword(password);
  
    if (!isMatch) return next(new ErrorHandler("Incorrect Username or Password", 401));
    
    // if(user.role==="admin") {
    //   sendToken(res, user, `Welcome back`, 200);
    // }
    const otp = Math.floor(100000 + Math.random() * 900000);
    user.phoneOTP=otp;
    await user.save();
    let msg =`
    <p> <b> Dear User,</b> </p>
    <p>Your one time password(OTP) for login is <b> ${otp} </b>. Do not share with anyone. This OTP is valid for 15 minutes. </p>
     
    <p>If you didn't request this code, you can safely ignore this email. </p>
    
    <p>Thank you, </p>
    <p>Finance Officer, Aliah University </p>  
              
    
              
              `
              // SendOTP(phone, msg);
              let subject = "One Time Password for Login"

            await  sendEmail(user.email,subject, msg );

  
    // sendToken(res, user, `Welcome back`, 200);
    res.status(200).json({
      success:true,
      message:`OTP sent to your email id ${test_str(user.email)}`,
      // message:`OTP sent to your email id ${email}`,
      data: {
        userId: user._id,
      },
    });
  });

  export const ResendOTP = catchAsyncError(async(req,res,next)=>{
    const {userId} = req.body;
    const user = await User.findById(userId);
    if(!user) return next(new ErrorHandler("User not found", 409));
    const otp = Math.floor(100000 + Math.random() * 900000);
    user.phoneOTP=otp;
    await user.save();
    let msg =`
    <p> <b> Dear User,</b> </p>
    <p>Your one time password(OTP) for login is <b> ${otp} </b>. Do not share with anyone. This OTP is valid for 15 minutes. </p>
     
    <p>If you didn't request this code, you can safely ignore this email. </p>
    
    <p>Thank you, </p>
    <p>Finance Officer, Aliah University </p>  
              
    
              
              `
              // SendOTP(phone, msg);
              let subject = "One Time Password for Login"


            await  sendEmail(user.email,subject, msg );

  
    // sendToken(res, user, `Welcome back`, 200);
    res.status(200).json({
      success:true,
      message:`OTP sent to your email id ${test_str(user.email)}`,
      // message:`OTP sent to your email id ${email}`,
      data: {
        userId: user._id,
      },
    });
  })


export const VerifyOtp = catchAsyncError(async (req, res, next) => {
 
    const { otp, userId } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      if (user) return next(new ErrorHandler("User not found", 409));
    }

    if (user.phoneOTP !== otp) {
      if (user) return next(new ErrorHandler("Invalid otp or otp has been expired", 409));
    }
    
    user.verified=true;
    user.phoneOTP = "";
    await user.save();
    
    sendToken(res, user, `Welcome back ${user.name}`, 201);
});


  
  export const logout = catchAsyncError(async (req, res, next) => {
    res
      .status(200)
      .cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .json({
        success: true,
        message: "Logged Out Successfully",
      });
  });
  
  export const getMyProfile = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user._id);
    
    res.status(200).json({
      success: true,
      user,
    });
  });

  export const changePassword = catchAsyncError(async (req, res, next) => {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword)
      return next(new ErrorHandler("Please enter all field", 400));
  
    const user = await User.findById(req.user._id).select("+password");
  
    const isMatch = await user.comparePassword(oldPassword);
  
    if (!isMatch) return next(new ErrorHandler("Incorrect Old Password", 400));
  
    user.password = newPassword;
  
    await user.save();
  
    res.status(200).json({
      success: true,
      message: "Password Changed Successfully",
    });
  });


  export const updateProfile = catchAsyncError(async (req, res, next) => {
    
  
    const user = await User.findById(req.params.id);
    await User.findByIdAndUpdate(user._id, req.body);
  
    await user.save();
  
    res.status(200).json({
      success: true,
      message: "Profile Updated Successfully",
      user
    });
  });
  


  export const forgetPassword = catchAsyncError(async (req, res, next) => {
    const { pan } = req.body;
  
    const user = await User.findOne({ pan });
  
    if (!user) return next(new ErrorHandler("User not found", 400));
  
    const resetToken = await user.getResetToken();
  
    await user.save();
  
    const url = `${process.env.FRONTEND_URL}/resetpassword/token/${resetToken}`;
  
    const message = `
    <p> <b> Dear User,</b> </p>
    <p> Click on the link to reset your password. ${url} </p>     
    <p>If you didn't request this code, you can safely ignore this email. </p>
    
    <p>Thank you, </p>
    <p>Finance Officer, Aliah University </p>   
    `;
  
    // Send token via email
    await sendEmail(user.email, "Link for Reset Password", message);
    // await SendOTP(phone,message);
  
    res.status(200).json({
      success: true,
      message: `Reset Link has been sent to at ${test_str(user.email)}`,
    });
  });

  export const resetPassword = catchAsyncError(async (req, res, next) => {
    const { token } = req.params;
  
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");
  
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: {
        $gt: Date.now(),
      },
    });
  
    if (!user)
      return next(new ErrorHandler("Token is invalid or has been expired", 401));
  
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
  
    await user.save();
  
    res.status(200).json({
      success: true,
      message: "Account Recovered Successfully",
    });
  });

  export const getAllUsers = catchAsyncError(async (req, res, next) => {
    const users = await User.find({role:"user"}).sort({createdAt:-1});
  
    res.status(200).json({
      success: true,
      users,
    });
  });

  export const getAllStudents = catchAsyncError(async (req, res, next) => {
    const students = await User.find({role:"user"}).sort({createdAt:-1});
  
    res.status(200).json({
      success: true,
      students,
    });
  });
  
  export const getAllAdmins = catchAsyncError(async (req, res, next) => {
    const teachers = await User.find({role:"admin"});
  
    res.status(200).json({
      success: true,
      teachers,
    });
  });  



  export const updateUserRole = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    
    if (!user) return next(new ErrorHandler("User not found", 404));
    const {role} = req.body;

     if(role==="user"){
      user.role = "admin";
    }
    else user.role = "user";
  
    await user.save();
  
    res.status(200).json({
      success: true,
      message: "Role Updated",
    });
  });
  
  export const deleteUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);
  
    if (!user) return next(new ErrorHandler("User not found", 404));
  
  
    await user.deleteOne();
  
    res.status(200).json({
      success: true,
      message: "User Deleted Successfully",
    });
  });


  export const deleteMyProfile = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user._id);
  
    await user.deleteOne();
  
    res
      .status(200)
      .cookie("token", null, {
        expires: new Date(Date.now()),
      })
      .json({
        success: true,
        message: "User Deleted Successfully",
      });
  });
  








export const loginAdmin =catchAsyncError(async (req,res,next)=>{
  const {phone, password} = req.body;
  let admin = await User.findOne({phone}).select("+password");
  if(admin.role!=="admin") return next(new ErrorHandler("Not authorized", 400));
  
    const isMatch = await admin.comparePassword(password);
  
    if (!isMatch) return next(new ErrorHandler("Incorrect Phone or Password", 401));
  
    sendToken(res, admin, `Welcome back, ${admin.name}`, 200);
});




export const getUserDetails = catchAsyncError(async(req,res,next)=> {
  let user = await User.findById(req.params.id);
  
  res.status(200).json({
    success: true,
    user,
  });

})




// User.watch().on("change", async()=>{
//   const stats = await Stat.find({}).sort({ createdAt: "desc" }).limit(1);
//   const subscription = await User.find({ "subscription.status": "active" });
//   stats[0].users = await User.countDocuments();
//   stats[0].subscription = subscription.length;
//   stats[0].createdAt = new Date(Date.now());

//   await stats[0].save();
// })


export const SendMail = catchAsyncError(async(req,res,next)=> {

  const {id,subject,  msg } = req.body;

  let user = await User.findById(id);
  let admin = await User.findById(req.user._id);
  if(!admin) return next(new ErrorHandler("You are not allow to send this request"));
 
  // await sendEmail()
  await  sendEmail(user.email,subject, msg );

  
  res.status(200).json({
    success: true,
    message:`Message has been sent to ${user.email}`
    // user,
  });

})