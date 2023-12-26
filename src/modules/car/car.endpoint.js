import { roles } from "../../middleware/auth.js";


export const endPoint={
 create:[roles.Admin] ,
 getAll:[roles.Admin],
 getActive:[roles.User,roles.Admin],
 delete:[roles.Admin],
 update:[roles.Admin]

}