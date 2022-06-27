import express from "express";
import {
  createDeduction,
  deleteDeduction,
  getAllDeduction,
  updateDeduction,
} from "../../controllers/deduction.js";
// import auth, { restrictAccessRoute } from "../../middlewares/auth.js";
const router = express.Router();
// import { checkModelDataCached } from "../../middlewares/cache.js";
// router.use(auth);
// router.use(restrictAccessRoute("HR"));
router.route("/").get(getAllDeduction).post(createDeduction);
router.route("/:id").patch(updateDeduction).delete(deleteDeduction);

export default router;
