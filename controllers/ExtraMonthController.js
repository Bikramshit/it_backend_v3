import { ExtraMonth } from "../models/ExtraMonth.js";
import { User } from "../models/User.js";
import ErrorHandler from "../utils/errorHandler.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import {ItForm} from "../models/ItForm.js"


export const CreateExtraMonths = catchAsyncError(async(req, res, next)=>{
    const {id, month, value, formId, responseId } = req.body;
     
    if(!id || !month || !value || !formId ) return next(new ErrorHandler("Please enter all field", 400));

    const user = await User.findById(id);
    if(!user) return next(new ErrorHandler("User not found", 409));
    const form = await ItForm.findById(formId);
    if(!form) return next(new ErrorHandler("Form not found", 409));

    let extra_months = await ExtraMonth.findOne({'user.id':user._id, responseId});

    if(!extra_months){
      extra_months = new ExtraMonth({
        user:{
            id: user._id,
            name:user.name,
            department:user.department
        },
        month, value,responseId,
         form:{
            id: form._id,
            name:form.name,
            fy:form.financial_year,
            ay:form.assessment_year
        }
    });
    } else {
      extra_months.month=month;
      extra_months.value=value;
    }

   


    await extra_months.save();

     

          res.status(200).json({
            success:true,
            message: "Data added successfully",
            extra_months
          });

});

export const DeleteExtraMonths = catchAsyncError(async(req, res, next)=>{
    const extraMonths = await ExtraMonth.findById(req.params.id);
   
    if(!extraMonths ) return next(new ErrorHandler("No data found", 400));

    await extraMonths.deleteOne();
          res.status(200).json({
            success:true,
            message: "Data Deleted Successfully",
            
          });

});

export const UpdateExtraMonths = catchAsyncError(async(req, res, next)=>{
    const extraMonths = await ExtraMonth.findById(req.params.id);
   
    if(!extraMonths ) return next(new ErrorHandler("No data found", 400));

    await ExtraMonth.findByIdAndUpdate(extraMonths._id, req.body);
    // console.log(user);
    await extraMonths.save();
    res.status(200).json({
      success:true,
      message: "Data updated successfully",
      extraMonths
    });

});

export const GetAllMonths = catchAsyncError(async(req, res, next)=>{
    const formId = await ItForm.findById(req.params.id);

    const extraMonths = await ExtraMonth.find({'form.id':formId})

          res.status(200).json({
            success:true,
            extraMonths
          });

});

export const GetSingleMonths = catchAsyncError(async(req, res, next)=>{
    const formId = await ItForm.findById(req.params.id);
    const month = req.params.month;
    let extraMonths = await ExtraMonth.find({'form.id':formId._id, month}).sort({createdAt:-1});
   

          res.status(200).json({
            success:true,
            extraMonths
          });

});

