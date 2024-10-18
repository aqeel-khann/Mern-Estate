export const successResponse = function (res, msg) {
  var data = {
    status: 1,
    message: msg,
  };
  return res.status(200).json(data);
};

export const successResponseWithData = function (res, msg, data, status) {
  var resData = {
    status,
    message: msg,
    data: data,
  };
  return res.status(200).json(resData);
};

export const ErrorResponse = function (res, msg) {
  var data = {
    status: 0,
    message: msg,
  };
  return res.status(500).json(data);
};

 