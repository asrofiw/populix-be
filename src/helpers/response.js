module.exports = {
  responseOk: (res, message, data = {}) => {
    return res.status(200).json({
      success: true,
      message,
      data,
    });
  },
  responseError: (res, status, message, err) => {
    return res.status(status).json({
      success: false,
      message,
      error: err,
    });
  },
};
