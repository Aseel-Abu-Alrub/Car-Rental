import { Router } from "express";
import * as reviewController from './review.controller.js'
import { endPoint } from "./review.endpoint.js";

import { asyncHandler } from "../../services/errorHandling.js";
import { auth } from "../../middleware/auth.js";
import { validation } from "../../middleware/validation.js";
import * as validator from './review.validation.js'
const router=Router()

router.post('/:carId',auth(endPoint.create),validation(validator.createReviewSchema),asyncHandler(reviewController.createReview))
router.get('/',auth(endPoint.get),asyncHandler(reviewController.getReview))
router.get('/allReviews',auth(endPoint.getAll),asyncHandler(reviewController.getAll))
router.delete('/:id',auth(endPoint.delete),validation(validator.deleteSchema),asyncHandler(reviewController.deleteReview))
router.put('/:id',auth(endPoint.update),validation(validator.updateSchema),asyncHandler(reviewController.updateReview))
export default router