module.exports.errorHeandler = (err, req, res, next) => {
  if (res.headersSent) {
    return;
  }
  console.log(err);
  const status = err.status || 500;
  const massage = err.massage || "Server Error";

  res.status(status).send([{ status, detail: massage }]);
};
