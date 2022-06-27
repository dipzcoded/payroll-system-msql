export const error = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  return res.json({
    status: "fail",
    detail: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export const notFound = (req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};
