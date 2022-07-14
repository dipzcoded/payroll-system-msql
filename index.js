import express from "express";
import departmentRoutes from "./routes/api/department.js";
import positionRoutes from "./routes/api/position.js";
import allowanceRoutes from "./routes/api/allowance.js";
import deductionRoutes from "./routes/api/deduction.js";
import monthlyPayHeadRoutes from "./routes/api/monthlyPayhead.js";
import bankRoutes from "./routes/api/bank.js";
import salaryGradeRoutes from "./routes/api/salaryGrade.js";
import salaryLevelRoutes from "./routes/api/salaryLevel.js";
import salaryStepRoutes from "./routes/api/salaryStep.js";
import basePayRoutes from "./routes/api/basePay.js";
import authRoutes from "./routes/api/user.js";
import employeeRoutes from "./routes/api/employee.js";
import paySlipRoutes from "./routes/api/payslip.js";
import voucherRoutes from "./routes/api/voucher.js";
import bankScheduleRoutes from "./routes/api/bankschedule.js";
import { error, notFound } from "./middlewares/error.js";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
// initialize a new express app
const app = express();

// loading environment variables
dotenv.config();

// middlewares
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(
  express.json({
    limit: "30mb",
  })
);

// app.use(express.urlencoded({limit : "30mb"}))
app.use(
  cors({
    origin: ["http://localhost:5000"],
    credentials: true,
  })
);

app.use(cookieParser());
// routes
app.use("/api/users", authRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/positions", positionRoutes);
app.use("/api/allowances", allowanceRoutes);
app.use("/api/deductions", deductionRoutes);
app.use("/api/monthlypayhead", monthlyPayHeadRoutes);
app.use("/api/bank", bankRoutes);
app.use("/api/salarygrade", salaryGradeRoutes);
app.use("/api/salarylevel", salaryLevelRoutes);
app.use("/api/salarystep", salaryStepRoutes);
app.use("/api/basepay", basePayRoutes);
app.use("/api/payslip", paySlipRoutes);
app.use("/api/vouchers", voucherRoutes);
app.use("/api/bankschedule", bankScheduleRoutes);

app.use(notFound);
app.use(error);

const port = 5000 || process.env.PORT;

// server connection
app.listen(port, () => {
  console.log(`server started on port: ${port}`);
});
