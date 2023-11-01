import express from "express";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js"
import { CreateExtraMonths, DeleteExtraMonths, GetAllMonths, GetSingleMonths, UpdateExtraMonths } from "../controllers/ExtraMonthController.js";

const router = express.Router();


router.route('/extra-months/new').post(isAuthenticated, authorizeAdmin, CreateExtraMonths);
router.route('/extramonth/:id').put(isAuthenticated, authorizeAdmin, UpdateExtraMonths).delete(isAuthenticated, authorizeAdmin,DeleteExtraMonths);
router.route('/extramonth/:id/:month').get(isAuthenticated, authorizeAdmin, GetSingleMonths);
router.route('/all-extra-months/:id').get(isAuthenticated, authorizeAdmin, GetAllMonths);


export default router;
