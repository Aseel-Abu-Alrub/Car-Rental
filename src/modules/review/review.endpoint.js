import { roles } from "../../middleware/auth.js";


export const endPoint={
 create:[roles.User],
 get:[roles.User],
 getAll:[roles.Admin],
 delete:[roles.User],
 update:[roles.User] 
}