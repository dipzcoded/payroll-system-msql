import express from "express";
const router = express.Router();

import auth, { restrictAccessRoute } from "../../middlewares/auth.js";
import {
  createApprovedBankVouchers,
  createBankVouchersFromApprovedSalaryslips,
  createPreApprovedBankVouchers,
  getApprovedBankVouchers,
  getNotApprovedBankVouchers,
  getPreApprovedBankVouchers,
  getRejectedBankVouchers,
  rejectNotApprovedBankVouchers,
  rejectPreApprovedBankVouchers,
  deleteBankVoucherById,
  deleteBulkBankVouchers,
  getCreatedAsScheduleVouchers,
} from "../../controllers/voucher.js";

router.use(auth);

router
  .route("/notapproved")
  .get(restrictAccessRoute("Internal Auditor"), getNotApprovedBankVouchers);
router
  .route("/preapproved")
  .get(restrictAccessRoute("CEO"), getPreApprovedBankVouchers);
router
  .route("/approved")
  .get(restrictAccessRoute("Accountant"), getApprovedBankVouchers);
router
  .route("/delete-bulk")
  .patch(restrictAccessRoute("Accountant"), deleteBulkBankVouchers);
router
  .route("/rejected")
  .get(
    restrictAccessRoute("Accountant", "Internal Auditor"),
    getRejectedBankVouchers
  );

router
  .route("/approved-asschedule")
  .get(
    restrictAccessRoute("Accountant", "CEO", "HR", "Internal Auditor"),
    getCreatedAsScheduleVouchers
  );

router
  .route("/create/notapproved")
  .post(
    restrictAccessRoute("Accountant"),
    createBankVouchersFromApprovedSalaryslips
  );
router
  .route("/create/preapproved")
  .patch(
    restrictAccessRoute("Internal Auditor"),
    createPreApprovedBankVouchers
  );
router
  .route("/create/approved")
  .patch(restrictAccessRoute("CEO"), createApprovedBankVouchers);
router
  .route("/reject/notapproved")
  .patch(
    restrictAccessRoute("Internal Auditor"),
    rejectNotApprovedBankVouchers
  );
router
  .route("/reject/preapproved")
  .patch(restrictAccessRoute("CEO"), rejectPreApprovedBankVouchers);
router
  .route("/:id")
  .delete(restrictAccessRoute("Accountant"), deleteBankVoucherById);

export default router;
