import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

export const encryptUserPassword = async (userPassword) => {
  const salt = await bcryptjs.genSalt(12);
  return await bcryptjs.hash(userPassword, salt);
};

export const generateLoginToken = (user) => {
  const payload = {
    user: user?.id,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  return token;
};

export const matchPassword = async (userPassword, user) => {
  return await bcryptjs.compare(userPassword, user?.password);
};

export const setPasswordResetToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

export const encryptPasswordResetToken = (resetToken) => {
  return crypto.createHash("sha256").update(resetToken).digest("hex");
};

export const setPasswordResetExpiresDate = () => {
  return Date.now() + 15 * 60 * 1000;
};
