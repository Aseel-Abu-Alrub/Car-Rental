import { Router } from "express";
import * as UserController from "./user.controller.js"
import { auth, roles } from "../../middleware/auth.js";
import { asyncHandler } from "../../services/errorHandling.js";
import { endPoint } from "./user.endpoint.js";
const router=Router()


router.get('/',auth(endPoint.get),asyncHandler(UserController.profile))

export default router