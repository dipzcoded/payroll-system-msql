import prisma from "@prisma/client";
import expressAsyncHandler from "express-async-handler";
const {
  salaryStep: salaryStepModel,
  salaryGrade: salaryGradeModel,
  salaryLevel: salaryLevelModel,
  salaryStepNotch: salaryStepNotchModel,
  basePay: basePayModel,
} = new prisma.PrismaClient();

export const getSalaryStep = expressAsyncHandler(async (req, res) => {
  const salarySteps = await salaryStepModel.findMany({
    include: {
      notches: true,
    },
  });
  res.json({
    status: "success",
    salarySteps,
  });
});

export const getSalaryStepsBySalaryLevel = expressAsyncHandler(
  async (req, res) => {
    const { salaryLevelId } = req.params;
    if (!salaryLevelId) {
      throw new Error(`Invalid salarylevel passed as param - ${salaryLevelId}`);
    }

    const salaryLevel = await salaryLevelModel.findUnique({
      where: {
        id: Number(salaryLevelId),
      },
    });

    if (!salaryLevel) {
      throw new Error(`salary level not found`);
    }

    const salarylevelSteps = await salaryStepModel.findMany({
      where: {
        salaryLevelId: Number(salaryLevelId),
      },
      include: {
        notches: true,
      },
    });
    res.json({
      status: "success",
      salarySteps: salarylevelSteps,
    });
  }
);

