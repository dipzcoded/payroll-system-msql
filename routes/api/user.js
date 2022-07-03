import express from "express";
import {
  getLoginUser,
  login,
  register,
  //   updateUserAdminDetails,
  //   updateUserPassword,
  forgotPassword,
  resetPassword,
  updateAdminDetails,
  logoutfunc,
  userLoginStatus,
  validTokenStatus,
  updateCeoSignatureImage,
} from "../../controllers/user.js";
import auth, { restrictAccessRoute } from "../../middlewares/auth.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/forgotPassword").post(forgotPassword);

router.route("/resetPassword/:token").patch(resetPassword);
router.use(auth);
router.route("/logout").post(logoutfunc);

router.route("/token/status").get(validTokenStatus);
router
  .route("/me")
  .get(
    restrictAccessRoute(
      "CEO",
      "HR",
      "Employee",
      "Internal Auditor",
      "Accountant"
    ),
    getLoginUser
  );
router.route("/check/status").get(userLoginStatus);
// router
//   .route("/update-password")
//   .patch(restrictAccessRoute("CEO", "HR", "Employee"), updateUserPassword);
// router
//   .route("/update-admindetails")
//   .patch(restrictAccessRoute("CEO", "HR"), updateUserAdminDetails);
router
  .route("/update-admin")
  .patch(
    restrictAccessRoute("CEO", "HR", "Internal Auditor", "Accountant"),
    updateAdminDetails
  );

// // CEO signature upload
router
  .route("/signature-upload")
  .patch(restrictAccessRoute("CEO"), updateCeoSignatureImage);

export default router;
