import prisma from "@prisma/client";
import expressAsyncHandler from "express-async-handler";

const { voucher: voucherModel, payslip: paySlipModel } =
  new prisma.PrismaClient();

export const getNotApprovedBankVouchers = expressAsyncHandler(
  async (req, res) => {
    const { month } = req.query;
    const currentYear = String(new Date().getFullYear());

    const notapprovedBankVouchers = await voucherModel.findMany({
      where: {
        month,
        year: currentYear,
        status: 0,
        statusLevel: "not approved",
        processDoneAsSchedule: false,
      },
      include: {
        paySlip: {
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
        },
      },
    });
    res.json({
      status: "success",
      notapproved: notapprovedBankVouchers,
    });
  }
);

export const getPreApprovedBankVouchers = expressAsyncHandler(
  async (req, res) => {
    const { month } = req.query;
    const currentYear = String(new Date().getFullYear());
    // const preapprovedBankVouchers = await voucherModel.find({
    //   month,
    //   year: currentYear,
    //   status: { $eq: 1 },
    //   statusLevel: "pre approved",
    //   processDoneAsSchedule: { $eq: false },
    // });
    const preapprovedBankVouchers = await voucherModel.findMany({
      where: {
        month,
        year: currentYear,
        status: 1,
        statusLevel: "pre approved",
        processDoneAsSchedule: false,
      },
      include: {
        paySlip: {
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
        },
      },
    });
    res.json({
      status: "success",
      preapproved: preapprovedBankVouchers,
    });
  }
);

export const getApprovedBankVouchers = expressAsyncHandler(async (req, res) => {
  let approvedBankVouchers;
  const { month } = req.query;
  const currentYear = String(new Date().getFullYear());
  // approvedBankVouchers = await voucherModel.find({
  //   month,
  //   year: currentYear,
  //   status: { $eq: 3 },
  //   statusLevel: "approved",
  //   processDoneAsSchedule: { $eq: false },
  // });
  approvedBankVouchers = await voucherModel.findMany({
    where: {
      month,
      year: currentYear,
      status: 3,
      statusLevel: "approved",
      processDoneAsSchedule: false,
    },
    include: {
      paySlip: {
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
      },
    },
  });
  res.json({
    status: "success",
    approved: approvedBankVouchers,
  });
});

export const getCreatedAsScheduleVouchers = expressAsyncHandler(
  async (req, res) => {
    let approvedVouchersAsSchedule;

    const currentYear = String(new Date().getFullYear());

    approvedVouchersAsSchedule = await voucherModel.findMany({
      where: {
        year: currentYear,
        status: 3,
        statusLevel: "approved",
        processDoneAsSchedule: true,
      },
    });

    res.json({ status: "success", approvedVouchersAsSchedule });
  }
);

export const getRejectedBankVouchers = expressAsyncHandler(async (req, res) => {
  const { month, statusLevel } = req.query;
  const currentYear = String(new Date().getFullYear());
  const rejectedBankVouchers = await voucherModel.findMany({
    where: {
      month,
      year: currentYear,
      status: 2,
      statusLevel: !statusLevel.includes(",")
        ? statusLevel
        : {
            in: statusLevel.split(","),
          },
      processDoneAsSchedule: false,
    },
    include: {
      paySlip: {
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
      },
    },
  });
  res.json({
    status: "success",
    rejectedBankVouchers,
  });
});