export const createSalaryStepV2 = expressAsyncHandler(async (req, res) => {
  const { salaryLevelId, salaryGradeId } = req.params;
  const { name, notchesNumber } = req.body;

  const salaryGrade = await salaryGradeModel.findUnique({
    where: {
      id: Number(salaryGradeId),
    },
  });
  const salaryLevel = await salaryLevelModel.findUnique({
    where: {
      id: Number(salaryLevelId),
    },
  });
  const salaryLevels = await salaryLevelModel.findMany({
    include: {
      salaryGrade: true,
    },
  });
  const salarySteps = await salaryStepModel.findMany({
    include: {
      notches: true,
      salaryLevel: true,
    },
  });
  const basePays = await basePayModel.findMany({});

  const salaryLevelSteps = await salaryStepModel.findMany({
    where: {
      salaryLevelId: Number(salaryLevel.id),
    },

    include: {
      notches: true,
    },
  });

  if (!Number(salaryGrade.id) === Number(salaryLevel.salaryGradeId)) {
    throw new Error(`salary grade id not match with salary level grade id`);
  }

  // create salary steps for Junior Grade
  if (salaryGrade.name === "Junior Staff Grade") {
    const newSalaryStep = {};
    newSalaryStep.salaryLevelId = salaryLevel.id;
    newSalaryStep.name = name;
    newSalaryStep.amount = 0;

    // let savedSalaryStep;

    // create for first salary level (ENTRY LEVEL (NO EXPERIENCE) - 1)
    if (
      salaryLevel.name.toLowerCase() ===
      String("ENTRY LEVEL (NO EXPERIENCE) - 1").toLowerCase()
    ) {
      if (!salaryLevelSteps.length) {
        newSalaryStep.amount =
          ((basePays[0].cola + 100) / 100) * basePays[0].firstGrossPay;
      } else {
        const preSalaryStep = salaryLevelSteps[salaryLevelSteps.length - 1];
        const preNotchAmount =
          preSalaryStep.notches[preSalaryStep.notches.length - 1].amount;
        newSalaryStep.amount = ((3 + 100) / 100) * preNotchAmount;
      }

      //   savedSalaryStep = await newSalaryStep.save();
    } else if (
      salaryLevel.name.toLowerCase() ===
      String("ENTRY LEVEL (WITH EXPERIENCE)").toLowerCase()
    ) {
      if (!salaryLevelSteps.length) {
        newSalaryStep.amount =
          ((basePays[0].cola + 100) / 100) * basePays[0].secondGrossPay;
      } else {
        const preSalaryStep = salaryLevelSteps[salaryLevelSteps.length - 1];
        const preNotchAmount =
          preSalaryStep.notches[preSalaryStep.notches.length - 1].amount;
        newSalaryStep.amount = ((3 + 100) / 100) * preNotchAmount;
      }

      //   savedSalaryStep = await newSalaryStep.save();
    } else {
      const prevSalaryLevel = salaryLevels[salaryLevels.length - 2];
      const preSalaryLevelSteps = salarySteps.filter(
        (el) => Number(el.salaryLevelId) === Number(prevSalaryLevel.id)
      );
      const preSalaryLevelLastStep =
        preSalaryLevelSteps[preSalaryLevelSteps.length - 1];
      const lastNotchVal =
        preSalaryLevelLastStep.notches[
          preSalaryLevelLastStep.notches.length - 1
        ].amount;
      if (!salaryLevelSteps.length) {
        newSalaryStep.amount = ((10 + 100) / 100) * lastNotchVal;
      } else {
        const preSalaryStep = salarySteps[salarySteps.length - 1];
        const preNotchAmount =
          preSalaryStep.notches[preSalaryStep.notches.length - 1].amount;
        newSalaryStep.amount = ((3 + 100) / 100) * preNotchAmount;
      }

      //   savedSalaryStep = await newSalaryStep.save();
    }

    let savedSalaryStep = await salaryStepModel.create({
      data: {
        salaryLevelId: newSalaryStep.salaryLevelId,
        name: newSalaryStep.name,
        amount: newSalaryStep.amount,
      },
      include: {
        notches: true,
      },
    });

    // creating notches
    if (notchesNumber) {
      const newSalaryStepNotches = [];
      for (let i = 1; i <= notchesNumber; i++) {
        const newNotch = {};
        newNotch.name = `Notch ${i}`;
        newNotch.amount = 0;
        if (!newSalaryStepNotches.length) {
          newNotch.amount = ((2 + 100) / 100) * savedSalaryStep.amount;
        } else {
          const preNotchAmount =
            newSalaryStepNotches[newSalaryStepNotches.length - 1].amount;
          newNotch.amount = ((2 + 100) / 100) * preNotchAmount;
        }
        newSalaryStepNotches.push(newNotch);
      }
      savedSalaryStep = await salaryStepModel.update({
        where: {
          id: savedSalaryStep.id,
        },
        data: {
          notches: {
            create: [...newSalaryStepNotches],
          },
        },
      });
    }

    return res.json({ status: "success", savedSalaryStep });
  }

  // senior staff Grade
  if (salaryGrade.name === "Senior Staff Grade") {
    const salaryGradeLevels = salaryLevels.filter(
      (el) => String(el.salaryGrade.name) === "Senior Staff Grade"
    );
    const newSalaryStep = {};
    newSalaryStep.name = name;
    newSalaryStep.salaryLevelId = salaryLevel.id;
    newSalaryStep.amount = 0;

    if (salaryGradeLevels.length === 1) {
      if (!salaryLevelSteps.length) {
        newSalaryStep.amount =
          ((basePays[0].cola + 100) / 100) * basePays[0].thirdGrossPay;
      } else {
        const prevStepLevel = salaryLevelSteps[salaryLevelSteps.length - 1];
        const prevStepAmount = prevStepLevel.amount;
        newSalaryStep.amount = ((2 + 100) / 100) * prevStepAmount;
      }

      const savedSalaryStep = await salaryStepModel.create({
        data: {
          salaryLevelId: newSalaryStep.salaryLevelId,
          amount: newSalaryStep.amount,
          name: newSalaryStep.name,
        },
      });
      return res.json({ status: "success", savedSalaryStep });
    }

    if (salaryGradeLevels.length > 1) {
      const preSalaryGradelevel =
        salaryGradeLevels[salaryGradeLevels.length - 2];
      const prevSalaryLevelSteps = salarySteps.filter(
        (el) => Number(el.salaryLevel.id) === Number(preSalaryGradelevel.id)
      );
      const prevStepAmount =
        prevSalaryLevelSteps[prevSalaryLevelSteps.length - 1].amount;

      if (salaryLevel.name === "Manager(First Level Manager)") {
        if (!salaryLevelSteps.length) {
          newSalaryStep.amount =
            ((10 + 100) / 100) * prevSalaryLevelSteps[0].amount;
          // console.log(prevSalaryLevelSteps[0].amount);
        } else {
          const prevStepAmount =
            salaryLevelSteps[salaryLevelSteps.length - 1].amount;
          newSalaryStep.amount = ((2 + 100) / 100) * prevStepAmount;
        }
        const savedSalaryStep = await salaryStepModel.create({
          data: {
            salaryLevelId: newSalaryStep.salaryLevelId,
            name: newSalaryStep.name,
            amount: newSalaryStep.amount,
          },
        });
        return res.json({ status: "success", savedSalaryStep });
      }

      if (!salaryLevelSteps.length) {
        newSalaryStep.amount = ((10 + 100) / 100) * prevStepAmount;
      }

      if (salaryLevelSteps.length) {
        const salaryStepLevelPrevAmount =
          salaryLevelSteps[salaryLevelSteps.length - 1].amount;
        newSalaryStep.amount = ((2 + 100) / 100) * salaryStepLevelPrevAmount;
      }

      const savedSalaryStep = await salaryStepModel.create({
        data: {
          salaryLevelId: newSalaryStep.salaryLevelId,
          name: newSalaryStep.name,
          amount: newSalaryStep.amount,
        },
      });
      return res.json({ status: "success", savedSalaryStep });
    }
  }

  // Management Staff Grade
  if (salaryGrade.name === "Management Staff Grade") {
    const managementGradeSalaryLevels = salaryLevels.filter(
      (el) => el.salaryGrade.name === "Management Staff Grade"
    );
    const newSalaryStep = {};
    newSalaryStep.name = name;
    newSalaryStep.salaryLevelId = salaryLevel.id;
    newSalaryStep.amount = 0;

    if (managementGradeSalaryLevels.length === 1) {
      if (!salaryLevelSteps.length) {
        newSalaryStep.amount =
          ((basePays[0].cola + 100) / 100) * basePays[0].fourthGrossPay;
      } else {
        const prevStepLevelAmount =
          salaryLevelSteps[salaryLevelSteps.length - 1].amount;
        newSalaryStep.amount = ((2 + 100) / 100) * prevStepLevelAmount;
      }
    }

    if (managementGradeSalaryLevels.length > 1) {
      // const currentSalarySteps = salarySteps.filter(
      //   (el) => String(el.salaryLevel._id) === String(salaryLevelId)
      // );

      const prevManagementGradeSalaryLevel =
        managementGradeSalaryLevels[managementGradeSalaryLevels.length - 2];

      const prevManagementSteps = salarySteps.filter(
        (el) =>
          Number(el.salaryLevel.id) ===
          Number(prevManagementGradeSalaryLevel.id)
      );

      const prevManagementStepAmount =
        prevManagementSteps[prevManagementSteps.length - 1].amount;

      if (salaryLevel.name === "DEPUTY GENERAL MANAGER") {
        if (!salaryLevelSteps.length) {
          const preManagementStepVal =
            prevManagementSteps[prevManagementSteps.length - 2].amount;
          newSalaryStep.amount = ((10 + 100) / 100) * preManagementStepVal;
        } else {
          const prevStepAmount =
            salaryLevelSteps[salaryLevelSteps.length - 1].amount;
          newSalaryStep.amount = ((2 + 100) / 100) * prevStepAmount;
        }
        const savedSalaryStep = await salaryStepModel.create({
          data: {
            salaryLevelId: newSalaryStep.salaryLevelId,
            name: newSalaryStep.name,
            amount: newSalaryStep.amount,
          },
        });
        return res.json({ status: "success", savedSalaryStep });
      }

      if (!salaryLevelSteps.length) {
        newSalaryStep.amount = ((10 + 100) / 100) * prevManagementStepAmount;
      } else {
        const prevSalaryStepAmount =
          salaryLevelSteps[salaryLevelSteps.length - 1].amount;
        newSalaryStep.amount = ((2 + 100) / 100) * prevSalaryStepAmount;
      }
    }

    const savedSalaryStep = await salaryStepModel.create({
      data: {
        salaryLevelId: newSalaryStep.salaryLevelId,
        name: newSalaryStep.name,
        amount: newSalaryStep.amount,
      },
    });
    return res.json({ status: "success", savedSalaryStep });
  }

  // Middle Staff Grade
  if (salaryGrade.name === "Middle Staff Grade") {
    const newSalaryStep = {};
    newSalaryStep.name = name;
    newSalaryStep.salaryLevelId = Number(salaryLevelId);
    newSalaryStep.amount = 0;

    if (!salaryLevelSteps.length) {
      // getting prev level
      const prevSalaryLevel = salaryLevels[salaryLevels.length - 2];

      // getting prev level last step
      const prevSalaryLevelSteps = salarySteps.filter(
        (el) => Number(el.salaryLevel.id) === Number(prevSalaryLevel.id)
      );

      // getting prev steps of prev level
      const prevSalaryStepLevel =
        prevSalaryLevelSteps[prevSalaryLevelSteps.length - 1];

      // getting the length of prev step notches length
      const noOfNotchesLength = prevSalaryStepLevel.notches.length - 1;

      //   console.log(prevSal)

      // getting the value of prev step last value of last notch
      const prevNotchVal =
        prevSalaryStepLevel.notches[noOfNotchesLength].amount;
      newSalaryStep.amount = ((3 + 100) / 100) * prevNotchVal;
    } else {
      // getting prev steps
      const prevSalaryStepLevel = salaryLevelSteps[salaryLevelSteps.length - 1];

      // getting the length of prev step notches length
      const noOfNotchesLength = prevSalaryStepLevel.notches.length - 1;

      // getting the value of prev step last value of last notch
      const prevNotchVal =
        prevSalaryStepLevel.notches[noOfNotchesLength].amount;

      newSalaryStep.amount = ((3 + 100) / 100) * prevNotchVal;
    }

    let savedSalaryStep = await salaryStepModel.create({
      data: {
        salaryLevelId: newSalaryStep.salaryLevelId,
        name: newSalaryStep.name,
        amount: newSalaryStep.amount,
      },
      include: {
        notches: true,
      },
    });

    // creating notches
    if (notchesNumber) {
      const newSalaryStepNotches = [];
      for (let i = 1; i <= notchesNumber; i++) {
        const newNotch = {};
        newNotch.name = `Notch ${i}`;
        newNotch.amount = 0;
        if (!newSalaryStepNotches.length) {
          newNotch.amount = ((2 + 100) / 100) * savedSalaryStep.amount;
        } else {
          const preNotchAmount =
            newSalaryStepNotches[newSalaryStepNotches.length - 1].amount;
          newNotch.amount = ((2 + 100) / 100) * preNotchAmount;
        }
        newSalaryStepNotches.push(newNotch);
      }

      savedSalaryStep = await salaryStepModel.update({
        where: {
          id: savedSalaryStep.id,
        },
        data: {
          notches: {
            create: [...newSalaryStepNotches],
          },
        },
      });
    }

    return res.json({ status: "success", savedSalaryStep });
  }
});

