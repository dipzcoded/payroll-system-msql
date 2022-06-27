import express from "express";
// import auth, { restrictAccessRoute } from "../../middlewares/auth.js";
import {
  createSalaryLevel,
  deleteSalaryLevelById,
  getAllSalaryLevels,
  getSalaryLevelByGrade,
  getSalaryLevelById,
  updateSalaryLevel,
} from "../../controllers/salaryLevel.js";
const router = express.Router();

// router.use(auth);
// router.use(restrictAccessRoute("HR"));
router.route("/").get(getAllSalaryLevels);
router.route("/:id").get(getSalaryLevelById).delete(deleteSalaryLevelById);
router.route("/:gradeId/create").post(createSalaryLevel);
router.route("/:id/:gradeId").patch(updateSalaryLevel);
router.route("/:gradeId/grade").get(getSalaryLevelByGrade);

export default router;
