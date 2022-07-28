import prisma from "@prisma/client";
import expressAsyncHandler from "express-async-handler";

const {
  position: positionModel,
  department: departmentModel,
  employee: employeeModel,
  payslip: paySlipModel,
  voucher: voucherModel,
} = new prisma.PrismaClient();

export const getAllPosition = expressAsyncHandler(async (req, res) => {
  const positions = await positionModel.findMany({
    where: {
      isActive: true,
    },
  });

  res.json({
    status: "success",
    positions,
  });
});

export const getPositionByDepartment = expressAsyncHandler(async (req, res) => {
  const { department: departmentId } = req.params;
  if (departmentId) {
    const positionDepart = await positionModel.findMany({
      where: {
        isActive: true,
        departmentId: Number(departmentId),
      },
    });
    res.json({
      status: "success",
      positions: positionDepart,
    });
  } else {
    res.status(400);
    throw new Error("Invalid department id");
  }
});

export const createPosition = expressAsyncHandler(async (req, res) => {
  const { department: departmentId } = req.params;
  const { name } = req.body;

  if (departmentId) {
    const department = await departmentModel.findUnique({
      where: {
        id: Number(departmentId),
      },
    });
    if (department) {
      const position = await positionModel.findUnique({ where: { name } });
      if (!position) {
        const newPosition = await positionModel.create({
          data: {
            name,
            departmentId: Number(departmentId),
          },
          include: {
            department: true,
          },
        });

        return res.json({
          status: "success",
          position: newPosition,
        });
      } else {
        res.status(400);
        throw new Error("a position with the name already exist");
      }
    } else {
      res.status(404);
      throw new Error("no department was found");
    }
  } else {
    res.status(400);
    throw new Error("Invalid department id");
  }
});

export const updatePosition = expressAsyncHandler(async (req, res) => {
  const { department: departmentId, id: positionId } = req.params;
  const { name } = req.body;
  if (departmentId && positionId) {
    const department = await departmentModel.findUnique({
      where: {
        id: Number(departmentId),
      },
    });

    if (department) {
      const position = await positionModel.findUnique({
        where: {
          id: Number(positionId),
        },
      });
      if (position) {
        const updatedPosition = await positionModel.update({
          where: {
            id: Number(positionId),
          },
          data: {
            name,
            departmentId: Number(departmentId),
          },
          include: {
            department: true,
          },
        });

        return res.json({
          status: "success",
          position: updatedPosition,
        });
      } else {
        res.status(404);
        throw new Error("no position was found");
      }
    } else {
      res.status(404);
      throw new Error("no department was found");
    }
  } else {
    res.status(400);
    throw new Error("Invalid department ID or invalid position ID");
  }
});

export const deletePositionById = expressAsyncHandler(async (req, res) => {
  const { id: positionId } = req.params;

  if (positionId) {
    const position = await positionModel.findUnique({
      where: { id: Number(positionId) },
    });
    if (position && position.isActive) {
      const positionEmployees = await employeeModel.findMany({
        where: {
          positionId: position.id,
        },
      });

      if (positionEmployees.length) {
        for (let i = 0; i < positionEmployees.length; i++) {
          const positionEmployee = positionEmployees[i];
          const employeePayslips = await paySlipModel.findMany({
            where: {
              employeeId: positionEmployee.id,
            },
          });
          if (employeePayslips.length) {
            for (let i = 0; i < employeePayslips.length; i++) {
              const currentPayslip = employeePayslips[i];
              const voucherPayslips = await voucherModel.findMany({
                where: { paySlipId: currentPayslip.id },
              });
              if (voucherPayslips.length) {
                await voucherModel.updateMany({
                  where: {
                    paySlipId: currentPayslip.id,
                  },
                  data: {
                    isActive: false,
                  },
                });
              }
              await paySlipModel.update({
                where: {
                  id: currentPayslip.id,
                },
                data: {
                  isActive: false,
                },
              });
            }
          }

          await employeeModel.update({
            where: {
              id: positionEmployee.id,
            },
            data: {
              isActive: false,
            },
          });
        }
      }

      await positionModel.update({
        where: {
          id: Number(positionId),
        },
        data: {
          isActive: false,
        },
      });
      // returning a response
      return res.json({
        status: "success",
        detail: `${position.name} is inactive from the payroll`,
      });
    } else {
      res.status(404);
      throw new Error(
        "position not found or is already inactive from the system"
      );
    }
  } else {
    res.status(400);
    throw new Error("Invalid position id");
  }
});
