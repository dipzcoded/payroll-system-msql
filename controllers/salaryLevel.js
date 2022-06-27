import prisma from "@prisma/client";
import expressAsyncHandler from "express-async-handler";
const { salaryLevel: salaryLevelModel, salaryGrade: salaryGradeModel } =
  new prisma.PrismaClient();

export const getAllSalaryLevels = expressAsyncHandler(async (req, res) => {
  const allSalaryLevels = await salaryLevelModel.findMany({});

  res.json({
    status: "success",
    salaryLevels: allSalaryLevels,
  });
});

export const getSalaryLevelById = expressAsyncHandler(async (req, res) => {
  const { id: levelId } = req.params;

  if (!levelId) {
    throw new Error(`invalid passed as param- ${levelId}`);
  }

  const salaryLevel = await salaryLevelModel.findUnique({
    where: {
      id: Number(levelId),
    },
    include: {
      salaryGrade: true,
      salarySteps: true,
    },
  });

  if (!salaryLevel) {
    throw new Error(`salary level not found by id passed- ${levelId}`);
  }

  res.json({
    status: "success",
    salaryLevel,
  });
});

export const getSalaryLevelByGrade = expressAsyncHandler(async (req, res) => {
  const { gradeId } = req.params;

  if (!gradeId) {
    throw new Error(`invalid gradeId not found- ${gradeId}`);
  }

  const salaryGrade = await salaryGradeModel.findUnique({
    where: {
      id: Number(gradeId),
    },
  });
  if (!salaryGrade) {
    throw new Error(`salary grade not found by id- ${gradeId}`);
  }

  const salaryLevels = await salaryLevelModel.findMany({
    where: {
      salaryGradeId: salaryGrade.id,
    },
    include: {
      salaryGrade: true,
    },
  });
  res.json({
    status: "success",
    salaryLevels,
  });
});

export const createSalaryLevel = expressAsyncHandler(async (req, res) => {
  const { gradeId } = req.params;
  const { name } = req.body;

  const salaryGrade = await salaryGradeModel.findUnique({
    where: {
      id: Number(gradeId),
    },
  });

  if (!salaryGrade) {
    throw new Error("salary grade not found");
  }

  //   const newSalaryLevel = await salaryLevelModel.create({
  //     salaryGrade: salaryGrade._id,
  //     name,
  //   });

  const newSalaryLevel = await salaryLevelModel.create({
    data: {
      name,
      salaryGradeId: salaryGrade.id,
    },
  });

  res.json({ status: "success", newSalaryLevel });
});

export const updateSalaryLevel = expressAsyncHandler(async (req, res) => {
  const { id: salaryLevelId, gradeId } = req.params;
  const { name } = req.body;

  if (!gradeId) {
    throw new Error(`invalid salary grade id passed as param - ${gradeId} `);
  }

  const salaryGrade = await salaryGradeModel.findUnique({
    where: {
      id: Number(gradeId),
    },
  });

  if (!salaryGrade) {
    throw new Error(`salary grade not found by- ${gradeId}`);
  }

  if (!salaryLevelId) {
    throw new Error(
      `invalid salary level id passed as param- ${salaryLevelId}`
    );
  }

  const salarylevel = await salaryLevelModel.findUnique({
    where: {
      id: Number(salaryLevelId),
    },
  });

  if (!salarylevel) {
    throw new Error(`salary level not found by id- ${salaryLevelId}`);
  }

  const updatedSalaryLevel = await salaryLevelModel.update({
    where: {
      id: salarylevel.id,
    },
    data: {
      salaryGradeId: salaryGrade.id,
      name,
    },
    include: {
      salaryGrade: true,
      salarySteps: true,
    },
  });
  res.json({
    status: "success",
    updatedSalaryLevel,
  });
});

export const deleteSalaryLevelById = expressAsyncHandler(async (req, res) => {
  const { id: salaryLevelId } = req.params;

  if (!salaryLevelId) {
    throw new Error(
      `invalid salarylevel id passed as param - ${salaryLevelId}`
    );
  }

  const salaryLevel = await salaryLevelModel.findUnique({
    where: {
      id: Number(salaryLevelId),
    },
  });

  if (!salaryLevel) {
    throw new Error(`salary level not found by id-${salaryLevelId}`);
  }

  //   delete related data
  await salaryLevelModel.update({
    where: {
      id: salaryLevel.id,
    },
    data: {
      salarySteps: {
        deleteMany: {},
      },
    },
  });

  //   delete salarylevel from database
  await salaryLevelModel.delete({
    where: {
      id: salaryLevel.id,
    },
  });

  res.json({
    status: "success",
    message: "deleted successfully",
  });
});
