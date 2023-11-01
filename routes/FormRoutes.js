import express from "express";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js"
import { ActiveHandler, FormForUser, createForm, deleteForm, getAllActiveForm, getAllForms, getFormDetails, updateForm } from "../controllers/FormController.js";




const router = express.Router();


router.route('/form/new').post(isAuthenticated, authorizeAdmin, createForm );
router.route('/forms').get(isAuthenticated, authorizeAdmin, getAllForms);
router.route('/admin/forms').get(isAuthenticated, authorizeAdmin, getAllActiveForm);
router.route('/user/forms').get(isAuthenticated, FormForUser);
router.route('/form/active/:id').put(isAuthenticated, ActiveHandler)
router.route('/form/:id').get(isAuthenticated, getFormDetails).delete(isAuthenticated, authorizeAdmin, deleteForm).put(isAuthenticated, authorizeAdmin, updateForm);

export default router;
