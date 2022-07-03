import prisma from "@prisma/client";
import expressAsyncHandler from "express-async-handler";
import {
  encryptUserPassword,
  generateLoginToken,
  matchPassword,
  setPasswordResetExpiresDate,
  setPasswordResetToken,
  encryptPasswordResetToken,
} from "../utils/user.js";
import Email from "../utils/email.js";

const { user: userModel } = new prisma.PrismaClient();

export const register = expressAsyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  const user = await userModel.findUnique({
    where: {
      email: email,
    },
  });

  if (user) {
    res.status(400);
    throw new Error("user already exists with the email");
  } else {
    const newUser = await userModel.create({
      data: {
        name,
        email,
        role,
        password: await encryptUserPassword(password),
      },
    });

    const token = generateLoginToken(newUser);

    // setting up cookie options
    const options = {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };

    if (process.env.NODE_ENV === "production") {
      options.secure = true;
    }

    res.status(200).cookie("token", token, options).json({
      status: "success",
      message: "registration successful",
      token,
    });
  }
});

export const login = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findUnique({
    where: {
      email,
    },
  });

  if (!user || !(await matchPassword(password, user))) {
    res.status(401);
    throw new Error("Invalid Credentials");
  }

  const token = generateLoginToken(user);

  // setting up cookie options
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res.cookie("token", token, options).json({
    status: "success",
    message: "login successful",
  });
});

export const userLoginStatus = expressAsyncHandler(async (req, res) => {
  const user = await userModel.findUnique({
    where: {
      id: req.user.id,
    },
  });
  res.json({
    status: "success",
    isAuthenticated: true,
    user,
  });
});

export const validTokenStatus = expressAsyncHandler(async (req, res) => {
  res.status(200).send({ status: true });
});

export const getLoginUser = expressAsyncHandler(async (req, res) => {
  const user = await userModel.findUnique({
    where: {
      id: req.user.id,
    },
  });
  if (user) {
    res.json({
      status: "success",
      user,
    });
  } else {
    res.status(404);
    throw new Error("user not exits..opps");
  }
});

export const updateAdminDetails = expressAsyncHandler(async (req, res) => {
  const { name, email, oldPassword, newPassword } = req.body;

  const user = await userModel.findUnique({
    where: {
      id: req.user.id,
    },
  });

  let updateData = {
    password: "",
  };

  if (user) {
    if (oldPassword && newPassword) {
      if (await matchPassword(oldPassword, user)) {
        updateData.password = await encryptUserPassword(newPassword);
      } else {
        res.status(400);
        throw new Error("the old password didnt match..try again!");
      }
    }
    const updatedUser = await userModel.update({
      where: {
        id: req.user.id,
      },
      data: {
        email: email ? email : user.email,
        name: name ? name : user.name,
        password: updateData.password ? updateData.password : user.password,
      },
    });

    const token = generateLoginToken(updatedUser);

    // setting up cookie options
    const options = {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };

    if (process.env.NODE_ENV === "production") {
      options.secure = true;
    }

    res.status(200).cookie("token", token, options).json({
      status: "success",
      user: updatedUser,
    });
  } else {
    res.status(404);
    throw new Error(" =user not found");
  }
});

export const forgotPassword = expressAsyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await userModel.findUnique({
    where: {
      email,
    },
  });

  if (user) {
    // generate random reset token
    const resetToken = setPasswordResetToken();
    await userModel.update({
      where: {
        id: user.id,
      },
      data: {
        passwordResetToken: encryptPasswordResetToken(resetToken),
        passwordResetExpires: setPasswordResetExpiresDate(),
      },
    });

    let resetUrl;
    if (process.env.NODE_ENV === "production") {
      resetUrl = `${process.env.PROD_FRONTEND_URL}/new-password/${resetToken}`;
    } else {
      resetUrl = `${process.env.TEST_FRONTEND_URL}/new-password/${resetToken}`;
    }
    try {
      // send it to user's email

      if (process.env.NODE_ENV !== "production") {
        await new Email(
          {
            user: {
              name: user.name,
              email: user.email,
            },
          },
          resetUrl
        ).sendPasswordReset("Uridium");
      }

      res.json({
        status: "success",
        message: "Token sent to email!",
      });
    } catch (error) {
      await userModel.update({
        where: {
          id: user.id,
        },
        data: {
          passwordResetExpires: null,
          passwordResetToken: null,
        },
      });

      res.status(500);
      throw new Error(error.message);
    }
  } else {
    res.status(404);
    throw new Error("user not found with the email provided");
  }
});

export const resetPassword = expressAsyncHandler(async (req, res) => {
  // get the token from the user
  const { token: resetToken } = req.params;
  const { newPassword } = req.body;
  // check if the token is still valid and the user exist, set the new password
  const hashToken = encryptPasswordResetToken(resetToken);

  const users = await userModel.findMany({});
  const user = users.find(
    (el) =>
      el.passwordResetToken === hashToken &&
      el.passwordResetExpires > Date.now()
  );

  // Update the user changedPasswordAt property for the user
  if (user) {
    const updatedUser = await userModel.update({
      where: {
        id: user.id,
      },
      data: {
        password: await encryptUserPassword(newPassword),
        passwordResetToken: null,
        passwordResetExpires: null,
        passwordChangedAt: new Date(Date.now() - 1000),
      },
    });
    // login the user, send JWT
    const token = generateLoginToken(updatedUser);

    // setting up cookie options
    const options = {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };

    if (process.env.NODE_ENV === "production") {
      options.secure = true;
    }

    res.cookie("token", token, options).json({
      status: "success",
      message: "reset password successful",
    });
  } else {
    res.status(400);
    throw new Error(`token is invalid or has expired`);
  }
});

export const updateCeoSignatureImage = expressAsyncHandler(async (req, res) => {
  const { signaturePhoto } = req.body;

  await userModel.update({
    where: {
      id: req.user.id,
    },
    data: {
      signaturePhoto,
    },
  });
  res.json({
    message: "signature upload successfully!",
  });
});

export const logoutfunc = expressAsyncHandler(async (req, res) => {
  res.clearCookie("token");
  res.status(200).send({
    status: "success",
    message: "logout successfully!",
  });
});
