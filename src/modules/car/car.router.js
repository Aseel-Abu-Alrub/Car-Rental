import {Router} from "express"
import * as carController from "./car.controller.js"
import { asyncHandler } from "../../services/errorHandling.js"
import { auth } from "../../middleware/auth.js"
import { endPoint } from "./car.endpoint.js"
import fileUpload, { fileValidation } from "../../services/multer.js"

const router=Router({mergeParams:true})

router.post('/',auth(endPoint.create),fileUpload(fileValidation.image).fields([
 {name:'mainImage',maxCount:1},
 {name:'subImages',maxCount:4}   
]),asyncHandler(carController.createCar))

router.get('/all',auth(endPoint.getAll),asyncHandler(carController.getAllCar))
router.get('/active',asyncHandler(carController.getActiveCar))
router.get('/:carId',asyncHandler(carController.getSpecificCar))

router.delete('/:carId',auth(endPoint.delete),asyncHandler(carController.deleteSpecificCar))
router.put('/:carId',auth(endPoint.update),fileUpload(fileValidation.image).fields([
    {name:'mainImage',maxCount:1},
    {name:'subImages',maxCount:4}   
   ]),asyncHandler(carController.updateCar))

export default router