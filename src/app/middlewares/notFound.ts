/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextFunction, Request, Response } from 'express';
import httpstatus from 'http-status';
const notFound = (req: Request, res: Response, next: NextFunction) => {
  return res.status(httpstatus.NOT_FOUND).json({
    success: false,
    message: 'API not Found',
    error: '',
  });
};

export default notFound;
