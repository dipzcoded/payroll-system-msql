import express from "express";
import {
  createDepartment,
  getAllDeparments,
  deleteDepartmentById,
  updateDepartmentById,
} from "../../controllers/department.js";

// router
const router = express.Router();

router.route("/").get(getAllDeparments).post(createDepartment);
router.route("/:id").patch(updateDepartmentById).delete(deleteDepartmentById);

export default router;
