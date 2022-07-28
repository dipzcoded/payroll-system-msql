import express from "express";
import {
  //   employeeAllowanceAdd,
  employeeAllowanceRemove,
  //   employeeDeductionAdd,
  employeeDeductionRemove,
  getAllEmployees,
  // createEmployeeV2,
  updateEmployeeV2,
  deleteEmployeeV2,
  getEmployeeByIdV2,
  getEmployeeByUserId,
  deleteBulkEmployeeByIdsV2,
  //   createBulkEmployeeV2,
  getAllEmployeesV2,
  employeeTopUp,
  //   employeeGetPayslips,
  createEmployeeV3,
  //   createBulkContractEmployeeV3,
} from "../../controllers/employee.js";
import auth, { restrictAccessRoute } from "../../middlewares/auth.js";

const router = express.Router();
router.use(auth);
router.route("/").get(restrictAccessRoute("CEO", "HR"), getAllEmployees);
router
  .route("/:empId/payheads-topup")
  .post(restrictAccessRoute("HR"), employeeTopUp);
router
  .route("/not-generated/payslips")
  .get(restrictAccessRoute("CEO", "HR"), getAllEmployeesV2);
// router
//   .route("/create-bulk")
//   .post(restrictAccessRoute("HR"), createBulkEmployeeV2);

// router
//   .route("/create-bulk/contract")
//   .patch(restrictAccessRoute("HR"), createBulkContractEmployeeV3);

router
  .route("/delete-bulk")
  .patch(restrictAccessRoute("HR"), deleteBulkEmployeeByIdsV2);
router
  .route("/:id")
  .get(restrictAccessRoute("HR"), getEmployeeByIdV2)
  .delete(restrictAccessRoute("HR"), deleteEmployeeV2);
// router
//   .route("/:id/:allowance/allowance/add")
//   .patch(restrictAccessRoute("HR"), employeeAllowanceAdd);
router
  .route("/:id/:allowance/allowance/remove")
  .patch(restrictAccessRoute("HR"), employeeAllowanceRemove);
// router
//   .route("/:id/:deduction/deduction/add")
//   .patch(restrictAccessRoute("HR"), employeeDeductionAdd);
router
  .route("/:id/:deduction/deduction/remove")
  .patch(restrictAccessRoute("HR"), employeeDeductionRemove);
router
  .route("/:department/:position/create")
  .post(restrictAccessRoute("HR"), createEmployeeV3);
// // router.route("/create").post(restrictAccessRoute("HR"), createEmployeeV3);
router
  .route("/:id/:department/:position/update")
  .patch(restrictAccessRoute("HR"), updateEmployeeV2);

router.use(restrictAccessRoute("Employee"));
router.route("/loginuser/details").get(getEmployeeByUserId);
// router.route("/get-generated/payslips").get(employeeGetPayslips);

export default router;
