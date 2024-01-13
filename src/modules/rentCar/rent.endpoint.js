import { roles } from "../../middleware/auth.js";


export const endPoint={
// crateRent:Object.values(roles),
createRent:[roles.User],
 getAllRent:[roles.Admin],
 get:[roles.User],
 remove:[roles.User]
}