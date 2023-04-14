import { ErrorRequestHandler } from "express";
import { Configuration } from "../../config";
import { Environments } from "../../domain/types";

export const ErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const errStatus = err.statusCode || 500;
  const errMsg = err.message || 'Something went wrong';
  res.status(errStatus).json({
      success: false,
      status: errStatus,
      message: errMsg,
      stack: Configuration.APP.ENVIRONMENT == Environments.DEVELOPMENT ? err.stack : null
  })
  next();
}
