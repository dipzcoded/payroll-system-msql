import express from "express";
// import auth, { restrictAccessRoute } from "../../middlewares/auth.js";
import {
  createSalaryGrade,
  deleteSalaryGradeById,
  getAllSalaryGrade,
  getSalaryGradeById,
  updateSalaryGrade,
} from "../../controllers/salaryGrade.js";
const router = express.Router();
// router.use(auth);
// router.use(restrictAccessRoute("HR"));
router.route("/").get(getAllSalaryGrade).post(createSalaryGrade);
router
  .route("/:id")
  .get(getSalaryGradeById)
  .patch(updateSalaryGrade)
  .delete(deleteSalaryGradeById);

export default router;
