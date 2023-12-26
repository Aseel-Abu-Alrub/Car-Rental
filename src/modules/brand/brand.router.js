import {Router} from "express"
import * as brandController from "./brand.controller.js"
import { asyncHandler } from "../../services/errorHandling.js"
import { auth } from "../../middleware/auth.js"
import { endPoint } from "./brand.endpoint.js"
import fileUpload, { fileValidation } from "../../services/multer.js"
import { validation } from "../../middleware/validation.js"
import * as validator from  './brand.validation.js'

const router=Router() 

router.post('/',auth(endPoint.create),fileUpload(fileValidation.image).single('image'),validation(validator.createBrandSchema),asyncHandler(brandController.createbrand))
router.put('/:brandId',auth(endPoint.update),fileUpload(fileValidation.image).single('image'),validation(validator.updateBrandSchema),asyncHandler(brandController.updateBrand))
router.get('/allbrand',auth(endPoint.getAll),asyncHandler(brandController.getAllBrand))
router.get('/activebrand',asyncHandler(brandController.getActiveBrand))
router.get('/:brandId',asyncHandler(brandController.getSpiceficBrand))
router.delete('/:brandId',auth(endPoint.delete),asyncHandler(brandController.deleteSpecificBrand))
router.delete('/',auth(endPoint.delete),asyncHandler(brandController.deleteAllBrand))
export default router 