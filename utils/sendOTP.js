import fast2sms from "fast-two-sms";
import { createTransport } from "nodemailer";

export const SendOTP = async (to, text)=> {
   
     await fast2sms.sendMessage({authorization:process.env.FAST2SMS_API_KEY, message:text, numbers:[to]});
     return {
        success: true,
        message: "OTP sent successfully",
    };

}


// export const sendEmail = async (to, subject, text) => {
//     const transporter = createTransport({
//       host: process.env.SMTP_HOST,
//       port: process.env.SMTP_PORT,
//       auth: {
//         user: process.env.SMTP_USER,
//         pass: process.env.SMTP_PASS,
//       },
//     });
//     console.log(process.env.SMTP_HOST,process.env.SMTP_PORT, process.env.SMTP_USER,process.env.SMTP_PASS );
//     await transporter.sendMail({
//       to,
//       subject,
//       text,
//     });
//   };


  export const sendEmail = async (to, subject, text) => {
    const transporter = createTransport({
      service:"gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const Options = {
      from: process.env.SMTP_USER,
      to:to,
      subject:subject,
      html: text
    }

    await transporter.sendMail(Options, function(error, info){
      if(error){
        console.log(error);
      }else {
        console.log("Email Sent");
      }
    });
  };