const sendError = (res, status, error, errorobj) => {
  // eslint-disable-next-line no-console
  let errorMessage = error?.message || errorobj?.message;
  if (status === 500 && !errorMessage) {
    errorMessage = "Internal server error";
  }

  let responseObject = {
    success: false,
    error: errorMessage || "An error occured",
  };

  if (errorobj) {
    delete errorobj?.message;
    responseObject = {
      ...errorobj,
      ...responseObject,
    };
  }

  res.status(status).json(responseObject);
};

const sendInternalServerError = (res, error) => {
  console.log(error);
  return sendError(res, 500, {});
};

const sendData = (res, status, data) => {
  res.status(status).json({ success: true, data });
};

const sendCustomError = (res, customError) => {
  let { fieldsError, statusCode, message } = customError;

  statusCode = statusCode || 500;
  return res.status(statusCode).json({
    success: false,
    statusCode: statusCode,
    fieldsError,
    message,
  });
};

module.exports = {
  sendError,
  sendData,
  sendCustomError,
  sendInternalServerError,
};
