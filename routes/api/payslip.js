import express from "express";
import {
  generatePaySlip,
  getGeneratedPaySlips,
  deletePayslipById,
  generateBulkPaySlipsV2,
  deleteBulkPayslipsByIds,
  createApprovedSalaryslip,
  createPreApprovedSalaryslip,
  getApprovedSalaryslips,
  getNotApprovedSalaryslips,
  getPreAprrovedSalaryslips,
  getRejectedSalaryslips,
  rejectNotApprovedSalaryslips,
  rejectPreApprovedSalaryslips,
  createNotApprovedSalaryslip,
  rejectBulkSalaryslips,
} from "../../controllers/payslip.js";
import auth, { restrictAccessRoute } from "../../middlewares/auth.js";
const router = express.Router();

router.use(auth);

router
  .route("/generatedslips")
  .get(restrictAccessRoute("HR"), getGeneratedPaySlips);
router
  .route("/generate/slip/:empId")
  .post(restrictAccessRoute("HR"), generatePaySlip);
router
  .route("/generate-bulk")
  .post(restrictAccessRoute("HR"), generateBulkPaySlipsV2);
router
  .route("/delete-bulk")
  .patch(restrictAccessRoute("HR"), deleteBulkPayslipsByIds);
router
  .route("/notapproved")
  .get(restrictAccessRoute("Internal Auditor"), getNotApprovedSalaryslips);
router
  .route("/preapproved")
  .get(restrictAccessRoute("CEO"), getPreAprrovedSalaryslips);
router
  .route("/approved")
  .get(restrictAccessRoute("CEO", "Accountant"), getApprovedSalaryslips);
router
  .route("/rejected")
  .get(restrictAccessRoute("HR", "Internal Auditor"), getRejectedSalaryslips);
router
  .route("/reject/notapproved")
  .patch(restrictAccessRoute("Internal Auditor"), rejectNotApprovedSalaryslips);
router
  .route("/reject/preapproved")
  .patch(restrictAccessRoute("CEO"), rejectPreApprovedSalaryslips);

router
  .route("/reject/excelbulk")
  .patch(restrictAccessRoute("Internal Auditor", "CEO"), rejectBulkSalaryslips);

router
  .route("/create/notapproved")
  .patch(restrictAccessRoute("HR"), createNotApprovedSalaryslip);

router
  .route("/create/preapproved")
  .patch(restrictAccessRoute("Internal Auditor"), createPreApprovedSalaryslip);
router
  .route("/create/approved")
  .patch(restrictAccessRoute("CEO"), createApprovedSalaryslip);
router.route("/:id").delete(deletePayslipById);

export default router;
