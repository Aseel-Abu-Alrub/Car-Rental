import {Router} from "express";
import * as AuthController from './auth.controller.js'
import { asyncHandler } from "../../services/errorHandling.js";
import fileUpload, { fileValidation } from "../../services/multer.js";
import * as validator from './auth.validation.js'
import { validation } from "../../middleware/validation.js";
const router=Router()

router.post('/signup',fileUpload(fileValidation.image).single('image'),validation(validator.signupSchema),asyncHandler(AuthController.signUp))
router.post('/signupAdmin',fileUpload(fileValidation.image).single('image'),validation(validator.signupSchema),asyncHandler(AuthController.signUpAdmin))

router.get('/confirmemail/:token',asyncHandler(AuthController.confirmEmail))
router.post('/signin',validation(validator.signinSchema),asyncHandler(AuthController.signin))
router.patch('/sendcode',asyncHandler(AuthController.sendCode))
router.patch('/forgotpassword',asyncHandler(AuthController.forgotPassword))

export default router