export const deleteSalaryStepById = expressAsyncHandler(async (req, res) => {
  const { id: stepId } = req.params;

  if (!stepId) {
    throw new Error(`invalid id passed as param`);
  }

  const stepFound = await salaryStepModel.findUnique({
    where: {
      id: Number(stepId),
    },
  });
  if (!stepFound) {
    throw new Error(`salary step not found by id passed - ${stepId}`);
  }

  await salaryStepModel.delete({
    where: {
      id: stepFound.id,
    },
  });

  return res.json({
    status: "success",
    message: "deleted successfully!",
  });
});

export const updateAllSalarySteps = expressAsyncHandler(async (req, res) => {
  const allSalarySteps = await salaryStepModel.findMany({
    include: {
      salaryLevel: {
        include: {
          salaryGrade: true,
        },
      },
      notches: true,
    },
  });
  if (allSalarySteps.length) {
    // call a function that will update the values
    await updateSalaryStepFunc(allSalarySteps, res);
  } else {
    res.json({
      status: "success",
      message: "updated the salary structure successfully!",
    });
  }
});

const updateSalaryStepFunc = async (allSalarySteps, res) => {
  const basePays = await basePayModel.findMany({});
  const salaryLevels = await salaryLevelModel.findMany({
    include: {
      salaryGrade: true,
    },
  });

  for (let i = 0; i < salaryLevels.length; i++) {
    const salaryLevel = salaryLevels[i];
    const _i = i;
    if (
      salaryLevel?.salaryGrade?.name === "Junior Staff Grade" ||
      salaryLevel?.salaryGrade?.name === "Middle Staff Grade"
    ) {
      // update values for Junior Staff Grade
      await juniorAndMiddleStaffGradeUpdateFunc(
        salaryLevel?.name,
        _i,
        allSalarySteps,
        basePays[0],
        salaryLevels
      );
    }

    if (
      salaryLevel?.salaryGrade?.name === "Senior Staff Grade" ||
      salaryLevel?.salaryGrade?.name === "Management Staff Grade"
    ) {
      // update values for Senior Staff Grade
      await managementStaffGradeUpdateFunc(
        salaryLevel?.name,
        _i,
        allSalarySteps,
        basePays[0],
        salaryLevels
      );
    }
  }

  res.json({
    status: "success",
    message: "done!",
  });
};

