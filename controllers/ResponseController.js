
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import {FormResponse} from "../models/FromResponse.js";
import { ItForm } from "../models/ItForm.js";
import { User } from "../models/User.js";
import getDataUri from "../utils/dataUri.js";
import ErrorHandler from "../utils/errorHandler.js";
import cloudinary from "cloudinary"



export const CreateResponse = catchAsyncError(async(req, res, next)=>{

    const user = await User.findById(req.user._id);
    const form = await ItForm.findById(req.params.id);
    const {name, pan, aadhaar, email, phone, department, designation, category, dob} = req.body;
    if(!name || !pan || !aadhaar || !email ||!phone || !department || !designation || !dob) return next(new ErrorHandler("Enter all the fileds", 409))

   let response = await FormResponse.find({$and:[{FormId:{$eq:form._id}}, {userId:{$eq:user._id}}]});
    
    if(response.length!==0 && response.remark!=="Cancel") return next(new ErrorHandler("You already created a form either delete it or continue with previous form"));

    // user.name=name;
    // user.designation=designation;
    // user.category=category;
    // user.aadhaar=aadhaar;
    // user.email=email;
    // user.phone=phone;
    // user.department=department;
    // user.dob=dob;
    
     response = new FormResponse({
        name, pan, aadhaar, email, phone, department, designation, FormId:form._id, FormName:form.name, category, userId:user._id, dob, remark:"In Progress", assessment_year:form.assessment_year, financial_year:form.financial_year
    });
    
    response.save();
    user.save();
    form.totalResponse+=1;
    // response.remark = "In Progress";
    form.save();

    res.status(200).json({
        success:true,
        // message: " created Successfully",
        response
      });
});

export const updateResponse = catchAsyncError(async(req, res, next)=>{

    const response = await FormResponse.findById(req.params.id);
    const user = await User.findById(req.user._id);
   
    if(!response || (user.role==="user" && response.userId.toString()!==user._id.toString()) || (user.role!=="admin"  && response.userId.toString()!==user._id.toString() ))  return next(new ErrorHandler("Response Not Found", 409));

    await FormResponse.findByIdAndUpdate(response._id, req.body);
    await response.save();


    res.status(200).json({
        success:true,
        response
      });
});

export const SubmitUpdatedRespnse = catchAsyncError(async(req,res,next)=>{
 
  let user = await User.findById(req.user._id);
    let response = await FormResponse.findById(req.params.id);
    if(!response || response.userId.toString()!==user._id.toString()) return next(new ErrorHandler("Response Not Found", 409));

    let form = await ItForm.findById(response.FormId);
    if(!form ) return next(new ErrorHandler("Form Not Found", 409));
    let todayDate = Date.now();
    if(todayDate>form.expiryDate) return next(new ErrorHandler("Form has expired", 409));
    if(response.submitStatus==="Yes"){
        response.updateStatus= Number(response.updateStatus + 1);
    }

    response.submitTime = Date.now();

    response.save();


    res.status(200).json({
        success:true,
        message: "Response Updated Successfully",
        
      });
});

export const SubmitResponse = catchAsyncError(async(req,res,next)=>{
 
  let user = await User.findById(req.user._id);
    let response = await FormResponse.findById(req.params.id);
    if(!response || response.userId.toString()!==user._id.toString()) return next(new ErrorHandler("Response Not Found", 409));

    let form = await ItForm.findById(response.FormId);
    if(!form ) return next(new ErrorHandler("Form Not Found", 409));
    let todayDate = Date.now();
    if(todayDate>form.expiryDate) return next(new ErrorHandler("Form has expired", 409));
    if(response.submitStatus==="No"){
        response.submitStatus="Yes";
        response.remark = "Submitted"
    }

    response.submitTime = Date.now();

    response.save();


    res.status(200).json({
        success:true,
        message: "Form Submitted Successfully",
        
      });
});

