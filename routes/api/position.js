import express from "express";
import {
  createPosition,
  deletePositionById,
  getAllPosition,
  getPositionByDepartment,
  updatePosition,
} from "../../controllers/position.js";

const router = express.Router();

router.route("/").get(getAllPosition);
router.route("/:department").get(getPositionByDepartment);
router.route("/:id").delete(deletePositionById);
router.route("/:department/create").post(createPosition);
router.route("/:id/:department/update").patch(updatePosition);

export default router;
