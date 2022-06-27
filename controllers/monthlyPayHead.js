import prisma from "@prisma/client";
import expressAsyncHandler from "express-async-handler";
const { monthlyPayHead: monthlyPayHeadModel } = new prisma.PrismaClient();

export const getAllMonthlyPayHead = expressAsyncHandler(async (req, res) => {
  // fetching all monthlypayheads from database and caching data to redis
  const allMonthlyPayHeads = await monthlyPayHeadModel.findMany({});

  // returing response
  res.json({
    status: "success",
    allMonthlyPayHeads,
  });
});

export const getMonthlyPayHeadById = expressAsyncHandler(async (req, res) => {
  // params
  const { id: monthlyPayHeadId } = req.params;

  // checking if monthlypayheadid is valid
  if (monthlyPayHeadId) {
    // finding monthlypayhead from the passed id
    const monthlyPayHead = await monthlyPayHeadModel.findUnique({
      where: {
        id: Number(monthlyPayHeadId),
      },
    });

    // checking if the monthlypayhead exists
    if (monthlyPayHead) {
      // returning response
      return res.json({
        status: "success",
        monthlyPayHead,
      });
    } else {
      res.status(404);
      throw new Error("monthlypayhead not found");
    }
  } else {
    res.status(400);
    throw new Error("Invalid monthlypayhead id");
  }
});

export const createMonthlyPayHead = expressAsyncHandler(async (req, res) => {
  // creating a new monthlypayhead
  const newMonthlyPayHead = await monthlyPayHeadModel.create({
    data: {
      ...req.body,
    },
  });

  res.json({
    status: "success",
    newMonthlyPayHead,
  });
});

export const updateMonthlyPayHead = expressAsyncHandler(async (req, res) => {
  // params
  const { id: monthlyPayHeadId } = req.params;

  // checking if monthlypayheadid is valid
  if (monthlyPayHeadId) {
    // getting monthlypayhead using the passed monthlypayhead id
    const monthlyPayHead = await monthlyPayHeadModel.findUnique({
      where: {
        id: Number(monthlyPayHeadId),
      },
    });

    // checking if it exists
    if (monthlyPayHead) {
      // updating monthlypayhead
      const updateMonthlyPayHead = await monthlyPayHeadModel.update({
        where: {
          id: Number(monthlyPayHeadId),
        },
        data: {
          ...req.body,
        },
      });

      // returning response
      return res.json({
        status: "success",
        monthlyPayHead: updateMonthlyPayHead,
      });
    } else {
      res.status(404);
      throw new Error(`monthlypayhead not found!`);
    }
  } else {
    res.status(400);
    throw new Error("Invalid monthlypayhead id");
  }
});

export const deleteMonthlyPayHead = expressAsyncHandler(async (req, res) => {
  // params
  const { id: monthlyPayHeadId } = req.params;

  // checking if monthlypayheadid is valid
  if (monthlyPayHeadId) {
    // getting monthlypayhead by id
    const monthlyPayHead = await monthlyPayHeadModel.findUnique({
      where: {
        id: Number(monthlyPayHeadId),
      },
    });

    // checking if it exists
    if (monthlyPayHead) {
      // deleting monthlypayhead
      await monthlyPayHeadModel.delete({
        where: {
          id: Number(monthlyPayHeadId),
        },
      });

      // returning response
      res.status(200);
      res.json({
        status: "success",
        message: "deleted successfully",
      });
    } else {
      res.status(404);
      throw new Error(`monthlypayhead not found!`);
    }
  } else {
    res.status(400);
    throw new Error("Invalid monthlypayhead Id");
  }
});
