import expressAsyncHandler from "express-async-handler";
import prisma from "@prisma/client";
import { getRandomBSID, sumOfNumberToWords } from "../utils/bankschedule.js";
const {
  bankSchedule: bankScheduleModel,
  voucher: voucherModel,
  payslip: paySlipModel,
} = new prisma.PrismaClient();

export const getMonthlyBankSchedules = expressAsyncHandler(async (req, res) => {
  const { bankName, fetchApproved } = req.query;
  const currentYear = String(new Date().getFullYear());
  let allBankSchedules = await bankScheduleModel.findMany({
    where: {
      year: currentYear,
    },
  });
  if (fetchApproved) {
    allBankSchedules = allBankSchedules.filter((el) => el.isApproved);
  }

  if (bankName) {
    allBankSchedules = allBankSchedules.filter(
      (el) => String(el.bankName) === String(bankName)
    );
  }

  res.json({
    status: "success",
    bankSchedules: allBankSchedules,
  });
});

export const ceoGetNotApprovedBankSchedules = expressAsyncHandler(
  async (req, res) => {
    // month
    const { month } = req.query;

    const notApprovedBankSchedules = await bankScheduleModel.findMany({
      where: {
        isApproved: false,
        month,
      },
    });

    res.json({
      status: "success",
      notApprovedBankSchedules,
    });
  }
);

export const createBankSchedule = expressAsyncHandler(async (req, res) => {
  const { bankName, paymentType } = req.query;
  const { approvedVouchers, scheduleData } = req.body;
  const currentYear = String(new Date().getFullYear());

  try {
    const newBankSchedule = await bankScheduleModel.create({
      data: {
        BSID: getRandomBSID(10),
        paymentMethod: scheduleData.paymentMethod,
        paidBy: scheduleData.paidBy,
        theSumOf: sumOfNumberToWords(Math.ceil(Number(scheduleData.subTotal))),
        paymentType,
        subTotal: scheduleData.subTotal,
        year: currentYear,
        month: approvedVouchers[0].month,
        bankName,
      },
    });

    for (let i = 0; i < approvedVouchers.length; i++) {
      const voucherId = Number(approvedVouchers[i].id);
      const voucher = await voucherModel.findUnique({
        where: {
          id: voucherId,
        },
      });
      if (voucher) {
        // voucher.processDoneAsSchedule = true;
        // voucher.bankScheduleId = savedBankSchedule._id;
        // await voucher.save();
        await voucherModel.update({
          where: {
            id: voucher.id,
          },
          data: {
            processDoneAsSchedule: true,
            bankScheduleId: newBankSchedule.id,
          },
        });
      } else {
        res.status(404);
        throw new Error(`Voucher not found`);
      }
    }

    // return response
    res.json({
      status: "success",
      newBankSchedule,
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

export const ceoApproveBankSchedules = expressAsyncHandler(async (req, res) => {
  const { notApprovedBankSchedulesArr } = req.body;

  for (let i = 0; i < notApprovedBankSchedulesArr.length; i++) {
    const notApprovedBankSchedule = await bankScheduleModel.findUnique({
      where: {
        id: Number(notApprovedBankSchedulesArr[i]),
      },
    });

    if (!notApprovedBankSchedule.isApproved) {
      await bankScheduleModel.update({
        where: {
          id: notApprovedBankSchedule.id,
        },
        data: {
          isApproved: true,
          approvedBy: req.user.name,
          ceoSignature: req.user.signaturePhoto,
        },
      });
    } else {
      res.status(400);
      throw new Error(`Bank Schedule is already approved by CEO`);
    }
  }
  4;

  res.json({
    status: "success",
    message: "bank schedules are successfully approved by ceo",
  });
});

export const deleteBankScheduleById = expressAsyncHandler(async (req, res) => {
  const { id: bankScheduleId } = req.params;
  if (bankScheduleId) {
    // const bankSchedule = await bankScheduleModel.findById(bankScheduleId);
    const bankSchedule = await bankScheduleModel.findUnique({
      where: {
        id: Number(bankScheduleId),
      },
    });

    if (bankSchedule) {
      // finding vouchers
      // const allVouchers = await voucherModel.find();

      // filtering vouchers by bankschedule id
      // const bankScheduleVouchers = allVouchers.filter(
      //   (el) => String(el.bankScheduleId) === String(bankSchedule._id)
      // );

      const bankScheduleVouchers = await voucherModel.findMany({
        where: {
          bankScheduleId: bankSchedule.id,
        },
      });

      // checking if there are vouchers
      if (bankScheduleVouchers.length) {
        for (let i = 0; i < bankScheduleVouchers.length; i++) {
          const voucher = await voucherModel.findUnique({
            where: {
              id: bankScheduleVouchers[i].id,
            },
          });
          // find salarysips of particular vouchers

          if (voucher) {
            const payslip = await paySlipModel.findUnique({
              where: {
                id: voucher.paySlipId,
              },
            });

            // checking if payslip exist
            if (payslip) {
              // remove the payslip from database
              // await paySlipModel.findByIdAndDelete(payslip._id);
              await paySlipModel.delete({
                where: {
                  id: payslip.id,
                },
              });
            }

            // remove voucher from database
            // await voucherModel.findByIdAndDelete(voucher._id);
          }
        }
      }

      // await bankScheduleModel.findByIdAndDelete(bankSchedule._id);
      await bankScheduleModel.delete({
        where: {
          id: bankSchedule.id,
        },
      });

      // return response
      return res.json({
        status: "success",
        message: "deleted successfully!",
      });
    } else {
      res.status(404);
      throw new Error(`Bank schedule not found!`);
    }
  } else {
    res.status(400);
    throw new Error(`invalid bankschedule ID`);
  }
});