const juniorAndMiddleStaffGradeUpdateFunc = async (
  salaryLevelName,
  salaryLevelIndex,
  allSalarySteps,
  basePays,
  allSalaryLevels
) => {
  // ENTRY LEVEL (WITH EXPERIENCE)

  // getting salary steps of a particular salarylevel
  const filteredSalaryLevelSteps = allSalarySteps?.filter(
    (el) => el?.salaryLevel?.name === salaryLevelName
  );

  let currentSalaryStep = {};
  currentSalaryStep.id = 0;
  currentSalaryStep.amount = 0;
  currentSalaryStep.salaryLevel = null;
  // currentSalaryStep.notches = [];

  // currentSalaryStep.amount = 0;

  // this is will update the salary step of the first step (ENTRY LEVEL (NO EXPERIENCE) - 1)
  if (
    (salaryLevelIndex === 0 &&
      salaryLevelName === "ENTRY LEVEL (NO EXPERIENCE) - 1") ||
    salaryLevelName === "ENTRY LEVEL (WITH EXPERIENCE)"
  ) {
    // loopin through the filtered arrays
    for (let i = 0; i < filteredSalaryLevelSteps.length; i++) {
      // console.log(i);
      currentSalaryStep.id = filteredSalaryLevelSteps[i]?.id;
      console.log(currentSalaryStep.id, "id");
      //  currentSalaryStep.id = currentStep.id;
      //  currentSalaryStep.notches = currentStep.notches;
      // first step
      if (i === 0) {
        currentSalaryStep.amount =
          salaryLevelName !== "ENTRY LEVEL (WITH EXPERIENCE)" &&
          salaryLevelIndex === 0
            ? ((basePays?.cola + 100) / 100) * basePays?.firstGrossPay
            : ((basePays?.cola + 100) / 100) * basePays?.secondGrossPay;
      } else {
        // ...rest steps
        const preSalaryLevelStepId = filteredSalaryLevelSteps[i - 1]?.id;

        const preSalaryLevelStep = await salaryStepModel.findUnique({
          where: {
            id: Number(preSalaryLevelStepId),
          },
          include: {
            notches: true,
          },
        });
        const preSalaryLevelNotchAmount =
          preSalaryLevelStep?.notches[preSalaryLevelStep?.notches?.length - 1]
            ?.amount;
        currentSalaryStep.amount =
          ((3 + 100) / 100) * preSalaryLevelNotchAmount;
      }

      // saving the currentSalaryStep
      const updatedStep = await salaryStepModel.update({
        where: {
          id: Number(currentSalaryStep.id),
        },
        data: {
          amount: currentSalaryStep.amount,
        },
        include: {
          notches: true,
        },
      });

      // looping through notches
      if (updatedStep.notches.length) {
        // const updateStepNotches = [];
        for (let x = 0; x < updatedStep.notches.length; x++) {
          const notch = updatedStep.notches[x];

          if (x === 0) {
            notch.amount = ((2 + 100) / 100) * updatedStep.amount;
          } else {
            const preNotch = updatedStep.notches[x - 1];
            notch.amount = ((2 + 100) / 100) * preNotch.amount;
          }

          // updateStepNotches.push({
          //   name: notch.name,
          //   amount: notch.amount,
          // });
          await salaryStepNotchModel.update({
            where: {
              id: notch.id,
            },
            data: {
              amount: notch.amount,
            },
          });
        }

        // await salaryStepModel.update({
        //   where: {
        //     id: updatedStep.id,
        //   },
        //   data: {
        //     notches: {
        //       update: [...updateStepNotches],
        //     },
        //   },
        // });
      }
    }
  } else {
    // update the rest of salary steps
    // getting the previous Salary by id
    const preSalaryLevel = allSalaryLevels[salaryLevelIndex - 1];

    // filter salarysteps by previous salary level
    const filteredPreSalaryLevelSteps = allSalarySteps?.filter(
      (el) => Number(el?.salaryLevel?.id) === Number(preSalaryLevel?.id)
    );

    // getting last steps of previous last salarylevel from filtered list
    const preSalaryLevelLastStepId =
      filteredPreSalaryLevelSteps[filteredPreSalaryLevelSteps.length - 1]?.id;

    const preSalaryLevelLastStep = await salaryStepModel.findUnique({
      where: {
        id: Number(preSalaryLevelLastStepId),
      },
      include: {
        notches: true,
      },
    });

    // getting the amount of previous salaryLevel Step notch
    const preSalaryLevelLastStepNotchAmount =
      preSalaryLevelLastStep?.notches[
        preSalaryLevelLastStep?.notches?.length - 1
      ]?.amount;

    // looping through filtered salary steps
    for (let i = 0; i < filteredSalaryLevelSteps.length; i++) {
      const curIndex = i;
      currentSalaryStep.id = filteredSalaryLevelSteps[curIndex]?.id;
      currentSalaryStep.salaryLevel =
        filteredSalaryLevelSteps[curIndex]?.salaryLevel;
      // getting first step of the current salarylevel
      if (curIndex === 0) {
        if (
          currentSalaryStep?.salaryLevel?.salaryGrade?.name !==
          "Middle Staff Grade"
        ) {
          currentSalaryStep.amount =
            ((10 + 100) / 100) * preSalaryLevelLastStepNotchAmount;
        } else {
          currentSalaryStep.amount =
            ((3 + 100) / 100) * preSalaryLevelLastStepNotchAmount;
        }
      } else {
        // ...rest steps
        const preSalaryLevelStepId = filteredSalaryLevelSteps[curIndex - 1]?.id;
        const preSalaryLevelStep = await salaryStepModel.findUnique({
          where: {
            id: Number(preSalaryLevelStepId),
          },
          include: {
            notches: true,
          },
        });
        const preSalaryLevelNotchAmount =
          preSalaryLevelStep?.notches[preSalaryLevelStep?.notches?.length - 1]
            ?.amount;
        currentSalaryStep.amount =
          ((3 + 100) / 100) * preSalaryLevelNotchAmount;
      }

      // saving current changes for current salary step
      const updatedStep = await salaryStepModel.update({
        where: {
          id: Number(currentSalaryStep.id),
        },
        data: {
          amount: currentSalaryStep.amount,
        },
        include: {
          notches: true,
        },
      });

      if (updatedStep.notches.length) {
        //  looping through notches
        // const updateStepNotches = [];
        for (let x = 0; x < updatedStep.notches.length; x++) {
          const curIndex = x;
          const notch = updatedStep.notches[curIndex];

          // getting first notch value
          if (x === 0) {
            notch.amount = ((2 + 100) / 100) * updatedStep.amount;
          } else {
            const preNotch = updatedStep.notches[curIndex - 1];
            notch.amount = ((2 + 100) / 100) * preNotch.amount;
          }

          await salaryStepNotchModel.update({
            where: {
              id: notch.id,
            },
            data: {
              amount: notch.amount,
            },
          });

          // updateStepNotches.push({
          //   name: notch.name,
          //   amount: notch.amount,
          // });
        }

        // await salaryStepModel.update({
        //   where: {
        //     id: updatedStep.id,
        //   },
        //   data: {
        //     notches: {
        //       update: [...updateStepNotches],
        //     },
        //   },
        // });
      }
    }
  }
};

