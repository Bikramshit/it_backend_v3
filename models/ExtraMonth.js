import mongoose, { mongo } from "mongoose";


const schema = mongoose.Schema({
    user:{
        id:{type:mongoose.Schema.ObjectId, ref:"User"},
        name:{type:String},
        depertment:{type:String}
    },
    month:{
        type:String
    },
    value:{
        type:Number
    },
    form:{
        id:{
            type:mongoose.Schema.ObjectId,
            ref:"ItForm"
        },
        name:{
            type:String
        },
        fy:{
            type:String
        },
        ay:{
            type:String
        }
    },
    responseId:{
   
        type:mongoose.Schema.ObjectId,
        ref:"FormResponse"
      
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
    
});


export const ExtraMonth = new mongoose.model("ExtraMonth", schema);