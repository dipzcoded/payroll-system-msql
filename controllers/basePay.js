import prisma from "@prisma/client";
import expressAsyncHandler from "express-async-handler";
const { basePay: basePayModel } = new prisma.PrismaClient();

export const getBasePay = expressAsyncHandler(async (req, res) => {
  const basePays = await basePayModel.findMany({});
  res.json({ status: "success", basePays });
});

export const createBasePay = expressAsyncHandler(async (req, res) => {
  const createdBasePay = await basePayModel.create({
    data: {
      ...req.body,
    },
  });

  res.json({
    status: "success",
    createdBasePay,
  });
});

export const updateBasePay = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    throw new Error(`invalid id passed as param-${id}`);
  }

  const basePayFound = await basePayModel.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!basePayFound) {
    throw new Error(`base pay not created or not found by id-${id}`);
  }

  await basePayModel.update({
    where: {
      id: Number(id),
    },
    data: {
      ...req.body,
    },
  });

  next();
  // res.json({
  //   status: "success",
  //   message: "updated successfully!",
  // });
});
