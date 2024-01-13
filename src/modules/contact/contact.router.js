import {Router} from 'express'
import * as contactController from './contact.controller.js'
import { auth } from '../../middleware/auth.js'
import { endPoint } from './contact.endpoint.js'
import { asyncHandler } from '../../services/errorHandling.js'
import { validation } from '../../middleware/validation.js'
import * as validator from './contact.validation.js'
const router=Router()

router.post('/',auth(endPoint.create),validation(validator.contactSchema),asyncHandler(contactController.contact)) 
 router.get('/',auth(endPoint.get),asyncHandler(contactController.getMessages))
 router.delete('/',auth(endPoint.delete),asyncHandler(contactController.deleteContact))
//  router.put('/',auth(endPoint.update),asyncHandler(contactController.updateContact))
export default router  