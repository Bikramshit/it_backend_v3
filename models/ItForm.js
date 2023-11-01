import mongoose from "mongoose";


const schema = mongoose.Schema ({
    name: {
        type:String
    },
    assessment_year:{
        type:String
    },
    financial_year:{
        type:String
    },
    visibility:{
        type:String,
        enum:["Active", "Deactive"],
        default:"Deactive"
    },
    expiryDate:{
        type:Date,        
    },
    startingDate: {
        type:String
    },
    createdBy: {
        type:mongoose.Schema.ObjectId,
        ref:"User"
    },
    createdUser: {
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    totalResponse: {
        type:Number,
        default:0
    }

});

export const ItForm = mongoose.model('Form', schema);