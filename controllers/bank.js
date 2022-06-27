import prisma from "@prisma/client";
import expressAsyncHandler from "express-async-handler";
const { bank: bankModel } = new prisma.PrismaClient();

export const getAllBanks = expressAsyncHandler(async (req, res) => {
  const allBanks = await bankModel.findMany({});

  // returning a response
  res.json({
    status: "success",
    banks: allBanks,
  });
});

export const createBank = expressAsyncHandler(async (req, res) => {
  const { name, accountNumber, bankAddress, bankEmailAddress, bankPhoneNo } =
    req.body;
  const newBankName = await bankModel.create({
    data: {
      name:
        name.endsWith("Bank") || name.endsWith("bank")
          ? `${name.split(" ")[0]} Bank`
          : `${name} Bank`,
      accountNumber,
      bankAddress,
      bankEmailAddress,
      bankPhoneNo,
    },
  });

  res.json({
    status: "success",
    newBank: newBankName,
  });
});

export const updateBank = expressAsyncHandler(async (req, res) => {
  const { id: bankId } = req.params;
  const { name, bankAddress, bankEmailAddress, accountNumber, bankPhoneNo } =
    req.body;

  if (bankId) {
    let bank = await bankModel.findUnique({
      where: {
        id: Number(bankId),
      },
    });

    if (bank) {
      const updatedBank = await bankModel.update({
        where: {
          id: Number(bankId),
        },
        data: {
          name:
            name.endsWith("Bank") || name.endsWith("bank")
              ? `${name.split(" ")[0]} Bank`
              : `${name} Bank`,
          accountNumber,
          bankAddress,
          bankEmailAddress,
          bankPhoneNo,
        },
      });

      return res.json({
        status: "success",
        bank: updatedBank,
      });
    } else {
      res.status(404);
      throw new Error(`Bank not found!`);
    }
  } else {
    res.status(400);
    throw new Error(`Invalid bank id passed`);
  }
});

export const deleteBank = expressAsyncHandler(async (req, res) => {
  const { id: bankId } = req.params;

  if (bankId) {
    const bank = await bankModel.findUnique({
      where: {
        id: Number(bankId),
      },
    });
    if (bank) {
      await bankModel.delete({
        where: {
          id: Number(bankId),
        },
      });

      return res.json({
        status: "success",
        message: "deleted successfully!",
      });
    } else {
      res.status(404);
      throw new Error(`bank not found!`);
    }
  } else {
    res.status(400);
    throw new Error(`Invalid bank id passed`);
  }
});
