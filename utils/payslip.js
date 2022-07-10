import prisma from "@prisma/client";

const {
  employeeAllowance: employeeAllowanceModel,
  employeeDeduction: employeeDeductionModel,
} = new prisma.PrismaClient();

export const populatePayslipAllowancesAndDeductions = async (paySlipsData) => {
  let paySlips = [];
  for (let i = 0; i < paySlipsData.length; i++) {
    const currentSlip = paySlipsData[i];
    let empAllowanceIds = [];
    let empDeductionIds = [];
    let allowances = [];
    let deductions = [];

    if (currentSlip.empAllowanceIds) {
      empAllowanceIds = currentSlip.empAllowanceIds.split(",").map((el) => {
        return Number(el);
      });
    }
    if (currentSlip.empDeductionIds) {
      empDeductionIds = currentSlip.empDeductionIds.split(",").map((el) => {
        return Number(el);
      });
    }

    for (let i = 0; i < empAllowanceIds.length; i++) {
      const data = await employeeAllowanceModel.findUnique({
        where: {
          id: empAllowanceIds[i],
        },
      });

      allowances.unshift(data);
    }

    for (let i = 0; i < empDeductionIds.length; i++) {
      const data = await employeeDeductionModel.findUnique({
        where: {
          id: empDeductionIds[i],
        },
      });

      deductions.unshift(data);
    }
    paySlips[i] = {
      ...currentSlip,
      allowances,
      deductions,
    };
  }

  return paySlips;
};
