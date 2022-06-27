import prisma from "@prisma/client";
import expressAsyncHandler from "express-async-handler";

const { allowance: allowanceModel } = new prisma.PrismaClient();

export const getAllAllowance = expressAsyncHandler(async (req, res) => {
  const allowances = await allowanceModel.findMany({});

  // returning response
  res.json({
    status: "success",
    allowances,
  });
});

export const createAllowance = expressAsyncHandler(async (req, res) => {
  const { name, description } = req.body;

  // finding allowance by name before creating a new allowance
  const allowance = await allowanceModel.findUnique({ where: { name } });

  if (!allowance) {
    // creating a new allowance
    const newAllowance = await allowanceModel.create({
      data: {
        name,
        description,
      },
    });

    // returning response
    return res.json({
      status: "success",
      allowance: newAllowance,
    });
  } else {
    res.status(400);
    throw new Error("allowance with such name already exits");
  }
});

export const updateAllowance = expressAsyncHandler(async (req, res) => {
  const { id: allowanceId } = req.params;
  const { name, description } = req.body;

  if (allowanceId) {
    const allowance = await allowanceModel.findUnique({
      where: {
        id: Number(allowanceId),
      },
    });
    if (allowance) {
      // updating allowance
      const updatedAllowance = await allowanceModel.update({
        where: {
          id: Number(allowanceId),
        },
        data: {
          name,
          description,
        },
      });

      // returning response
      return res.json({
        status: "success",
        allowance: updatedAllowance,
      });
    } else {
      res.status(400);
      throw new Error("allowance not found");
    }
  } else {
    res.status(400);
    throw new Error("invalid allowance id");
  }
});

export const deleteAllowance = expressAsyncHandler(async (req, res) => {
  const { id: allowanceId } = req.params;

  if (allowanceId) {
    const allowance = await allowanceModel.findUnique({
      where: {
        id: Number(allowanceId),
      },
    });
    if (allowance) {
      await allowanceModel.delete({
        where: {
          id: Number(allowanceId),
        },
      });

      return res.json({
        status: "success",
        message: "allowance delete successfully!",
      });
    } else {
      res.status(404);
      throw new Error("allowance not found");
    }
  } else {
    res.status(400);
    throw new Error("Invalid deduction id");
  }
});
