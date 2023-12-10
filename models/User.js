import mongoose from "mongoose";
import validator from "validator";
import  jwt  from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";


const schema = new mongoose.Schema({
    name: {
        type: String,
      },
      email: {
        type: String,
        validate: [validator.isEmail, "Please Enter a valid email"],
      
      },
      phone: {
        type: String,
        validate: [validator.isMobilePhone, "Please Enter a valid phone"],
        unique:true
      },
    
      password: {
        type: String,
        required: [true, "Please enter your password"],
        minLength: [6, "Password must be at least 6 characters"],
        select: false,
      },
      role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
      },
      verified: {
        type: Boolean,
        default: false,
    },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      dob: {
        type:Date
      },
      designation: {
        type:String
      },
      department:{
        type:String
      },
    category:{type:String},

      pan:{
        type:String,
        maxLength: 10,
      },
      aadhaar:{
        type:Number,
        maxLength: 12,
      },
      age:{
        type:Number
      },
      emp_id:{
        type:String
      },
     
    
      resetPasswordToken: String,
      resetPasswordExpire: String,
      phoneOTP:String,
      
});


schema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
  });
  
  schema.methods.getJWTToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
      expiresIn: "15d",
    });
  };
  
  schema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };
  
  schema.methods.getResetToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");
  
    this.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
  
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
  
    return resetToken;
  };




export const User = mongoose.model('User', schema);