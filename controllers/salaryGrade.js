import prisma from "@prisma/client";
import expressAsyncHandler from "express-async-handler";

const { salaryGrade: salaryGradeModel } = new prisma.PrismaClient();

export const getAllSalaryGrade = expressAsyncHandler(async (req, res) => {
  const allGrades = await salaryGradeModel.findMany({});
  res.json({
    status: "success",
    salaryGrades: allGrades,
  });
});

export const getSalaryGradeById = expressAsyncHandler(async (req, res) => {
  const { id: gradeId } = req.params;
  const salaryGrade = await salaryGradeModel.findUnique({
    where: {
      id: Number(gradeId),
    },
  });
  if (salaryGrade) {
    return res.json({
      status: "success",
      salaryGrade,
    });
  } else {
    throw new Error("salary grade not found or invalid Id");
  }
});

export const createSalaryGrade = expressAsyncHandler(async (req, res) => {
  const { name } = req.body;
  const newSalaryGrade = await salaryGradeModel.create({
    data: {
      name,
    },
  });
  res.json({
    status: "success",
    newSalaryGrade,
  });
});

export const updateSalaryGrade = expressAsyncHandler(async (req, res) => {
  const { id: gradeId } = req.params;
  const { name } = req.body;

  if (!gradeId) {
    throw new Error("invalid grade id as param");
  }

  const salaryGrade = await salaryGradeModel.findUnique({
    where: {
      id: Number(gradeId),
    },
  });

  if (!salaryGrade) {
    throw new Error(`salary grade not found by id passed- ${gradeId}`);
  }

  const updatedSalaryGrade = await salaryGradeModel.update({
    where: {
      id: Number(gradeId),
    },
    data: {
      name,
    },
  });
  res.json({
    status: "success",
    updatedSalaryGrade,
  });
});

export const deleteSalaryGradeById = expressAsyncHandler(async (req, res) => {
  const { id: gradeId } = req.params;

  if (!gradeId) {
    throw new Error("invalid grade id as param");
  }

  const salaryGrade = await salaryGradeModel.findUnique({
    where: {
      id: Number(gradeId),
    },
  });

  if (!salaryGrade) {
    throw new Error(`salary grade not found by id passed- ${gradeId}`);
  }

  //   delete related data
  await salaryGradeModel.update({
    where: {
      id: salaryGrade.id,
    },
    data: {
      salaryLevels: {
        deleteMany: {},
      },
    },
  });

  //   delete salarygrade from database
  await salaryGradeModel.delete({
    where: {
      id: salaryGrade.id,
    },
  });

  res.json({
    status: "success",
    message: "deleted successfully",
  });
});
