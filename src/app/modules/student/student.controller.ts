import { NextFunction, Request, Response } from 'express';
import { StudentDB } from './student.service';
import sendResponse from '../../utils/sendResponse';
// import StudentValidationSchema from './student.joi';
import httpstatus from 'http-status';
const getAllStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await StudentDB.getAllStudentFromDB();

    res.status(200).json({
      success: true,
      message: 'Student is retrived Successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { studentid } = req.params;
    const result = await StudentDB.getSingleStudentFromDB(studentid);
    // res.status(200).json({
    //   success: true,
    //   message: 'Single student is retrived Successfully',
    //   data: result,
    // });
    sendResponse(res, {
      statusCode: httpstatus.OK,
      success: true,
      message: 'Single student is retrived Successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
const deteStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { studentid } = req.params;
    const result = await StudentDB.deleteStudentFromDb(studentid);
    sendResponse(res, {
      statusCode: httpstatus.OK,
      success: true,
      message: 'Single  is deleted Successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const updateStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { studentid } = req.params;
    const { student } = req.body;
    const result = await StudentDB.updateStudentDB(studentid, student);
    sendResponse(res, {
      statusCode: httpstatus.OK,
      success: true,
      message: 'Student is updated Successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const StudentController = {
  getAllStudent,
  getSingleStudent,
  deteStudent,
  updateStudent,
};
