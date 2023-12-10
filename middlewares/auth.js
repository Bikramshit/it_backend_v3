import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/errorHandler.js";
import { catchAsyncError } from "./catchAsyncError.js";
import { User } from "../models/User.js";


export const isAuthenticated = catchAsyncError(async (req, res, next) => {
  
  const { token } = req.cookies;
  console.log(token);
  if (!token) return next(new ErrorHandler("welcome", 409));
  

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decoded._id);

  next();
});




export const authorizeAdmin = (req, res, next) => {
    if (req.user.role !== "admin")
      return next(
        new ErrorHandler(
          `${req.user.role} is not allowed to access this resource`,
          403
        )
      );
  
    next();
};

export const onlyUser = (req, res, next) => {
  if (req.user.role !== "user")
    return next(
      new ErrorHandler(
        `${req.user.role} is not allowed to access this resource`,
        403
      )
    );

  next();
};




  export const notAuthorizeUser = (req, res, next) => {
   
    if (req.user.role === "user")
      return next(
        new ErrorHandler(
          `${req.user.role} is not allowed to access this resource`,
          403
        )
      );
  
    next();
  };

export const authorizeSubscriber = (req, res, next) => {
   
    if (req.user.subscription.status !== "active" && (req.user.role!=="admin" || req.user.role!=="teacher"))
      return next(
        new ErrorHandler(
          `Only subscriber can access this resources`,
          403
        )
      );
  
    next();
  };

