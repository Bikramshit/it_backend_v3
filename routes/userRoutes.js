import express from "express";

import { changePassword, CreateUser, deleteMyProfile, deleteUser, forgetPassword, getAllAdmins, getAllStudents, getAllUsers, getMyProfile, getUserDetails, login, loginAdmin, logout, Register,  ResendOTP,  resetPassword,  SendMail,  updateProfile,  updateUserRole, VerifyOtp } from "../controllers/userController.js";
import { authorizeAdmin, isAuthenticated, notAuthorizeUser } from "../middlewares/auth.js";

const router = express.Router();

// Register & Send otp
router.route('/register').post(Register);

router.route('/verify').post(VerifyOtp);
router.route('/resend').put(ResendOTP);

router.route('/admin/new/user').post(isAuthenticated, authorizeAdmin, CreateUser);



// Login
router.route('/login').post(login);

// admin login
router.route('/admin/login').post(loginAdmin)

// get user details 
router.route('/admin/user/:id').get(isAuthenticated, notAuthorizeUser, getUserDetails)

// Logout
router.route('/logout').get(logout);
// Get my profile
router.route("/me").get(isAuthenticated, getMyProfile);

// Delete my profile
router.route("/me").delete(isAuthenticated, deleteMyProfile);

// ChangePassword
router.route("/changepassword").put(isAuthenticated, changePassword);

// UpdateProfile
router.route("/admin/user/update/:id").put(isAuthenticated, updateProfile);


// ForgetPasswordw
router.route("/forgetpassword").post(forgetPassword);

// ResetPassword
router.route("/resetpassword/:token").put(resetPassword);

// Admin Routes
router.route("/admin/users").get(isAuthenticated, authorizeAdmin, getAllUsers);

// Admin Routes
router.route("/admin/students").get(isAuthenticated, authorizeAdmin, getAllStudents);





// Admin Routes
router.route("/admin/admins").get(isAuthenticated, authorizeAdmin, getAllAdmins);
router
  .route("/admin/user/:id")
  .put(isAuthenticated, authorizeAdmin, updateUserRole)
  .delete(isAuthenticated, authorizeAdmin, deleteUser);

router.route('/send/mail').post(isAuthenticated, authorizeAdmin, SendMail)


export default router;