export const ApprovedResponse = catchAsyncError(async(req,res,next)=>{
  const {remark} = req.body;
  let user = await User.findById(req.user._id);
    let response = await FormResponse.findById(req.params.id);
    if(!response || user.role!=="admin" ) return next(new ErrorHandler("Response Not Found", 409));

    // let form = await ItForm.findById(response.FormId);
    // if(!form ) return next(new ErrorHandler("Form Not Found", 409));
    // let todayDate = Date.now();
    // if(todayDate>form.expiryDate) return next(new ErrorHandler("Form has expired", 409));


    if(response.seen==="No"){
        response.seen="Yes";
    }else{
      response.seen="Yes";
    }
    response.remark = remark;
    response.save();


    res.status(200).json({
        success:true,
        message: `Response status updated to ${response.remark}`,
        
      });
});

export const DocumentUpdate = catchAsyncError(async(req,res,next)=>{
  const {documentStatus} = req.body;
  let user = await User.findById(req.user._id);
    let response = await FormResponse.findById(req.params.id);
    if(!response || user.role!=="admin" ) return next(new ErrorHandler("Response Not Found", 409));


    if(response.seen==="No"){
        response.seen="Yes";
    }else{
      response.seen="Yes";
    }
    response.documentStatus = documentStatus;
    response.save();

    res.status(200).json({
        success:true,
        message: `Documents status updated to ${response.documentStatus}`,
        
      });
})

export const CancelForm = catchAsyncError(async(req,res,next)=>{
  
  let user = await User.findById(req.user._id);
    let response = await FormResponse.findById(req.params.id);
    if(!response || response.userId.toString()!==user._id.toString() || user.role!=="admin" ) return next(new ErrorHandler("Response Not Found", 409));

  response.remark= "Cancel"
   
    response.save();

    res.status(200).json({
        success:true,
        message: "Repsonse Cancelled Successfully",
        
      });
})


export const deleteResponse = catchAsyncError(async(req, res, next)=>{
    let response = await FormResponse.findById(req.params.id);
    let user = await User.findById(req.user._id);
    let form = await ItForm.findById(response.FormId);
    if(response.userId.toString()!==user._id.toString() || user.role!=="admin")return next(new ErrorHandler("Response Not Found", 409));

    await response.deleteOne();
    form.totalResponse-=1;
    await form.save();

    res.status(200).json({
        success:true,
        message: "Response created Successfully",
        
      });
});

