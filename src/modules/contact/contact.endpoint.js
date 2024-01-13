import { roles } from "../../middleware/auth.js";

export const endPoint={
  create:[roles.User],
  get:[roles.Admin],
  delete:[roles.User],
  update:[roles.User]
}