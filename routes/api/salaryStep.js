import express from "express";
// import auth, { restrictAccessRoute } from "../../middlewares/auth.js";
import {
  createSalaryStepV2,
  getSalaryStep,
  deleteSalaryStepById,
  getSalaryStepsBySalaryLevel,
} from "../../controllers/salaryStep.js";
const router = express.Router();

// router.use(auth);
// router.use(restrictAccessRoute("HR"));
router.route("/").get(getSalaryStep);
router.route("/:id").delete(deleteSalaryStepById);
router.route("/:salaryLevelId").get(getSalaryStepsBySalaryLevel);
router.route("/:salaryLevelId/:salaryGradeId").post(createSalaryStepV2);

export default router;