export const ResponseFileUpload = catchAsyncError(async(req, res, next)=>{
  let response = await FormResponse.findById(req.params.id);
  let user = await User.findById(req.user._id);
  if(response.userId.toString()!==user._id.toString() )return next(new ErrorHandler("Response Not Found", 409));

  const { fileName } = req.body;
  const file = req.file;
  // console.log(fileName, file);
  if(fileName==="pay_slip"){
    if(response.pay_slip.url===undefined ){
      const fileUri = getDataUri(file);
      const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);
      response.pay_slip = {
        public_id: mycloud.public_id,
        url: mycloud.secure_url,
      };
    }else {
      await cloudinary.v2.uploader.destroy(response.pay_slip.public_id);
      const fileUri = getDataUri(file);
      const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);
      response.payslip = {
        public_id: mycloud.public_id,
        url: mycloud.secure_url,
      };

    }
  } else if(fileName==="lip_c_file"){
    if(response.lip_c_file.url===undefined ){
      const fileUri = getDataUri(file);
      const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);
      response.lip_c_file = {
        public_id: mycloud.public_id,
        url: mycloud.secure_url,
      };
    }else {
      await cloudinary.v2.uploader.destroy(response.lip_c_file.public_id);
      const fileUri = getDataUri(file);
      const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);
      response.lip_c_file = {
        public_id: mycloud.public_id,
        url: mycloud.secure_url,
      };
    }
  }
  else if(fileName==="ppf_c_file"){
    if(response.ppf_c_file.url===undefined ){
      const fileUri = getDataUri(file);
      const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);
      response.ppf_c_file = {
        public_id: mycloud.public_id,
        url: mycloud.secure_url,
      };
    }else {
      await cloudinary.v2.uploader.destroy(response.ppf_c_file.public_id);
      const fileUri = getDataUri(file);
      const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);
      response.ppf_c_file = {
        public_id: mycloud.public_id,
        url: mycloud.secure_url,
      };
    }
  }
  else if(fileName==="ssc_file"){
    if(response.ssc_file.url===undefined ){
      const fileUri = getDataUri(file);
      const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);
      response.ssc_file = {
        public_id: mycloud.public_id,
        url: mycloud.secure_url,
      };
    }else {
      await cloudinary.v2.uploader.destroy(response.ssc_file.public_id);
      const fileUri = getDataUri(file);
      const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);
      response.ssc_file = {
        public_id: mycloud.public_id,
        url: mycloud.secure_url,
      };
    }
  }
  else if(fileName==="child_file"){
    if(response.child_file.url===undefined ){
      const fileUri = getDataUri(file);
      const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);
      response.child_file = {
        public_id: mycloud.public_id,
        url: mycloud.secure_url,
      };
    }else {
      await cloudinary.v2.uploader.destroy(response.child_file.public_id);
      const fileUri = getDataUri(file);
      const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);
      response.child_file = {
        public_id: mycloud.public_id,
        url: mycloud.secure_url,
      };
    }
  }
  else if(fileName==="input_file"){
    if(response.input_file.url===undefined ){
      const fileUri = getDataUri(file);
      const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);
      response.input_file = {
        public_id: mycloud.public_id,
        url: mycloud.secure_url,
      };
    }else {
      await cloudinary.v2.uploader.destroy(response.input_file.public_id);
      const fileUri = getDataUri(file);
      const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);
      response.input_file = {
        public_id: mycloud.public_id,
        url: mycloud.secure_url,
      };
    }
  }
  else if(fileName==="input2_file"){
    if(response.ssc_file.url===undefined ){
      const fileUri = getDataUri(file);
      const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);
      response.input2_file = {
        public_id: mycloud.public_id,
        url: mycloud.secure_url,
      };
    }else {
      await cloudinary.v2.uploader.destroy(response.input2_file.public_id);
      const fileUri = getDataUri(file);
      const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);
      response.input2_file = {
        public_id: mycloud.public_id,
        url: mycloud.secure_url,
      };
    }
  }
  else if(fileName==="input3_file"){
    if(response.input3_file.url===undefined ){
      const fileUri = getDataUri(file);
      const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);
      response.input3_file = {
        public_id: mycloud.public_id,
        url: mycloud.secure_url,
      };
    }else {
      await cloudinary.v2.uploader.destroy(response.input3_file.public_id);
      const fileUri = getDataUri(file);
      const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);
      response.input3_file = {
        public_id: mycloud.public_id,
        url: mycloud.secure_url,
      };
    }
  }
  else if(fileName==="landords_file1"){
    if(response.landords_file1.url===undefined ){
      const fileUri = getDataUri(file);
      const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);
      response.landords_file1 = {
        public_id: mycloud.public_id,
        url: mycloud.secure_url,
      };
    }else {
      await cloudinary.v2.uploader.destroy(response.landords_file1.public_id);
      const fileUri = getDataUri(file);
      const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);
      response.landords_file1 = {
        public_id: mycloud.public_id,
        url: mycloud.secure_url,
      };
    }
  }
  else if(fileName==="landords_file2"){
    if(response.landords_file2.url===undefined ){
      const fileUri = getDataUri(file);
      const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);
      response.landords_file2 = {
        public_id: mycloud.public_id,
        url: mycloud.secure_url,
      };
    }else {
      await cloudinary.v2.uploader.destroy(response.landords_file2.public_id);
      const fileUri = getDataUri(file);
      const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);
      response.landords_file2 = {
        public_id: mycloud.public_id,
        url: mycloud.secure_url,
      };
    }
  }
  else if(fileName==="landords_file3"){
    if(response.ssc_file.url===undefined ){
      const fileUri = getDataUri(file);
      const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);
      response.landords_file3 = {
        public_id: mycloud.public_id,
        url: mycloud.secure_url,
      };
    }else {
      await cloudinary.v2.uploader.destroy(response.landords_file3.public_id);
      const fileUri = getDataUri(file);
      const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);
      response.landords_file3 = {
        public_id: mycloud.public_id,
        url: mycloud.secure_url,
      };
    }
  }
  else if(fileName==="landords_file4"){
    if(response.landords_file4.url===undefined ){
      const fileUri = getDataUri(file);
      const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);
      response.landords_file4 = {
        public_id: mycloud.public_id,
        url: mycloud.secure_url,
      };
    }else {
      await cloudinary.v2.uploader.destroy(response.landords_file4.public_id);
      const fileUri = getDataUri(file);
      const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);
      response.landords_file4 = {
        public_id: mycloud.public_id,
        url: mycloud.secure_url,
      };
    }
  }
  else if(fileName==="hbl_file"){
    if(response.hbl_file.url===undefined ){
      const fileUri = getDataUri(file);
      const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);
      response.hbl_file = {
        public_id: mycloud.public_id,
        url: mycloud.secure_url,
      };
    }else {
      await cloudinary.v2.uploader.destroy(response.hbl_file.public_id);
      const fileUri = getDataUri(file);
      const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);
      response.hbl_file = {
        public_id: mycloud.public_id,
        url: mycloud.secure_url,
      };
    }
  }
  // start 
  else if(fileName==="payment_hbl_file"){
    if(response.payment_hbl_file.url===undefined ){
      const fileUri = getDataUri(file);
      const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);
      response.payment_hbl_file = {
        public_id: mycloud.public_id,
        url: mycloud.secure_url,
      };
    }else {
      await cloudinary.v2.uploader.destroy(response.payment_hbl_file.public_id);
      const fileUri = getDataUri(file);
      const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);
      response.payment_hbl_file = {
        public_id: mycloud.public_id,
        url: mycloud.secure_url,
      };
    }
  }
  else if(fileName==="medical_ind_file"){
    if(response.medical_ind_file.url===undefined ){
      const fileUri = getDataUri(file);
      const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);
      response.medical_ind_file = {
        public_id: mycloud.public_id,
        url: mycloud.secure_url,
      };
    }else {
      await cloudinary.v2.uploader.destroy(response.medical_ind_file.public_id);
      const fileUri = getDataUri(file);
      const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);
      response.medical_ind_file = {
        public_id: mycloud.public_id,
        url: mycloud.secure_url,
      };
    }
  }
  else if(fileName==="medical_sr_file"){
    if(response.medical_sr_file.url===undefined ){
      const fileUri = getDataUri(file);
      const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);
      response.medical_sr_file = {
        public_id: mycloud.public_id,
        url: mycloud.secure_url,
      };
    }else {
      await cloudinary.v2.uploader.destroy(response.medical_sr_file.public_id);
      const fileUri = getDataUri(file);
      const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);
      response.medical_sr_file = {
        public_id: mycloud.public_id,
        url: mycloud.secure_url,
      };
    }
  }
  else if(fileName==="handicap_file"){
    if(response.handicap_file.url===undefined ){
      const fileUri = getDataUri(file);
      const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);
      response.handicap_file = {
        public_id: mycloud.public_id,
        url: mycloud.secure_url,
      };
    }else {
      await cloudinary.v2.uploader.destroy(response.handicap_file.public_id);
      const fileUri = getDataUri(file);
      const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);
      response.handicap_file = {
        public_id: mycloud.public_id,
        url: mycloud.secure_url,
      };
    }
  }
  else if(fileName==="education_file"){
    if(response.education_file.url===undefined ){
      const fileUri = getDataUri(file);
      const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);
      response.education_file = {
        public_id: mycloud.public_id,
        url: mycloud.secure_url,
      };
    }else {
      await cloudinary.v2.uploader.destroy(response.education_file.public_id);
      const fileUri = getDataUri(file);
      const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);
      response.education_file = {
        public_id: mycloud.public_id,
        url: mycloud.secure_url,
      };
    }
  }
  else if(fileName==="nps_file"){
    if(response.nps_file.url===undefined ){
      const fileUri = getDataUri(file);
      const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);
      response.nps_file = {
        public_id: mycloud.public_id,
        url: mycloud.secure_url,
      };
    }else {
      await cloudinary.v2.uploader.destroy(response.nps_file.public_id);
      const fileUri = getDataUri(file);
      const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);
      response.nps_file = {
        public_id: mycloud.public_id,
        url: mycloud.secure_url,
      };
    }
  }
  else if(fileName==="donation_file"){
    if(response.donation_file.url===undefined ){
      const fileUri = getDataUri(file);
      const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);
      response.donation_file = {
        public_id: mycloud.public_id,
        url: mycloud.secure_url,
      };
    }else {
      await cloudinary.v2.uploader.destroy(response.donation_file.public_id);
      const fileUri = getDataUri(file);
      const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);
      response.donation_file = {
        public_id: mycloud.public_id,
        url: mycloud.secure_url,
      };
    }
  }
  else if(fileName==="electric_file"){
    if(response.electric_file.url===undefined ){
      const fileUri = getDataUri(file);
      const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);
      response.electric_file = {
        public_id: mycloud.public_id,
        url: mycloud.secure_url,
      };
    }else {
      await cloudinary.v2.uploader.destroy(response.electric_file.public_id);
      const fileUri = getDataUri(file);
      const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);
      response.electric_file = {
        public_id: mycloud.public_id,
        url: mycloud.secure_url,
      };
    }
  }
  else if(fileName==="extra_file"){
    if(response.extra_file.url===undefined ){
      const fileUri = getDataUri(file);
      const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);
      response.extra_file = {
        public_id: mycloud.public_id,
        url: mycloud.secure_url,
      };
    }else {
      await cloudinary.v2.uploader.destroy(response.extra_file.public_id);
      const fileUri = getDataUri(file);
      const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);
      response.extra_file = {
        public_id: mycloud.public_id,
        url: mycloud.secure_url,
      };
    }
  }

  response.seen="No";
  response.documentStatus = "Uploaded";
  await response.save();

