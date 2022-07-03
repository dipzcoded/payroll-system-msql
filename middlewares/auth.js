import prisma from "@prisma/client";
const { user: userModel } = new prisma.PrismaClient();
import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

const auth = expressAsyncHandler(async (req, res, next) => {
  let token;

  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await userModel.findUnique({
          where: {
            id: decoded.user,
          },
        });

        next();
      } catch (error) {
        if (
          error.name === "JsonWebTokenError" ||
          error.name === "TokenExpiredError"
        ) {
          res.clearCookie("token");
          res.status(401);
          return res.json({
            status: "fail",
            detail: "Authorization is Invalid!",
          });
        }
        res.clearCookie("token");
        return res.json(400).json({
          status: "fail",
          detail: error.message,
        });
      }
    } else {
      res.clearCookie("token");
      res.status(401);
      throw new Error("invalid token passed");
    }
  } else {
    res.clearCookie("token");
    res.status(401);
    throw new Error("no token was passed");
  }
});

export const restrictAccessRoute = (...userRoles) => {
  return (req, res, next) => {
    // roles ["CEO","HR"]

    if (!userRoles.includes(req.user.role)) {
      res.status(403);
      throw new Error(`you dont have permission to access this route`);
    }
    next();
  };
};

export default auth;
