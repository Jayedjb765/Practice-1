import { NextFunction, Request, Response } from 'express';
import { StudentDB } from './student.service';
// import StudentValidationSchema from './student.joi';

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
    res.status(200).json({
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
    res.status(200).json({
      success: true,
      message: 'Sudent is deleted Successfully',
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
    res.status(200).json({
      success: true,
      message: 'Sudent is updated Successfully',
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
