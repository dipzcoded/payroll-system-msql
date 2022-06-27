import expressAsyncHandler from "express-async-handler";
import prisma from "@prisma/client";

const { PrismaClient } = prisma;

const { department: departmentModel } = new PrismaClient();

export const getAllDeparments = expressAsyncHandler(async (req, res) => {
  const departments = await departmentModel.findMany({
    where: {
      isActive: true,
    },
  });
  res.json(departments);
});

export const createDepartment = expressAsyncHandler(async (req, res) => {
  const { name } = req.body;

  const departmentFound = await departmentModel.findUnique({
    where: {
      name,
    },
  });

  if (!departmentFound) {
    const formatName =
      name.toLowerCase().endsWith("department") ||
      name.toLowerCase().endsWith("departments")
        ? name
        : `${name} department`;

    // create a new department
    const newDepartment = await departmentModel.create({
      data: {
        name: formatName,
      },
    });
    // returning response
    res.json({
      status: "success",
      department: newDepartment,
    });
  } else {
    res.status(400);
    throw new Error(`department already exists with the name passed - ${name}`);
  }
});

export const updateDepartmentById = expressAsyncHandler(async (req, res) => {
  const { id: departmentId } = req.params;
  const { name } = req.body;

  if (departmentId) {
    const department = await departmentModel.findUnique({
      where: {
        id: Number(departmentId),
      },
    });

    if (department) {
      // formatting the name of the department
      const formatName =
        name.toLowerCase().endsWith("department") ||
        name.toLowerCase().endsWith("departments")
          ? name
          : `${name} department`;

      //   updating department
      const updatedDepartment = await departmentModel.update({
        where: {
          id: department.id,
        },
        data: {
          name: formatName,
        },
      });

      // returning response
      return res.json({
        status: "success",
        department: updatedDepartment,
      });
    } else {
      res.status(404);
      throw new Error("department not found");
    }
  } else {
    res.status(400);
    throw new Error("Invalid department id");
  }
});

export const deleteDepartmentById = expressAsyncHandler(async (req, res) => {
  const { id: departmentId } = req.params;

  if (departmentId) {
    const department = await departmentModel.findUnique({
      where: { id: Number(departmentId) },
    });

    if (department) {
      await departmentModel.update({
        where: {
          id: Number(departmentId),
        },
        data: {
          isActive: false,
          positions: {
            updateMany: {
              where: {
                departmentId: Number(departmentId),
                isActive: true,
              },
              data: {
                isActive: false,
              },
            },
          },
        },
      });
      // returning a response
      return res.json({
        status: "success",
        detail: `${department.name} is inactive from the payroll`,
      });
    } else {
      res.status(404);
      throw new Error("department not found");
    }
  } else {
    res.status(400);
    throw new Error("Invalid department id");
  }
});
