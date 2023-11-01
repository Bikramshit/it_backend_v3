import express from "express";
import { authorizeAdmin, isAuthenticated, onlyUser } from "../middlewares/auth.js";
import { ApprovedResponse, CreateResponse, DocumentUpdate, ResponseFileUpload, SubmitResponse, activeResponses, deleteResponse, getAllPendingResponse, getAllResponse, getAllResponseByForm, getMyResponse, getResponseDetails, updateResponse } from "../controllers/ResponseController.js";
import singleUpload from "../middlewares/multer.js";


const router =express.Router();


router.route('/new/response/:id').post(isAuthenticated, onlyUser, CreateResponse);

router.route('/response/:id').put(isAuthenticated, updateResponse).get(isAuthenticated, getResponseDetails).delete(isAuthenticated, onlyUser, deleteResponse);

router.route('/response/upload/:id').put(isAuthenticated, onlyUser, singleUpload, ResponseFileUpload)

router.route('/responses').get(isAuthenticated, authorizeAdmin, getAllResponse);

router.route('/myresponses').get(isAuthenticated, onlyUser, getMyResponse)

router.route('/form/response/:id').get(isAuthenticated, authorizeAdmin, getAllResponseByForm);

router.route('/response/submit/:id').put(isAuthenticated, onlyUser, SubmitResponse);

router.route('/responses/pending').get(isAuthenticated, authorizeAdmin, getAllPendingResponse)

router.route('/active/responses').get(isAuthenticated, onlyUser, activeResponses);

router.route('/approved/response/:id').put(isAuthenticated, authorizeAdmin, ApprovedResponse);
router.route('/document/status/:id').put(isAuthenticated, authorizeAdmin, DocumentUpdate);






export default router;