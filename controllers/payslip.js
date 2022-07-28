import prisma from "@prisma/client";
import expressAsyncHandler from "express-async-handler";
import { populatePayslipAllowancesAndDeductions } from "../utils/payslip.js";

const { payslip: paySlipModel, employee: employeeModel } =
  new prisma.PrismaClient();

export const getGeneratedPaySlips = expressAsyncHandler(async (req, res) => {
  const { month } = req.query;

  const year = String(new Date().getFullYear());

  // getting not approved payslips and filtering if month is passed as query
  let paySlips = month
    ? await paySlipModel.findMany({
        where: {
          isGenerated: true,
          month,
          year,
          status: null,
          statusLevel: null,
          isActive: true,
        },
        include: {
          employee: {
            include: {
              user: {
                select: {
                  email: true,
                  name: true,
                  photo: true,
                  id: true,
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      })
    : await paySlipModel.findMany({
        where: {
          isGenerated: true,
          year,
          status: null,
          statusLevel: null,
          isActive: true,
        },
        include: {
          employee: {
            include: {
              user: {
                select: {
                  email: true,
                  name: true,
                  photo: true,
                  id: true,
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

  paySlips = await populatePayslipAllowancesAndDeductions(paySlips);

  // returning response
  res.json({
    status: "success",
    paySlips,
  });
});

export const generatePaySlip = expressAsyncHandler(async (req, res) => {
  // params
  const { empId: employeeId } = req.params;

  // request body data
  const {
    allowanceTotal,
    totalEarnings,
    deductionTotal,
    month,
    netSalary,
    pension,
    paye,
    uWallet,
    netPay,
  } = req.body;

  // checking the employeeid is valid
  if (employeeId) {
    // finding employee using employeeid
    const employee = await employeeModel.findUnique({
      where: {
        id: Number(employeeId),
      },
      include: {
        allowances: true,
        deductions: true,
      },
    });

    // checking if employee exists
    if (employee) {
      // finding payslip using the month
      const createdPayslip = await paySlipModel.findMany({
        where: {
          month,
        },
        include: {
          employee: {
            include: {
              allowances: true,
              deductions: true,
            },
          },
        },
      });

      // getting current year

      const currentYear = String(new Date().getFullYear());

      // filtering all employee generated payslips
      const findEmployeeSlip = createdPayslip.filter(
        (slip) => slip.employee.id === Number(employeeId)
      );

      // filtering employee generated payslip by current year
      const employeeSlipGenerated = findEmployeeSlip.find(
        (slip) => slip.year === currentYear
      );

      // if not being generated then create new one
      if (!employeeSlipGenerated) {
        let empAllowanceIds = [];
        let empDeductionIds = [];

        for (let i = 0; i < employee.allowances.length; i++) {
          empAllowanceIds.push(String(employee.allowances[i].id));
        }

        for (let i = 0; i < employee.deductions.length; i++) {
          empDeductionIds.push(String(employee.deductions[i].id));
        }

        const newPaySlip = await paySlipModel.create({
          data: {
            employeeId: employee.id,
            allowanceTotal,
            deductionTotal,
            month,
            netPay,
            netSalary,
            totalEarnings,
            uWallet,
            year: currentYear,
            paye,
            pension,
            empAllowanceIds: empAllowanceIds.join(","),
            empDeductionIds: empDeductionIds.join(","),
          },
        });

        // returning response
        res.status(201);
        return res.json({
          status: "success",
          newPaySlip,
        });
      } else {
        res.status(400);
        throw new Error(
          `payslip has been created for ${employeeSlipGenerated.month} in ${employeeSlipGenerated.year}`
        );
      }
    } else {
      res.status(404);
      throw new Error("employee not found!");
    }
  } else {
    res.status(404);
    throw new Error("Invalid employee id");
  }
});

export const generateBulkPaySlipsV2 = expressAsyncHandler(async (req, res) => {
  const { paySlipsArr } = req.body;

  try {
    for (let i = 0; i < paySlipsArr.length; i++) {
      const slip = paySlipsArr[i];
      const employee = await employeeModel.findUnique({
        where: {
          id: Number(slip?.employee),
        },
        include: {
          allowances: true,
          deductions: true,
        },
      });
      const createdPayslipMonth = await paySlipModel.findMany({
        where: {
          month: slip?.month,
        },
        include: {
          employee: true,
        },
      });

      // get currentYear - (2021,2022)
      const currentYear = String(new Date().getFullYear());
      //  find employee payslip by the month we searching for
      const findEmployeeSlip = createdPayslipMonth.filter(
        (slipE) => slipE?.employee?.id === employee.id
      );
      // finding the employee slips by current year
      const employeeSlipGenerated = findEmployeeSlip.find(
        (slip) => slip.year === currentYear
      );
      if (!employeeSlipGenerated) {
        let empAllowanceIds = [];
        let empDeductionIds = [];

        for (let i = 0; i < employee.allowances.length; i++) {
          empAllowanceIds.push(String(employee.allowances[i].id));
        }

        for (let i = 0; i < employee.deductions.length; i++) {
          empDeductionIds.push(String(employee.deductions[i].id));
        }

        await paySlipModel.create({
          data: {
            employeeId: employee.id,
            allowanceTotal: slip?.allowanceTotal,
            deductionTotal: slip?.deductionTotal,
            month: slip?.month,
            netPay: slip?.netPay,
            netSalary: slip?.netSalary,
            totalEarnings: slip?.totalEarnings,
            uWallet: slip?.uWallet,
            year: currentYear,
            paye: slip.paye,
            pension: slip.pension,
            empAllowanceIds: empAllowanceIds.join(","),
            empDeductionIds: empDeductionIds.join(","),
          },
        });
      } else {
        res.status(400);
        throw new Error(
          `payslip has been created for ${employeeSlipGenerated.month} in ${employeeSlipGenerated.year} for the particluar employee`
        );
      }
    }

    res.status(201);
    return res.json({
      status: "success",
      message: "generate bulk successfully!",
    });
  } catch (error) {
    // if error generating bulk...delete the generated ones from the bulk to prevent further error!
    if (paySlipsArr.length > 0) {
      const payslips = await paySlipModel.findMany({
        include: {
          employee: true,
        },
      });
      for (let i = 0; i < paySlipsArr.length; i++) {
        const paySlip = paySlipsArr[i];
        const paySlipGenerated = payslips?.find(
          (slip) => slip?.employee.id === paySlip?.employee
        );
        if (paySlipGenerated) {
          await paySlipModel.delete({
            where: {
              id: paySlipGenerated.id,
            },
          });
        }
      }
    }

    // res.status(404);
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    return res.json({
      status: "fail",
      detail: error.message,
    });
  }
});

export const deletePayslipById = expressAsyncHandler(async (req, res) => {
  const { id: paySlipId } = req.params;

  if (paySlipId) {
    const payslip = await paySlipModel.findUnique({
      where: {
        id: Number(paySlipId),
      },
    });

    if (payslip) {
      await paySlipModel.delete({
        where: {
          id: payslip.id,
        },
      });

      return res.json({
        status: "success",
        detail: "deleted successfully",
      });
    } else {
      res.status(404);
      throw new Error("payslip not found");
    }
  } else {
    res.status(404);
    throw new Error("invalid payslip id");
  }
});

export const deleteBulkPayslipsByIds = expressAsyncHandler(async (req, res) => {
  const { paySlipsArrIds } = req.body;

  try {
    for (let i = 0; i < paySlipsArrIds.length; i++) {
      const elId = paySlipsArrIds[i];
      const paySlip = await paySlipModel.findUnique({
        where: {
          id: Number(elId),
        },
      });

      if (paySlip) {
        await paySlipModel.delete({
          where: {
            id: paySlip.id,
          },
        });
      } else {
        res.status(404);
        throw new Error("payslip not found!");
      }
    }

    return res.json({
      status: "success",
      message: "deleted all payslips successfully!",
    });
  } catch (error) {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    return res.json({
      status: "fail",
      detail: error.message,
    });
  }
});

export const getNotApprovedSalaryslips = expressAsyncHandler(
  async (req, res) => {
    const { month } = req.query;
    const currentYear = String(new Date().getFullYear());

    let notApprovedSalaryslip = await paySlipModel.findMany({
      where: {
        month,
        status: {
          equals: 0,
        },
        year: currentYear,
        statusLevel: "not approved",
        isGeneratedToVoucher: false,
        isGenerated: true,
        isActive: true,
      },
      include: {
        employee: {
          include: {
            user: {
              select: {
                email: true,
                name: true,
                photo: true,
                id: true,
              },
            },
          },
        },
      },
    });

    notApprovedSalaryslip = await populatePayslipAllowancesAndDeductions(
      notApprovedSalaryslip
    );

    res.json({
      status: "success",
      notapproved: notApprovedSalaryslip,
    });
  }
);

export const getPreAprrovedSalaryslips = expressAsyncHandler(
  async (req, res) => {
    const { month } = req.query;
    const currentYear = String(new Date().getFullYear());
    let prevApprovedSalaryslips = await paySlipModel.findMany({
      where: {
        month,
        status: {
          equals: 1,
        },
        year: currentYear,
        statusLevel: "pre approved",
        isGeneratedToVoucher: false,
        isGenerated: true,
        isActive: true,
      },
      include: {
        employee: {
          include: {
            user: {
              select: {
                email: true,
                name: true,
                photo: true,
                id: true,
              },
            },
          },
        },
      },
    });

    prevApprovedSalaryslips = await populatePayslipAllowancesAndDeductions(
      prevApprovedSalaryslips
    );

    res.json({
      status: "success",
      preapproved: prevApprovedSalaryslips,
    });
  }
);

export const getApprovedSalaryslips = expressAsyncHandler(async (req, res) => {
  let approvedSalaryslips;
  const { month } = req.query;
  const currentYear = String(new Date().getFullYear());
  approvedSalaryslips =
    req.user.role === "Accountant"
      ? await paySlipModel.findMany({
          where: {
            month,
            year: currentYear,
            status: {
              equals: 3,
            },
            statusLevel: "approved",
            isGeneratedToVoucher: false,
            isActive: true,
          },
          include: {
            employee: {
              include: {
                user: {
                  select: {
                    email: true,
                    name: true,
                    photo: true,
                    id: true,
                  },
                },
              },
            },
          },
        })
      : await paySlipModel.findMany({
          where: {
            month,
            year: currentYear,
            status: {
              equals: 3,
            },
            statusLevel: "approved",
            isActive: true,
          },
          include: {
            employee: {
              include: {
                user: {
                  select: {
                    email: true,
                    name: true,
                    photo: true,
                    id: true,
                  },
                },
              },
            },
          },
        });

  approvedSalaryslips = await populatePayslipAllowancesAndDeductions(
    approvedSalaryslips
  );

  res.json({
    status: "success",
    approvedSalaryslips,
  });
});

export const getRejectedSalaryslips = expressAsyncHandler(async (req, res) => {
  const { statusLevel, month } = req.query;
  const currentYear = String(new Date().getFullYear());
  const rejectedSalaryslips = await paySlipModel.findMany({
    where: {
      month,
      year: currentYear,
      status: 2,
      statusLevel: !statusLevel.includes(",")
        ? statusLevel
        : {
            in: statusLevel.split(","),
          },
      isGeneratedToVoucher: false,
      isActive: true,
    },
    include: {
      employee: {
        include: {
          user: {
            select: {
              email: true,
              name: true,
              photo: true,
              id: true,
            },
          },
        },
      },
    },
  });

  res.json({
    status: "success",
    rejectedPaySlips: rejectedSalaryslips,
  });
});

export const rejectNotApprovedSalaryslips = expressAsyncHandler(
  async (req, res) => {
    const { paySlipsArr } = req.body;

    try {
      for (let i = 0; i < paySlipsArr.length; i++) {
        const payslip = paySlipsArr[i];
        const salarySlip = await paySlipModel.findUnique({
          where: {
            id: Number(payslip.id),
          },
        });

        if (salarySlip) {
          if (
            salarySlip.status === 0 &&
            salarySlip.statusLevel === "not approved" &&
            salarySlip.isActive
          ) {
            await paySlipModel.update({
              where: {
                id: salarySlip.id,
              },
              data: {
                comment: payslip.comment,
                commentBy: req.user.role,
                status: 2,
                statusLevel: "not approved",
              },
            });
          } else {
            res.status(400);
            throw new Error(`salary slips has been rejected!`);
          }
        } else {
          res.status(404);
          throw new Error(`payslip not found`);
        }
      }

      return res.json({
        status: "success",
        message: "not approved salaryslip rejected successfully!",
      });
    } catch (error) {
      const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
      res.status(statusCode);
      return res.json({
        status: "fail",
        detail: error.message,
      });
    }
  }
);

export const rejectPreApprovedSalaryslips = expressAsyncHandler(
  async (req, res) => {
    const { paySlipsArr } = req.body;

    try {
      for (let i = 0; i < paySlipsArr.length; i++) {
        const payslip = paySlipsArr[i];
        const salarySlip = await paySlipModel.findUnique({
          where: {
            id: Number(payslip.id),
          },
        });
        if (salarySlip) {
          if (
            salarySlip.status === 1 &&
            salarySlip.statusLevel === "pre approved" &&
            salarySlip.isActive
          ) {
            await paySlipModel.update({
              where: {
                id: salarySlip.id,
              },
              data: {
                comment: payslip.comment,
                commentBy: req.user.role,
                status: 2,
                statusLevel: "pre approved",
              },
            });
          } else {
            res.status(400);
            throw new Error(`salary slip has been rejected!`);
          }
        } else {
          res.status(404);
          throw new Error(`payslip not found`);
        }
      }

      return res.json({
        status: "success",
        message: "prev approved salaryslip rejected successfully!",
      });
    } catch (error) {
      const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
      res.status(statusCode);
      return res.json({
        status: "fail",
        detail: error.message,
      });
    }
  }
);

export const rejectBulkSalaryslips = expressAsyncHandler(async (req, res) => {
  const { type } = req.query;
  const { rejectedSlipsArr, paySlipsArr } = req.body;

  try {
    // reset salaryslips to isGenerated
    for (let i = 0; i < paySlipsArr.length; i++) {
      const payslipId = paySlipsArr[i];
      const salarySlip = await paySlipModel.findUnique({
        where: {
          id: Number(payslipId),
        },
      });
      if (salarySlip) {
        if (
          (salarySlip.status === 0 || salarySlip.status === 1) &&
          salarySlip.statusLevel &&
          salarySlip.isActive
        ) {
          await paySlipModel.update({
            where: {
              id: salarySlip.id,
            },
            data: {
              status: null,
              statusLevel: null,
            },
          });
        }
      } else {
        res.status(404);
        throw new Error(`payslip not found`);
      }
    }

    // reject the ones that have comment
    for (let i = 0; i < rejectedSlipsArr.length; i++) {
      const payslip = rejectedSlipsArr[i];
      const salarySlip = await paySlipModel.findUnique({
        where: {
          id: Number(payslip.id),
        },
      });

      if (salarySlip) {
        if (type.toLowerCase() === "not approved") {
          await paySlipModel.update({
            where: {
              id: salarySlip.id,
            },
            data: {
              comment: payslip.comment,
              commentBy: req.user.role,
              status: 2,
              statusLevel: "not approved",
            },
          });
        } else {
          await paySlipModel.update({
            where: {
              id: salarySlip.id,
            },
            data: {
              comment: payslip.comment,
              commentBy: req.user.role,
              status: 2,
              statusLevel: "pre approved",
            },
          });
        }
      }
    }

    // return state
    return res.json({
      status: "success",
      message: "salaryslip rejected successfully!",
    });
  } catch (error) {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    return res.json({
      status: "fail",
      detail: error.message,
    });
  }
});

export const createNotApprovedSalaryslip = expressAsyncHandler(
  async (req, res) => {
    const { paySlipsArr } = req.body;
    try {
      for (let i = 0; i < paySlipsArr.length; i++) {
        const paySlipId = paySlipsArr[i];
        const salarySlip = await paySlipModel.findUnique({
          where: {
            id: Number(paySlipId),
          },
        });
        if (salarySlip) {
          if (salarySlip.isGenerated && salarySlip.isActive) {
            await paySlipModel.update({
              where: {
                id: salarySlip.id,
              },
              data: {
                status: 0,
                statusLevel: "not approved",
              },
            });
          } else {
            res.status(400);
            throw new Error(`Salaryslip status is not generated`);
          }
        } else {
          res.status(404);
          throw new Error(`payslip not found`);
        }
      }

      res.json({
        status: "success",
        detail: "not approved successfully!",
      });
    } catch (error) {
      const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
      res.status(statusCode);
      return res.json({
        status: "fail",
        detail: error.message,
      });
    }
  }
);

export const createPreApprovedSalaryslip = expressAsyncHandler(
  async (req, res) => {
    const { paySlipsArr } = req.body;
    try {
      for (let i = 0; i < paySlipsArr.length; i++) {
        const paySlipId = paySlipsArr[i];
        const salarySlip = await paySlipModel.findUnique({
          where: {
            id: Number(paySlipId),
          },
        });
        if (salarySlip) {
          if (
            salarySlip.status === 0 &&
            salarySlip.statusLevel === "not approved" &&
            salarySlip.isActive
          ) {
            await paySlipModel.update({
              where: {
                id: salarySlip.id,
              },
              data: {
                status: 1,
                statusLevel: "pre approved",
              },
            });
          } else {
            res.status(400);
            throw new Error(`Salaryslip status is not equal to not approved`);
          }
        } else {
          res.status(404);
          throw new Error(`payslip not found`);
        }
      }

      res.json({
        status: "success",
        detail: "pre approved successfully!",
      });
    } catch (error) {
      const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
      res.status(statusCode);
      return res.json({
        status: "fail",
        detail: error.message,
      });
    }
  }
);

export const createApprovedSalaryslip = expressAsyncHandler(
  async (req, res) => {
    const { paySlipsArr } = req.body;
    try {
      for (let i = 0; i < paySlipsArr.length; i++) {
        const paySlipId = paySlipsArr[i];
        const salarySlip = await paySlipModel.findUnique({
          where: {
            id: Number(paySlipId),
          },
        });
        if (salarySlip) {
          if (
            salarySlip.status === 1 &&
            salarySlip.statusLevel === "pre approved" &&
            salarySlip.isActive
          ) {
            // salarySlip.status = 3;
            // salarySlip.statusLevel = "approved";
            // await salarySlip.save();
            await paySlipModel.update({
              where: {
                id: salarySlip.id,
              },
              data: {
                status: 3,
                statusLevel: "approved",
              },
            });
          } else {
            res.status(400);
            throw new Error(`Salaryslip status is not equal to prev approved`);
          }
        } else {
          res.status(404);
          throw new Error(`payslip not found`);
        }
      }
      res.json({
        status: "success",
        detail: "approved successfully!",
      });
    } catch (error) {
      const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
      res.status(statusCode);
      return res.json({
        status: "fail",
        detail: error.message,
      });
    }
  }
);
