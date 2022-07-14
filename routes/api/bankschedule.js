import express from "express";
import {
  createBankSchedule,
  getMonthlyBankSchedules,
  deleteBankScheduleById,
  ceoApproveBankSchedules,
  ceoGetNotApprovedBankSchedules,
} from "../../controllers/bankschedule.js";

import auth, { restrictAccessRoute } from "../../middlewares/auth.js";

const router = express.Router();

router.use(auth);
router
  .route("/approve")
  .patch(restrictAccessRoute("CEO"), ceoApproveBankSchedules);
router
  .route("/notapproved")
  .get(restrictAccessRoute("CEO"), ceoGetNotApprovedBankSchedules);

router
  .route("/")
  .get(
    restrictAccessRoute("Accountant", "CEO", "HR", "Internal Auditor"),
    getMonthlyBankSchedules
  )
  .post(restrictAccessRoute("Accountant"), createBankSchedule);

router.route("/:id").delete(deleteBankScheduleById);

export default router;
