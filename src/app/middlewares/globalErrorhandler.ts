/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from 'express';
import { ZodError, ZodIssue } from 'zod';
import { Terrprsources } from '../interface/error';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong!';

  const errorSources: Terrprsources = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  const handelzoderror = (err: ZodError) => {
    const errorsouces = err.issues.map((issue: ZodIssue) => {
      return {
        path: issue?.path[issue.path.length - 1],
        message: issue.message,
      };
    });
    statusCode = 400;
    return {
      statusCode,
      message: 'Zod validation error',
      errorSources,
    };
  };

  if (err instanceof ZodError) {
    const simpleZoderror = handelzoderror(err);
    message = 'Invalid request data';
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    // error: err,
  });
};

export default globalErrorHandler;
