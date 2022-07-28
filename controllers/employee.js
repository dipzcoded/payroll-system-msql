import prisma from "@prisma/client";
import expressAsyncHandler from "express-async-handler";
import Email from "../utils/email.js";
import { encryptUserPassword } from "../utils/user.js";

const {
  employee: employeeModel,
  user: userModel,
  employeeAllowance: employeeAllowanceModel,
  employeeDeduction: employeeDeductionModel,
  payslip: paySlipModel,
  voucher: voucherModel,
} = new prisma.PrismaClient();

// get all employees
export const getAllEmployees = expressAsyncHandler(async (req, res) => {
  const { fetchAll } = req.query;
  const employees = await employeeModel.findMany(
    !fetchAll
      ? {
          where: {
            isActive: true,
          },
          include: {
            user: {
              select: {
                name: true,
                email: true,
                createdAt: true,
                updatedAt: true,
                photo: true,
                id: true,
              },
            },
            department: true,
            position: {
              include: {
                department: true,
              },
            },
            salaryLevel: true,
            salaryStep: {
              include: {
                salaryLevel: true,
              },
            },
            notch: true,
            allowances: {
              include: {
                allowance: true,
              },
            },
            deductions: {
              include: {
                deduction: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        }
      : {
          orderBy: {
            createdAt: "desc",
          },
          include: {
            user: {
              select: {
                name: true,
                email: true,
                createdAt: true,
                updatedAt: true,
                photo: true,
                id: true,
              },
            },
            department: true,
            position: {
              include: {
                department: true,
              },
            },
            salaryLevel: true,
            salaryStep: {
              include: {
                salaryLevel: true,
              },
            },
            notch: true,
          },
        }
  );

  res.json({
    status: "success",
    resultLength: employees.length,
    employees,
  });
});

export const getAllEmployeesV2 = expressAsyncHandler(async (req, res) => {
  // query data
  const { month } = req.query;

  // current year
  const year = String(new Date().getFullYear());

  // declaring variable
  let filteredEmployees;

  // finding list of employees that are active
  const employees = await employeeModel.findMany({
    where: {
      isActive: true,
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
          createdAt: true,
          updatedAt: true,
          photo: true,
          id: true,
        },
      },
      department: true,
      position: {
        include: {
          department: true,
        },
      },
      salaryLevel: true,
      salaryStep: {
        include: {
          salaryLevel: true,
        },
      },
      notch: true,
    },
  });

  // sorting payslips by month from the query
  const payslips = await paySlipModel.findMany({
    where: {
      month,
      year,
      isGenerated: true,
    },
  });

  // filtering employees that dont have payslip generated

  filteredEmployees = employees.filter((el) => {
    const employeeHasSlip = payslips.find((slip) => slip?.employeeId === el.id);

    if (!employeeHasSlip) {
      return el;
    }
  });

  // returning response
  res.json({
    status: "success",
    employees: filteredEmployees,
  });
});

export const getEmployeeByIdV2 = expressAsyncHandler(async (req, res) => {
  // param id
  const { id: employeeId } = req.params;

  if (employeeId) {
    // fetching all employees
    const employee = await employeeModel.findUnique({
      where: {
        id: Number(employeeId),
      },
      include: {
        department: true,
        position: {
          include: {
            department: true,
          },
        },
        user: {
          select: {
            name: true,
            email: true,
            photo: true,
            role: true,
            createdAt: true,
            updatedAt: true,
            id: true,
          },
        },
        salaryLevel: true,
        salaryStep: {
          include: {
            salaryLevel: true,
          },
        },
      },
    });

    // getting user by employee userID
    const user = await userModel.findUnique({
      where: {
        id: Number(employee.user.id),
      },
    });

    // checking if there is an employee and user
    if (employee && user) {
      // returning response
      return res.json({
        status: "success",
        employee,
      });
    } else {
      res.status(404);
      throw new Error("employee not found");
    }
  } else {
    res.status(400);
    throw new Error("Invalid employee id");
  }
});

export const createEmployeeV3 = expressAsyncHandler(async (req, res) => {
  try {
    // params
    const { department: departmentId, position: positionId } = req.params;

    // field data passed to the ody object
    const {
      staffId,
      name,
      gender,
      email,
      nationality,
      address,
      dob,
      mobile,
      city,
      state,
      employeeType,
      joinDate,
      employeeBankAcctNumber,
      employeeBank,
      salaryLevelId,
      salaryStepId,
      contractSalary,
      notchId,
    } = req.body;

    // generate random password func
    const password = "welcome101";

    // register as user first
    let user = await userModel.findUnique({
      where: {
        email,
      },
    });

    let employee = await employeeModel.findUnique({
      where: {
        staffId,
      },
    });

    // checking if a user hasnt being created with email that is passed
    if (!user && !employee) {
      // create a user
      user = await userModel.create({
        data: {
          name,
          email,
          password: await encryptUserPassword(password),
        },
      });

      // generating random IDs
      const result = () => Math.random().toString(32).substring(2, 6);
      const EMPIDs = `EMP${result().toUpperCase()}`;

      // create an employee
      const newEmployee = await employeeModel.create({
        data: {
          staffId,
          EMPID: EMPIDs,
          userId: user.id,
          nationality,
          gender,
          address,
          dob,
          mobile,
          city,
          state,
          employeeType,
          joinDate,
          employeeBankAcctNumber,
          employeeBank,
          departmentId: Number(departmentId),
          positionId: Number(positionId),
          salaryLevelId,
          salaryStepId,
          contractSalary,
          notchId,
        },
        include: {
          department: true,
          position: true,
          user: {
            select: {
              name: true,
              email: true,
              createdAt: true,
              updatedAt: true,
              photo: true,
              id: true,
            },
          },
          salaryLevel: true,
          salaryStep: true,
          notch: true,
        },
      });

      // // sending email message to the newly created employee
      if (process.env.NODE_ENV !== "production") {
        await new Email(
          {
            user: {
              name: user?.name,
              email: user?.email,
            },
            password,
          },
          "google.com"
        ).sendWelcome("Uridium");
      }

      // returning response
      res.status(200);
      res.json({
        status: "success",
        newEmployee,
        message: "Employee Created Successful",
      });
    } else {
      // // if the email didnt work well the best is to remove the user and employee
      // const user = await userModel.findOne({ email });

      // // checking if the user was created before proceeding to delete
      // if (user) {
      //   // delete the created employee and user from database
      //   await employeeModel.findOneAndDelete({ user: user._id });
      //   await userModel.findByIdAndDelete(user._id);
      // }

      res.status(400);
      throw new Error("user already exists with the email or staffId provided");
    }
  } catch (error) {
    res.status(res.statusCode ? res.statusCode : 500);
    throw new Error(`${error.message}`);
  }
});

// update employee details
export const updateEmployeeV2 = expressAsyncHandler(async (req, res) => {
  // params
  const {
    department: departmentId,
    position: positionId,
    id: employeeId,
  } = req.params;

  // data from the request body
  const {
    staffId,
    name,
    gender,
    email,
    nationality,
    address,
    dob,
    mobile,
    city,
    state,
    employeeType,
    joinDate,
    employeeBankAcctNumber,
    employeeBank,
    contractSalary,
    salaryLevelId,
    salaryStepId,
    notchId,
  } = req.body;

  // const stepNotch = Object.keys(notch).length
  // ? { name: notch.name, notchId: notch._id }
  // : null;

  // checking if the employeeid is valid or passed as params
  if (employeeId) {
    // finding employee using the passed employeeid
    const employee = await employeeModel.findUnique({
      where: {
        id: Number(employeeId),
      },
      include: {
        user: {
          select: {
            email: true,
            id: true,
          },
        },
      },
    });

    // finding user from the found employee
    const user = await userModel.findUnique({
      where: {
        email: employee?.user?.email,
      },
    });

    // checking if employee userId is the same with the userId
    if (employee && employee.user.id === user.id) {
      const updatedUser = await userModel.update({
        where: {
          id: employee?.user?.id,
        },
        data: {
          name,
          email,
        },
        select: {
          id: true,
        },
      });

      // updating the employee
      const updatedEmployee = await employeeModel.update({
        where: {
          id: employee.id,
        },
        data: {
          staffId,
          address,
          city,
          departmentId: Number(departmentId),
          positionId: Number(positionId),
          contractSalary,
          dob,
          gender,
          employeeBank,
          employeeBankAcctNumber,
          employeeType,
          joinDate,
          notchId,
          salaryLevelId,
          salaryStepId,
          mobile,
          nationality,
          state,
          userId: updatedUser.id,
        },
      });

      // returning response
      return res.json({
        status: "success",
        employee: updatedEmployee,
      });
    } else {
      res.status(404);
      throw new Error(
        "employee not found or the employee id is for another user"
      );
    }
  } else {
    res.status(400);
    throw new Error("invalid employee id");
  }
});

export const deleteEmployeeV2 = expressAsyncHandler(async (req, res) => {
  // params
  const { id: employeeId } = req.params;

  if (employeeId) {
    // fetching employee by id
    const employee = await employeeModel.findUnique({
      where: {
        id: Number(employeeId),
      },
      include: {
        user: true,
      },
    });

    // finding user from employee
    const user = await userModel.findUnique({
      where: {
        id: employee.user.id,
      },
    });

    // checking if employee corresponds with the user to prevent error
    if (employee && employee.user.id === user.id) {
      const employeePayslips = await paySlipModel.findMany({
        where: {
          employeeId: employee.id,
        },
      });

      if (employeePayslips.length) {
        for (let i = 0; i < employeePayslips.length; i++) {
          const currentPayslip = employeePayslips[i];
          const voucherPayslips = await voucherModel.findMany({
            where: { paySlipId: currentPayslip.id },
          });
          if (voucherPayslips.length) {
            await voucherModel.updateMany({
              where: {
                paySlipId: currentPayslip.id,
              },
              data: {
                isActive: false,
              },
            });
          }
          await paySlipModel.update({
            where: {
              id: currentPayslip.id,
            },
            data: {
              isActive: false,
            },
          });
        }
      }

      // updating the employee active state to false
      await employeeModel.update({
        where: {
          id: employee.id,
        },
        data: {
          isActive: false,
        },
      });

      // returning  response
      return res.json({
        status: "success",
        detail: "employee is inactive from the payroll",
      });
    } else {
      res.status(404);
      throw new Error(
        "employee not found or the employee id is for another user"
      );
    }
  } else {
    res.status(400);
    throw new Error("invalid employee id");
  }
});

export const deleteBulkEmployeeByIdsV2 = expressAsyncHandler(
  async (req, res) => {
    // params
    const { employeeArrIds } = req.body;

    // checking the length of passed data is greater than 1
    if (employeeArrIds?.length > 1) {
      try {
        // looping the data to delete employees,users,and payslips
        for (let i = 0; i < employeeArrIds.length; i++) {
          const employee = await employeeModel.findUnique({
            where: {
              id: Number(employeeArrIds[i]),
            },
            include: {
              user: true,
            },
          });

          // checking if the user correspond with the employee user
          if (employee) {
            const employeePayslips = await paySlipModel.findMany({
              where: {
                employeeId: employee.id,
              },
            });

            if (employeePayslips.length) {
              for (let i = 0; i < employeePayslips.length; i++) {
                const currentPayslip = employeePayslips[i];
                const voucherPayslips = await voucherModel.findMany({
                  where: { paySlipId: currentPayslip.id },
                });
                if (voucherPayslips.length) {
                  await voucherModel.updateMany({
                    where: {
                      paySlipId: currentPayslip.id,
                    },
                    data: {
                      isActive: false,
                    },
                  });
                }
                await paySlipModel.update({
                  where: {
                    id: currentPayslip.id,
                  },
                  data: {
                    isActive: false,
                  },
                });
              }
            }

            // update employee active state to false
            await employeeModel.update({
              where: {
                id: employee.id,
              },
              data: {
                isActive: false,
              },
            });
          } else {
            throw new Error("employee not found");
          }
        }
        // returning response
        return res.json({
          status: "success",
          detail: "deleted bulk employee successfully",
        });
      } catch (error) {
        res.status(400);
        return res.json({
          status: "fail",
          detail: error.message,
        });
      }
    } else {
      res.status(400);
      throw new Error(
        `This func is meant for bulk employee id that the length of the array is greater than 1`
      );
    }
  }
);

// remove allowance to an employee
export const employeeAllowanceRemove = expressAsyncHandler(async (req, res) => {
  // params
  const { id: employeeId, allowance: allowanceId } = req.params;

  // checking the employeeid and allowancid is passed as params
  if (employeeId && allowanceId) {
    // checking if employee exists with the employeeid
    const employee = await employeeModel.findUnique({
      where: {
        id: Number(employeeId),
      },
      include: {
        allowances: true,
      },
    });
    if (employee) {
      // finding allowance from the employee list of allowances
      const allowanceFound = employee.allowances.find(
        (el) => el?.allowanceId === Number(allowanceId)
      );

      // checking if allowance exists
      if (allowanceFound) {
        await employeeAllowanceModel.delete({
          where: {
            id: Number(allowanceFound.id),
          },
        });
        // returning response
        return res.json({
          status: "success",
          message: "allowance removed from employee allowances",
        });
      } else {
        res.status(400);
        throw new Error("already remove the allowance");
      }
    } else {
      res.status(404);
      throw new Error("employee not found");
    }
  } else {
    res.status(400);
    throw new Error("invalid employee id || allowance not added");
  }
});

// remove dedcution to an employee
export const employeeDeductionRemove = expressAsyncHandler(async (req, res) => {
  // params
  const { id: employeeId, deduction: deductionId } = req.params;

  // checking if employee and deduction id is validly passed as params
  if (employeeId && deductionId) {
    // finding employee using the employee id
    const employee = await employeeModel.findUnique({
      where: {
        id: Number(employeeId),
      },
      include: {
        deductions: true,
      },
    });

    if (employee) {
      // finding the deduction from employee list of deductions
      const deductionFound = employee.deductions.find(
        (el) => el.deductionId === Number(deductionId)
      );

      // if found..removing it from the list of employee deductions
      if (deductionFound) {
        await employeeDeductionModel.delete({
          where: {
            id: deductionFound.id,
          },
        });

        // returning response
        return res.json({
          status: "success",
          message: "deduction removed from employee deductions",
        });
      } else {
        res.status(400);
        throw new Error("already remove the deduction");
      }
    } else {
      res.status(404);
      throw new Error("employee not found");
    }
  } else {
    res.status(400);
    throw new Error("invalid employee id || deduction not added");
  }
});

export const employeeTopUp = expressAsyncHandler(async (req, res) => {
  // params
  const { empId } = req.params;

  // request body data
  const { allowancesArr, deductionsArr } = req.body;

  // getting employee with empid param
  const employee = await employeeModel.findUnique({
    where: {
      id: Number(empId),
    },
    include: {
      allowances: true,
      deductions: true,
    },
  });

  // checking if it exists
  if (employee) {
    // checking the length of allowance array passed as data from the request body
    if (allowancesArr.length > 0) {
      // looping through the data
      for (let i = 0; i < allowancesArr.length; i++) {
        const elAllowance = allowancesArr[i];

        // checking if the allowance already exists?
        const allowanceAlreadyIncluded = employee.allowances.find((el) => {
          return el.allowanceId === elAllowance?.allowance;
        });

        // if it doesnt include..it should add it to the employee allowance
        if (!allowanceAlreadyIncluded) {
          // adding new allowance to employee allowances
          await employeeAllowanceModel.create({
            data: {
              employeeId: employee.id,
              fee: elAllowance?.fee,
              feeType: elAllowance?.feeType,
              remark: elAllowance?.remark,
              allowanceId: elAllowance?.allowance,
            },
          });
        }
      }
    }

    // checking the length of deduction array passed as data from the request data
    if (deductionsArr.length > 0) {
      // looping through the data
      for (let i = 0; i < deductionsArr.length; i++) {
        const elDeduction = deductionsArr[i];

        // checking if deduction already exists?
        const deductionAlreadyIncluded = employee.deductions.find(
          (el) => el.deductionId === elDeduction?.deduction
        );

        // if it doesnt include...it should add it to the employee deductions
        if (!deductionAlreadyIncluded) {
          await employeeDeductionModel.create({
            data: {
              deductionId: elDeduction?.deduction,
              fee: elDeduction?.fee,
              feeType: elDeduction?.feeType,
              employeeId: employee.id,
              remark: elDeduction?.remark,
            },
          });
        }
      }
    }

    // saving the udpated employee
    const updatedEmployee = await employeeModel.findUnique({
      where: {
        id: employee.id,
      },
      include: {
        allowances: {
          include: {
            allowance: true,
          },
        },
        deductions: {
          include: {
            deduction: true,
          },
        },
      },
    });

    // returning response
    res.json({
      status: "success",
      employee: updatedEmployee,
    });
  } else {
    res.status(404);
    throw new Error(`employee not found!`);
  }
});

export const getEmployeeByUserId = expressAsyncHandler(async (req, res) => {
  // getting user by userid param
  const employee = await employeeModel.findUnique({
    where: {
      userId: req.user.id,
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
          createdAt: true,
          updatedAt: true,
          photo: true,
          id: true,
        },
      },
      department: true,
      position: {
        include: {
          department: true,
        },
      },
      salaryStep: {
        include: {
          salaryLevel: true,
        },
      },
      salaryLevel: {
        include: {
          salaryGrade: true,
        },
      },
      allowances: {
        include: {
          allowance: true,
        },
      },
      deductions: {
        include: {
          deduction: true,
        },
      },
    },
  });

  // checking if user exists and if the logged in user id is the same with employee
  if (employee) {
    return res.json({
      status: "success",
      employee,
    });
  } else {
    res.status(404);
    throw new Error("user not found");
  }
});
