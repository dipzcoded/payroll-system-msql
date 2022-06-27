import expressAsyncHandler from "express-async-handler";
import prisma from "@prisma/client";
const { deduction: deductionModel } = new prisma.PrismaClient();

export const getAllDeduction = expressAsyncHandler(async (req, res) => {
  // fetching deductions from mongodb while saving data to redis for caching
  const deductions = await deductionModel.findMany({});

  // returning response
  res.json({
    status: "success",
    deductions,
  });
});

export const createDeduction = expressAsyncHandler(async (req, res) => {
  const { name, description } = req.body;

  // checking if a deduction exist with name before creating a new one
  const deduction = await deductionModel.findUnique({
    where: {
      name,
    },
  });
  if (!deduction) {
    // creating a new deductions
    const newDeduction = await deductionModel.create({
      data: {
        description,
        name,
      },
    });

    // returning response
    return res.json({
      status: "success",
      deduction: newDeduction,
    });
  } else {
    res.status(400);
    throw new Error("deduction with such name exits");
  }
});

export const updateDeduction = expressAsyncHandler(async (req, res) => {
  const { id: deductionId } = req.params;
  const { name, description } = req.body;

  if (deductionId) {
    const deduction = await deductionModel.findUnique({
      where: {
        id: Number(deductionId),
      },
    });
    if (deduction) {
      // updating deduction
      const updatedDeduction = await deductionModel.update({
        where: {
          id: Number(deductionId),
        },
        data: {
          description,
          name,
        },
      });

      // returning response
      return res.json({
        status: "success",
        deduction: updatedDeduction,
      });
    } else {
      res.status(400);
      throw new Error("deduction not found");
    }
  } else {
    res.status(400);
    throw new Error("invalid deduction id");
  }
});

export const deleteDeduction = expressAsyncHandler(async (req, res) => {
  const { id: deductionId } = req.params;

  if (deductionId) {
    const deduction = await deductionModel.findUnique({
      where: {
        id: Number(deductionId),
      },
    });
    if (deduction) {
      await deductionModel.delete({
        where: {
          id: Number(deductionId),
        },
      });

      return res.json({
        status: "success",
        message: "deduction delete successfully!",
      });
    } else {
      res.status(404);
      throw new Error("deduction not found");
    }
  } else {
    res.status(400);
    throw new Error("Invalid deduction id");
  }
});