//  await cloudinary.v2.uploader.destroy(user.avatar.public_id);
// const fileUri = getDataUri(file);
//   const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);

//   await cloudinary.v2.uploader.destroy(user.avatar.public_id);

//   user.avatar = {
//     public_id: mycloud.public_id,
//     url: mycloud.secure_url,
//   };
// console.log(response.pay_slip);
  res.status(200).json({
      success:true,
      message: "File Uploaded Successfully",
      response
      
    });
});

export const getAllResponse = catchAsyncError(async(req, res, next)=>{

    const responses = await FormResponse.find({submitStatus:"Yes"}).sort({submitTime:-1});


    res.status(200).json({
        success:true,
        responses
      });
});
export const getMyResponse = catchAsyncError(async(req, res, next)=>{

  const user = await User.findById(req.user._id);
  const responses = await FormResponse.find({userId:user._id}).sort({createdAt:-1});


  res.status(200).json({
      success:true,
      responses
    });
});





export const getResponseDetails = catchAsyncError(async(req, res, next)=>{
  // console.log("ID", req.params.id);
    const response = await FormResponse.findById(req.params.id);
    // console.log(response);
    res.status(200).json({
        success:true,
        response
      });
});

export const getAllResponseByForm = catchAsyncError(async(req, res, next)=>{
    const form = await ItForm.findById(req.params.id);
    const responses = await FormResponse.find({FormId:form._id, submitStatus:"Yes"}).sort({submitTime:-1});
    res.status(200).json({
        success:true,
        responses
      });
});

