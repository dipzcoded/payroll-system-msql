import expressAsyncHandler from "express-async-handler";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import excelJs from "exceljs";
import cloudinary from "./cloudinary.js";
import pdf from "html-pdf";

//filename and dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createFolder() {
  // directory full path
  const dir = path.join(__dirname, `../../storage/excel`);

  //check if directory already exists
  if (!fs.existsSync(dir)) {
    // recursively create multiple directories
    fs.mkdirSync(dir, { recursive: true }, (err) => {
      if (err) {
        throw err;
      }
    });
  }
}

export const sendCloudinaryKeys = async (req, res) => {
  const cloudinaryApiKey = process.env.CLOUD_API_KEY;
  const cloudinarySecret = process.env.CLOUD_API_SECRET;
  const cloudinaryKeyName = process.env.CLOUD_NAME;

  res.json({
    cloudinaryApiKey,
    cloudinarySecret,
    cloudinaryKeyName,
  });
};

export const createBulkEmployeeTemplateExcelFile = expressAsyncHandler(
  async (req, res) => {
    const fileName = `create-employee-bulktemplate-${Date.now()}.xlsx`;
    const filePath = path.join(__dirname, `../../storage/excel/${fileName}`);

    // create workbook
    const newWorkBook = new excelJs.Workbook();

    // create a worksheet
    const worksheet = newWorkBook.addWorksheet("Bulk Employee");

    //  creating column for each data
    worksheet.columns = [
      { header: "Name", key: "name", width: 30 },
      { header: "Email", key: "email", width: 30 },
      { header: "Department", key: "department", width: 20 },
      { header: "Position", key: "position", width: 20 },
      { header: "StaffLevel", key: "staffLevel", width: 20 },
      { header: "BankName", key: "bankName", width: 20 },
      { header: "AccountNumber", key: "accountNumber", width: 30 },
      { header: "Nationality", key: "nationality", width: 20 },
      { header: "Gender", key: "gender", width: 15 },
      { header: "Address", key: "address", width: 40 },
      { header: "DateOfBirth", key: "dob", width: 20 },
      { header: "PhoneNumber", key: "mobile", width: 25 },
      { header: "City", key: "city", width: 20 },
      { header: "State", key: "state", width: 20 },
      { header: "EmployeeType", key: "employeeType", width: 20 },
      { header: "JoinDate", key: "joinDate", width: 20 },
    ];

    // Making first line in excel bold
    worksheet.getRow(1).eachCell((ceil) => (ceil.font = { bold: true }));
    try {
      createFolder();
      await newWorkBook.xlsx.writeFile(filePath);
      const response = await cloudinary.uploader.upload(
        `storage/excel/${fileName}`,
        {
          resource_type: "raw",
          folder: "storage/excel/",
          public_id: fileName,
          use_filename: true,
          unique_filename: false,
        }
      );

      return res.json({
        status: "success",
        message: "file uploaded to cloud successfully",
        fileName: response.public_id,
      });
    } catch (error) {
      res.status(500);
      return res.json({
        status: "fail",
        detail: error.message,
      });
    }
  }
);

export const createBulkContractEmployeeTemplateExcelFile = expressAsyncHandler(
  async (req, res) => {
    const fileName = `create-contractemployee-bulktemplate-${Date.now()}.xlsx`;
    const filePath = path.join(__dirname, `../../storage/excel/${fileName}`);

    // create workbook
    const newWorkBook = new excelJs.Workbook();

    // create a worksheet
    const worksheet = newWorkBook.addWorksheet("Bulk Employee");

    //  creating column for each data
    worksheet.columns = [
      { header: "StaffId", key: "staffId", width: 15 },
      { header: "StaffName", key: "staffName", width: 25 },
      { header: "Email", key: "email", width: 30 },
      { header: "BankName", key: "bankName", width: 20 },
      { header: "BankAcctNumber", key: "bankAcctNumber", width: 20 },
      { header: "ContractSalary", key: "contractSalary", width: 20 },
      { header: "EmploymentType", key: "employmentType", width: 20 },
    ];

    // Making first line in excel bold
    worksheet.getRow(1).eachCell((ceil) => (ceil.font = { bold: true }));
    try {
      createFolder();
      await newWorkBook.xlsx.writeFile(filePath);
      const response = await cloudinary.uploader.upload(
        `storage/excel/${fileName}`,
        {
          resource_type: "raw",
          folder: "storage/excel/",
          public_id: fileName,
          use_filename: true,
          unique_filename: false,
        }
      );

      return res.json({
        status: "success",
        message: "file uploaded to cloud successfully",
        fileName: response.public_id,
      });
    } catch (error) {
      res.status(500);
      return res.json({
        status: "fail",
        detail: error.message,
      });
    }
  }
);

