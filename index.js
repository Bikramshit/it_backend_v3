import app from "./app.js";
import { connectDB } from "./config/database.js";
import cloudinary from "cloudinary";


connectDB();

cloudinary.v2.config({
  cloud_name:process.env.CLOUDINARY_CLIENT_NAME,
  api_key:process.env.CLOUDINARY_CLIENT_API,
  api_secret:process.env.CLOUDINARY_CLIENT_SECRET
});











app.use('/', (req,res,send)=>{
  return res.send (`<h1>Working on backend. Please enter frontend <a href='${process.env.FRONTEND_URL}' target='_black'> Click here </a> </h1>`)
})








let port = process.env.PORT || 4040

app.listen(port, () => {
    console.log(`Server is working on port: ${process.env.PORT}`);
  });
  
