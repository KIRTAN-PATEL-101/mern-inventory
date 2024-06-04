import { Router } from "express";
import { registerUser, validateuser, logoutUser, refreshAccessToken, userDetail,dashboardElement } from "../Controllers/user.controller.js";
import { upload } from "../Middlewares/multer.middleware.js";
import { verifyJWT } from "../Middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "profilepic",
      maxCount: 1,
    },
  ]),
  registerUser
);
router.route('/login').post(validateuser)
router.route('/logout').get(verifyJWT, logoutUser)
router.route('/refresh-token').get(refreshAccessToken)
router.route('/dashboard').get(verifyJWT,dashboardElement)
router.route('/details').get(verifyJWT, userDetail)


export default router;