export const createSalaryslipExcelFile = expressAsyncHandler(
  async (req, res) => {
    const { type, month, modelType } = req.query;
    const year = new Date().getFullYear();
    const fileName = `${modelType}-${type}-${month}-${year}-${Date.now()}.xlsx`;
    const filePath = path.join(__dirname, `../../storage/excel/${fileName}`);

    // create workbook
    const newWorkBook = new excelJs.Workbook();

    // create a worksheet
    const worksheet = newWorkBook.addWorksheet("Salary slip");

    //  creating column for each data
    worksheet.columns = [
      { header: "_id", key: "_id", width: 35 },
      { header: "EmployeeName", key: "employeeName", width: 40 },
      { header: "EmployeeBank", key: "employeeBankName", width: 30 },
      { header: "NetSalary", key: "netSalary", width: 15 },
      { header: "Pension", key: "pension", width: 15 },
      { header: "Paye", key: "paye", width: 15 },
      { header: "U-Wallet", key: "uWallet", width: 15 },
      { header: "NetPay", key: "netPay", width: 15 },
      { header: "AllowanceTotal", key: "allowanceTotal", width: 15 },
      { header: "DeductionTotal", key: "deductionTotal", width: 15 },
      { header: "Month", key: "month", width: 15 },
      { header: "Year", key: "year", width: 15 },
      { header: "TotalEarnings", key: "totalEarnings", width: 15 },
      { header: "CommentBy", key: "commentBy", width: 25 },
      { header: "Comment", key: "comment", width: 50 },
      { header: "id", key: "id", width: 35 },
    ];

    // looping through data
    const salaryData = req.body;
    for (let i = 0; i < salaryData.length; i++) {
      const data = salaryData[i];
      worksheet.addRow(data);
    }

    // Making first line in excel bold
    worksheet.getRow(1).eachCell((ceil) => (ceil.font = { bold: true }));

    try {
      createFolder();
      await newWorkBook.xlsx.writeFile(filePath);
      const response = await cloudinary.uploader.upload(
        `storage/excel/${fileName}`,
        {
          resource_type: "raw",
          folder: "storage/excel/",
          public_id: fileName,
          use_filename: true,
          unique_filename: false,
        }
      );
      return res.json({
        status: "success",
        message: "file uploaded to cloud successfully",
        fileName: response.public_id,
      });
    } catch (error) {
      res.status(500);
      return res.json({
        status: "fail",
        detail: error.message,
      });
    }
  }
);

