import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { ItForm } from "../models/ItForm.js";
import { User } from "../models/User.js";
import ErrorHandler from "../utils/errorHandler.js";




export const createForm = catchAsyncError(async(req,res,next)=> {
  

    const {name, assessment_year, financial_year, visibility, expiryDate, startingDate} = req.body;
    const user = await User.findById(req.user._id);

    if(!name, !assessment_year, !financial_year)return next(new ErrorHandler("Please enter all field", 409));

    let form = new ItForm({
        name, assessment_year, financial_year, visibility, expiryDate, startingDate, createdBy:user._id, createdUser:user.name
    });

    await form.save();

    res.status(200).json({
        success:true,
        message: "Form created Successfully",
        form
      });




});



export const updateForm = catchAsyncError(async(req,res,next)=> {

    const user = await User.findById(req.user._id);
    const form = await ItForm.findById(req.params.id);
    
    if(!form || form.createdBy.toString()!==user._id.toString() ) return next(new ErrorHandler("Form not found", 409));

    await ItForm.findByIdAndUpdate(form._id, req.body);

    await form.save();
    res.status(200).json({
        success:true,
        message: "Form updated Successfully",
        form
      });

});

export const ActiveHandler = catchAsyncError(async(req,res,next)=> {

  const user = await User.findById(req.user._id);
  const form = await ItForm.findById(req.params.id);
  
  if(!form || form.createdBy.toString()!==user._id.toString() ) return next(new ErrorHandler("Form not found", 409));

  if(form.visibility==="Active"){
    form.visibility="Deactive";
  }else {
    form.visibility="Active";
  }

  await form.save();
  res.status(200).json({
      success:true,
      message: "Form updated Successfully",
      form
    });

});


export const deleteForm = catchAsyncError(async(req,res,next)=> {
    const user = await User.findById(req.user._id);
    const form = await ItForm.findById(req.params.id);
    if(!form || form.createdBy.toString()!==user._id.toString() ) return next(new ErrorHandler("Form not found", 409));


    await form.deleteOne();
    res.status(200).json({
        success: true,
        message: "Form Deleted Successfully",
      });

});


export const getFormDetails = catchAsyncError(async(req,res,next)=> {
    let form = await ItForm.findById(req.params.id);
  
  res.status(200).json({
    success: true,
    form
  });
});



export const getAllForms = catchAsyncError(async(req,res,next)=> {
    const forms = await ItForm.find({}).sort({createdAt:-1});
  
    res.status(200).json({
      success: true,
      forms,
    });
});

export const getAllActiveForm = catchAsyncError(async(req,res,next)=> {
  const allForm = await ItForm.find({visibility:"Active"});
  let todayDate = Date.now();
  let forms=[];
  for (let i= 0;i<allForm.length;i++){
    if(new Date(allForm[i].expiryDate)>=todayDate){
      forms.push(allForm[i]);
    }
  }
  res.status(200).json({
    success: true,
    forms,
  });
});

export const FormForUser = catchAsyncError(async(req,res,next)=> {

  let allForm = await ItForm.find({});
  let forms = [];
  let todayDate = Date.now();
  for (let i= 0;i<allForm.length;i++){
    if(new Date(allForm[i].expiryDate)>=todayDate && allForm[i].visibility==="Active"){
      forms.push(allForm[i]);
    }
  }

  res.status(200).json({
    success: true,
    forms,
  });
});
