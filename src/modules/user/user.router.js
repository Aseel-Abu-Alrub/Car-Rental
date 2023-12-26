import { Router } from "express";
import * as UserController from "./user.controller.js"
import { auth, roles } from "../../middleware/auth.js";
import { asyncHandler } from "../../services/errorHandling.js";
import { endPoint } from "./user.endpoint.js";
import { validation } from "../../middleware/validation.js";
import * as validator from "./user.validation.js"
const router=Router()


router.get('/',auth(endPoint.get),asyncHandler(UserController.profile))
router.patch('/:userId',auth(endPoint.updatePassword),validation(validator.changePassSchema),asyncHandler(UserController.updatePassword))
export default router