export const createEmployeeSummaryExcelFile = expressAsyncHandler(
  async (req, res) => {
    const fileName = `employeesummary-details-${Date.now()}.xlsx`;
    const filePath = path.join(__dirname, `../../storage/excel/${fileName}`);

    // create workbook
    const newWorkBook = new excelJs.Workbook();

    // create a worksheet
    const worksheet = newWorkBook.addWorksheet("Employees");

    //  creating column for each data
    worksheet.columns = [
      { header: "Staff Id", key: "staffId", width: 15 },
      { header: "Staff Name", key: "staffName", width: 30 },
      { header: "Date Of Employment", key: "doe", width: 20 },
      { header: "Date Of Birth", key: "dob", width: 20 },
      { header: "Address", key: "address", width: 35 },
      { header: "Mobile Number", key: "mobile", width: 20 },
      { header: "Staff Bank", key: "employeeBank", width: 30 },
      {
        header: "Staff Account Number",
        key: "employeeBankAcctNumber",
        width: 20,
      },
      { header: "Staff Level", key: "staffLevel", width: 35 },
      { header: "Staff Grade", key: "staffGrade", width: 35 },
      { header: "Monthly Gross Salary", key: "grossSalary", width: 20 },
    ];

    // looping through data
    const employeeData = req.body;
    for (let i = 0; i < employeeData.length; i++) {
      const data = employeeData[i];
      worksheet.addRow(data);
    }

    // Making first line in excel bold
    worksheet.getRow(1).eachCell((ceil) => (ceil.font = { bold: true }));

    try {
      createFolder();
      await newWorkBook.xlsx.writeFile(filePath);
      const response = await cloudinary.uploader.upload(
        `storage/excel/${fileName}`,
        {
          resource_type: "raw",
          folder: "storage/excel/",
          public_id: fileName,
          use_filename: true,
          unique_filename: false,
        }
      );
      return res.json({
        status: "success",
        message: "file uploaded to cloud successfully",
        fileName: response.public_id,
      });
    } catch (error) {
      res.status(500);
      return res.json({
        status: "fail",
        detail: error.message,
      });
    }
  }
);

export const createBankScheduleExcelFile = expressAsyncHandler(
  async (req, res) => {
    const { bankName, month, modelType } = req.query;
    const year = new Date().getFullYear();
    const fileName = `${modelType}-${bankName}-${month}-${year}-${Date.now()}.xlsx`;
    const filePath = path.join(__dirname, `../../storage/excel/${fileName}`);

    // create workbook
    const newWorkBook = new excelJs.Workbook();

    // create a worksheet
    const worksheet = newWorkBook.addWorksheet("Bank Schedule");

    // add image to workbook by filename
    // const imageId1 = newWorkBook.addImage({
    //   filename: "C:/Users/UCHE/Desktop/Projects/payroll-system/backend/utils/uridium.png",
    //   extension: "png",
    // });
    // worksheet.addImage(imageId1, 'A1:A1');

    //  creating column for each data
    worksheet.columns = [
      { header: "S/N", key: "sn", width: 10 },
      { header: "Staff Name", key: "staffName", width: 35 },
      { header: "Staff Bank", key: "employeeBank", width: 30 },
      {
        header: "Staff Bank Account Number",
        key: "employeeBankNumber",
        width: 25,
      },
      { header: "Amount", key: "amount", width: 15 },
      { header: "Remark", key: "remark", width: 15 },
    ];

    // looping through data
    const scheduleData = req.body;
    for (let i = 0; i < scheduleData.length; i++) {
      const data = scheduleData[i];
      worksheet.addRow(data);
    }

    // Making first line in excel bold
    worksheet.getRow(1).eachCell((ceil) => (ceil.font = { bold: true }));

    try {
      createFolder();
      await newWorkBook.xlsx.writeFile(filePath);
      const response = await cloudinary.uploader.upload(
        `storage/excel/${fileName}`,
        {
          resource_type: "raw",
          folder: "storage/excel/",
          public_id: fileName,
          use_filename: true,
          unique_filename: false,
        }
      );
      return res.json({
        status: "success",
        message: "file uploaded to cloud successfully",
        fileName: response.public_id,
      });
    } catch (error) {
      res.status(500);
      return res.json({
        status: "fail",
        detail: error.message,
      });
    }
  }
);

export const clientDownloadExcelFile = expressAsyncHandler(async (req, res) => {
  const { fileName } = req.query;
  const filePath = path.join(__dirname, `../../${fileName}`);
  try {
    res.download(filePath, (err) => {
      if (err) throw err;
      fs.unlink(filePath, (err) => {
        if (err) throw err;
      });
    });
  } catch (error) {
    res.json({
      status: "fail",
      detail: error.message,
    });
  }
});
