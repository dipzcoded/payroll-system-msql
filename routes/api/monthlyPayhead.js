import express from "express";
import {
  createMonthlyPayHead,
  getAllMonthlyPayHead,
  getMonthlyPayHeadById,
  updateMonthlyPayHead,
  deleteMonthlyPayHead,
} from "../../controllers/monthlyPayHead.js";

// import auth, { restrictAccessRoute } from "../../middlewares/auth.js";
// import { checkModelDataCached } from "../../middlewares/cache.js";
const router = express.Router();

// router.use(auth);
// router.use(restrictAccessRoute("HR"));
router.route("/").get(getAllMonthlyPayHead).post(createMonthlyPayHead);
router
  .route("/:id")
  .get(getMonthlyPayHeadById)
  .patch(updateMonthlyPayHead)
  .delete(deleteMonthlyPayHead);

export default router;
