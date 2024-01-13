import {Router} from 'express'
import * as orderController from './order.controller.js'
import { endPoint } from './order.endpoint.js'
import { asyncHandler } from '../../services/errorHandling.js'
import { auth } from '../../middleware/auth.js'
import { validation } from '../../middleware/validation.js'
import * as validator from './order.validation.js'
const router=Router()

router.post('/',auth(endPoint.create),validation(validator.createSchema),orderController.createOrder)
router.get('/',auth(endPoint.get),asyncHandler(orderController.getOrder))
router.patch('/cancel/:orderId',auth(endPoint.cancel),validation(validator.cancelSchema),asyncHandler(orderController.cancelOrder))
router.patch('/changestatus/:orderId',auth(endPoint.change),validation(validator.changeSchema),asyncHandler(orderController.changeStatus))


export default router 

