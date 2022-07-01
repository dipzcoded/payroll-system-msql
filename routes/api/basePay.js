import express from "express";
// import auth, { restrictAccessRoute } from "../../middlewares/auth.js";
import {
  getBasePay,
  createBasePay,
  updateBasePay,
} from "../../controllers/basePay.js";
import { updateAllSalarySteps } from "../../controllers/salaryStep.js";
const router = express.Router();

// router.use(auth);
// router.use(restrictAccessRoute("HR"));
router.route("/").get(getBasePay).post(createBasePay);
router.route("/:id").patch(updateBasePay, updateAllSalarySteps);

export default router;