const managementStaffGradeUpdateFunc = async (
  salaryLevelName,
  salaryLevelIndex,
  allSalarySteps,
  basePays,
  allSalaryLevels
) => {
  let currentSalaryStep = {};
  currentSalaryStep.id = 0;
  currentSalaryStep.amount = 0;
  currentSalaryStep.salaryLevel = null;

  const filteredSalaryLevelSteps = allSalarySteps?.filter(
    (el) => el?.salaryLevel?.name === salaryLevelName
  );

  for (let i = 0; i < filteredSalaryLevelSteps.length; i++) {
    const curIndex = i;
    currentSalaryStep.id = filteredSalaryLevelSteps[curIndex]?.id;
    currentSalaryStep.salaryLevel =
      filteredSalaryLevelSteps[curIndex]?.salaryLevel;

    if (curIndex === 0) {
      const preSalaryLevel = allSalaryLevels[salaryLevelIndex - 1];
      const filteredPreSalaryLevelSteps = allSalarySteps?.filter(
        (el) => Number(el?.salaryLevel?.id) === Number(preSalaryLevel?.id)
      );

      if (
        currentSalaryStep?.salaryLevel?.salaryGrade?.name ===
        "Senior Staff Grade"
      ) {
        if (
          currentSalaryStep?.salaryLevel?.name?.includes("Assistant Manager")
        ) {
          currentSalaryStep.amount =
            ((basePays?.cola + 100) / 100) * basePays?.thirdGrossPay;
        } else if (
          currentSalaryStep?.salaryLevel?.name ===
          "Manager(First Level Manager)"
        ) {
          const preFirstSalaryStep = await salaryStepModel.findUnique({
            where: {
              id: Number(filteredPreSalaryLevelSteps[0]?.id),
            },
          });
          currentSalaryStep.amount =
            ((10 + 100) / 100) * preFirstSalaryStep.amount;
        } else {
          const preLastSalaryLevelId =
            filteredPreSalaryLevelSteps[filteredPreSalaryLevelSteps.length - 1]
              ?.id;
          const preLastSalaryLevelStep = await salaryStepModel.findUnique({
            where: {
              id: Number(preLastSalaryLevelId),
            },
          });
          currentSalaryStep.amount =
            ((10 + 100) / 100) * preLastSalaryLevelStep.amount;
        }
      } else if (
        currentSalaryStep?.salaryLevel?.salaryGrade?.name ===
        "Management Staff Grade"
      ) {
        if (
          currentSalaryStep?.salaryLevel?.name === "ASSIST. GENERAL MANAGER"
        ) {
          currentSalaryStep.amount =
            ((basePays?.cola + 100) / 100) * basePays?.fourthGrossPay;
        } else if (
          currentSalaryStep?.salaryLevel?.name === "DEPUTY GENERAL MANAGER"
        ) {
          const preThirdSalaryLevelStep = await salaryStepModel.findUnique({
            where: {
              id: Number(filteredPreSalaryLevelSteps[2]?.id),
            },
          });
          currentSalaryStep.amount =
            ((10 + 100) / 100) * preThirdSalaryLevelStep.amount;
        } else {
          const preLastSalaryLevelStepId =
            filteredPreSalaryLevelSteps[filteredPreSalaryLevelSteps.length - 1]
              ?.id;
          const preLastSalaryLevelStep = await salaryStepModel.findUnique({
            where: {
              id: Number(preLastSalaryLevelStepId),
            },
          });
          currentSalaryStep.amount =
            ((10 + 100) / 100) * preLastSalaryLevelStep.amount;
        }
      }
    } else {
      const preSalaryLevelStepId = filteredSalaryLevelSteps[curIndex - 1]?.id;
      const preSalaryLevelStep = await salaryStepModel.findUnique({
        where: {
          id: Number(preSalaryLevelStepId),
        },
      });
      currentSalaryStep.amount = ((2 + 100) / 100) * preSalaryLevelStep?.amount;
    }

    await salaryStepModel.update({
      where: {
        id: Number(currentSalaryStep.id),
      },
      data: {
        amount: currentSalaryStep.amount,
      },
    });
  }
};