export const createBankVouchersFromApprovedSalaryslips = expressAsyncHandler(
  async (req, res) => {
    const { approvedSalaryslipsArr } = req.body;

    try {
      for (let i = 0; i < approvedSalaryslipsArr.length; i++) {
        const approvedSlipId = approvedSalaryslipsArr[i];
        const salaryslip = await paySlipModel.findUnique({
          where: {
            id: Number(approvedSlipId),
          },
          include: {
            employee: true,
          },
        });
        if (
          salaryslip &&
          salaryslip.status === 3 &&
          salaryslip.statusLevel === "approved" &&
          !salaryslip.isGeneratedToVoucher
        ) {
          const voucherCreatedSlip = await voucherModel.findMany({
            where: {
              paySlipId: salaryslip.id,
            },
          });
          if (!voucherCreatedSlip.length) {
            if (
              salaryslip.employee.employeeType.toLowerCase() === "contract" ||
              salaryslip.employee.employeeType.toLowerCase() === "intern"
            ) {
              await voucherModel.create({
                data: {
                  paySlipId: salaryslip.id,
                  paymentType: "NetPay Only",
                  month: salaryslip.month,
                  year: salaryslip.year,
                  amount: salaryslip.netPay,
                  status: 0,
                  statusLevel: "not approved",
                },
              });
            } else {
              const paymentTypes = ["NetPay Only", "U-Wallet Only"];
              //   let payslipVouchers = [];
              for (let i = 0; i < paymentTypes.length; i++) {
                await voucherModel.create({
                  data: {
                    paySlipId: salaryslip.id,
                    paymentType: paymentTypes[i],
                    month: salaryslip.month,
                    year: salaryslip.year,
                    amount:
                      paymentTypes[i] === "NetPay Only"
                        ? salaryslip.netPay
                        : salaryslip.uWallet,
                    status: 0,
                    statusLevel: "not approved",
                  },
                });
              }
            }

            // updating salaryslip when voucher is successfully created

            await paySlipModel.update({
              where: {
                id: salaryslip.id,
              },
              data: {
                isGeneratedToVoucher: true,
              },
            });
          } else {
            res.status(400);
            throw new Error(
              `A bank voucher for this salary slip has already been created.`
            );
          }
        } else {
          res.status(400);
          throw new Error(
            `salary slip is not approved or not found..kindly check the salary slip status`
          );
        }
      }

      res.json({
        status: "success",
        message: `vouchers created successfully!`,
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

export const createPreApprovedBankVouchers = expressAsyncHandler(
  async (req, res) => {
    const { notApprovedBankVouchersArrIds } = req.body;

    try {
      for (let i = 0; i < notApprovedBankVouchersArrIds.length; i++) {
        const notApprovedBankVoucherId = notApprovedBankVouchersArrIds[i];

        const voucherCreated = await voucherModel.findUnique({
          where: {
            id: Number(notApprovedBankVoucherId),
          },
        });
        if (voucherCreated) {
          if (
            voucherCreated.status === 0 &&
            voucherCreated.statusLevel === "not approved" &&
            voucherCreated.isGenerated
          ) {
            // voucherCreated.status = 1;
            // voucherCreated.statusLevel = "pre approved";
            // await voucherCreated.save();
            await voucherModel.update({
              where: {
                id: voucherCreated.id,
              },
              data: {
                status: 1,
                statusLevel: "pre approved",
              },
            });
          } else {
            res.status(400);
            throw new Error(
              `the bank voucher status is not equal to not approved`
            );
          }
        } else {
          res.status(404);
          throw new Error(
            `bank voucher not found or have not yet been created!`
          );
        }
      }
      //   returning response
      return res.json({
        status: "success",
        message: "All not approved bank vouchers are successfully pre approved",
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

export const createApprovedBankVouchers = expressAsyncHandler(
  async (req, res) => {
    const { preApprovedBankVouchersArrIds } = req.body;

    try {
      for (let i = 0; i < preApprovedBankVouchersArrIds.length; i++) {
        const preApprovedBankVoucherId = preApprovedBankVouchersArrIds[i];

        const voucherCreated = await voucherModel.findUnique({
          where: {
            id: Number(preApprovedBankVoucherId),
          },
        });
        if (voucherCreated) {
          if (
            voucherCreated.status === 1 &&
            voucherCreated.statusLevel === "pre approved" &&
            voucherCreated.isGenerated
          ) {
            await voucherModel.update({
              where: {
                id: voucherCreated.id,
              },
              data: {
                status: 3,
                statusLevel: "approved",
              },
            });
          } else {
            res.status(400);
            throw new Error(
              `the bank voucher status is not equal to pre approved`
            );
          }
        } else {
          res.status(404);
          throw new Error(
            `bank voucher not found or have not yet been created!`
          );
        }
      }
      //   returning response
      return res.json({
        status: "success",
        message: "All pre approved bank vouchers are successfully approved",
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

export const rejectNotApprovedBankVouchers = expressAsyncHandler(
  async (req, res) => {
    const { bankVouchersArr } = req.body;

    try {
      for (let i = 0; i < bankVouchersArr.length; i++) {
        const bankVoucher = bankVouchersArr[i];
        const voucherCreated = await voucherModel.findUnique({
          where: {
            id: Number(bankVoucher.voucher),
          },
        });
        if (
          voucherCreated &&
          voucherCreated.statusLevel === "not approved" &&
          voucherCreated.status === 0
        ) {
          await voucherModel.update({
            where: {
              id: voucherCreated.id,
            },
            data: {
              comment: bankVoucher.comment,
              commentBy: req.user.role,
              status: 2,
            },
          });
        } else {
          res.status(404);
          throw new Error(
            `voucher not found or voucher statusLevel is equal to not approved`
          );
        }
      }

      res.json({
        status: "success",
        message: "rejected not approved bank vouchers successfully",
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

export const rejectPreApprovedBankVouchers = expressAsyncHandler(
  async (req, res) => {
    const { bankVouchersArr } = req.body;

    try {
      for (let i = 0; i < bankVouchersArr.length; i++) {
        const bankVoucher = bankVouchersArr[i];
        const voucherCreated = await voucherModel.findUnique({
          where: {
            id: Number(bankVoucher.voucher),
          },
        });
        if (
          voucherCreated &&
          voucherCreated.statusLevel === "pre approved" &&
          voucherCreated.status === 1
        ) {
          await voucherModel.update({
            where: {
              id: voucherCreated.id,
            },
            data: {
              comment: bankVoucher.comment,
              commentBy: req.user.role,
              status: 2,
            },
          });
        } else {
          res.status(404);
          throw new Error(
            `voucher not found or voucher statusLevel is not equal to pre approved`
          );
        }
      }
      res.json({
        status: "success",
        message: "rejected pre approved bank vouchers successfully",
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

export const deleteBankVoucherById = expressAsyncHandler(async (req, res) => {
  const { id: voucherId } = req.params;

  if (voucherId) {
    const voucher = await voucherModel.findUnique({
      where: {
        id: Number(voucherId),
      },
    });

    const paySlip = await paySlipModel.findUnique({
      where: {
        id: voucher.paySlipId,
      },
    });

    if (paySlip) {
      await paySlipModel.delete({
        where: {
          id: paySlip.id,
        },
      });
      return res.json({
        status: "success",
        message: "deleted succesfully!",
      });
    } else {
      res.status(404);
      throw new Error(`payslip is not found`);
    }

    // if (voucher) {
    //   await voucherModel.findByIdAndDelete(voucher._id);
    //   return res.json({
    //     status: "success",
    //     message: "deleted succesfully!",
    //   });
    // } else {
    //   res.status(404);
    //   throw new Error(`voucher not found!`);
    // }
  } else {
    res.status(400);
    throw new Error(`Invalid voucher id`);
  }
});

export const deleteBulkBankVouchers = expressAsyncHandler(async (req, res) => {
  const { bankVoucherArrIds } = req.body;

  try {
    for (let i = 0; i < bankVoucherArrIds.length; i++) {
      const voucherId = bankVoucherArrIds[i];
      const voucher = await voucherModel.findUnique({
        where: {
          id: Number(voucherId),
        },
      });

      if (voucher) {
        const salarySlip = await paySlipModel.findUnique({
          where: {
            id: voucher.paySlipId,
          },
        });

        if (salarySlip) {
          await paySlipModel.delete({
            where: {
              id: salarySlip.id,
            },
          });
        } else {
          res.status(404);
          throw new Error(`payslip is not found`);
        }
      }

      // if (voucher) {
      //   await voucherModel.findByIdAndDelete(voucher._id);
      // } else {
      //   res.status(404);
      //   throw new Error(`voucher not found`);
      // }
    }
    res.json({
      status: "success",
      message: "deleted bulk bank vouchers successfully",
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