export const getAllPendingResponse = catchAsyncError(async(req, res, next)=>{
  const user = await User.findById(req.user._id);
  const responses = await FormResponse.find({seen:"No", submitStatus:"Yes"}).sort({submitTime:-1});
  res.status(200).json({
      success:true,
      responses,
      count:responses.length
    });
});

export const activeResponses = catchAsyncError(async(req, res, next)=>{
  // const form = await ItForm.findById(req.params.id);
  const user = await User.findById(req.user._id);
  const allForm = await ItForm.find({visibility:"Active"});
  const response = await FormResponse.find({userId:user._id});
  // console.log(response);

  let todayDate = Date.now();
  let forms=[];
  for (let i= 0;i<allForm.length;i++){
    if(new Date(allForm[i].expiryDate)>=todayDate){
      forms.push(allForm[i]);
    }
  }
  // console.log(forms);
  let responses = []
  for(let i=0; i<response.length; i++){
    for(let j=0; j<forms.length; j++){
      // console.log(response[i].FormId,forms[j]._id);
      if(response[i].FormId.toString()===forms[j]._id.toString()){
        responses.push(response[i]);
      }
    }
  }
  // const forms = await ItForm.find({expiryDate:expiryDate>todayDate})
  // log
  res.status(200).json({
      success:true,
      responses
    });
});



