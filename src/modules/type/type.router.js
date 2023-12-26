import {Router} from 'express'
import * as typeController from './type.controller.js'
import * as validator from './type.validation.js'
import { endPoint } from './type.endpoint.js'
import { validation } from '../../middleware/validation.js'
import fileUpload, { fileValidation } from '../../services/multer.js'
import { auth } from '../../middleware/auth.js'
import { asyncHandler } from '../../services/errorHandling.js'

const router=Router()
router.post('/',auth(endPoint.create),fileUpload(fileValidation.image).single('image'),validation(validator.createTypeSchema),typeController.createType)
router.put('/:typeId',auth(endPoint.update),fileUpload(fileValidation.image).single('image'),validation(validator.updateTypeSchema),asyncHandler(typeController.updateType))
router.get('/alltype',auth(endPoint.getAll),asyncHandler(typeController.getAllType))
router.get('/activetype',asyncHandler(typeController.getActiveType))
router.get('/:typeId',asyncHandler(typeController.getSpiceficType))
router.delete('/:typeId',auth(endPoint.delete),asyncHandler(typeController.deleteSpecificType))
router.delete('/',auth(endPoint.delete),asyncHandler(typeController.deleteAllType))



export default router  