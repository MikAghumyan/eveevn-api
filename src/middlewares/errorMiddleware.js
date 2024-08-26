export default (err, req, res, next) => {
  const errCode = res.statusCode || 500;

  res.status(errCode);
  console.log("errMiddleware", errCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
