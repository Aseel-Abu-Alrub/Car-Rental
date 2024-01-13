import { Router } from "express";
import * as rentController from './rent.controller.js'
import { asyncHandler } from "../../services/errorHandling.js";
import { endPoint } from "./rent.endpoint.js";
import { auth } from "../../middleware/auth.js";
import { validation } from "../../middleware/validation.js";
import * as validator from './rent.validation.js'

const router=Router({mergeParams:true})

router.post('/',auth(endPoint.createRent),validation(validator.createSchema),asyncHandler(rentController.rentCar))
router.get('/allrent',auth(endPoint.getAllRent),asyncHandler(rentController.getAllRent))
router.get('/',auth(endPoint.get),asyncHandler(rentController.getRent))
router.patch('/removeRent',auth(endPoint.remove),validation(validator.removeSchema),asyncHandler(rentController.removeRent))
router.patch('/clear',auth(endPoint.remove),asyncHandler(rentController.clearRent))
export default router