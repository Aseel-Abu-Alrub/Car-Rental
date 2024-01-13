import { Router } from "express";
import * as couponController from './coupon.controller.js'
import { asyncHandler } from "../../services/errorHandling.js";
import { endPoint } from "./coupon.endpoint.js";
import { auth } from "../../middleware/auth.js";
import { validation } from "../../middleware/validation.js";
import * as validator from './coupon.validation.js'
const router=Router()

router.post('/',auth(endPoint.create),validation(validator.createSchema),asyncHandler(couponController.createCoupon))
router.put('/:id',auth(endPoint.update),validation(validator.updateSchema),asyncHandler(couponController.updateCoupon))
router.get('/',auth(endPoint.get),asyncHandler(couponController.getCoupon))
router.patch('/softdelete/:id',auth(endPoint.delete),validation(validator.softDeleteSchema),asyncHandler(couponController.softDelete))
router.patch('/restore/:id',auth(endPoint.restore),validation(validator.restore),asyncHandler(couponController.restore))
router.delete('/harddelete/:id',auth(endPoint.delete),validation(validator.hardDeleteSchema),asyncHandler(couponController.hardDelete))


export default router