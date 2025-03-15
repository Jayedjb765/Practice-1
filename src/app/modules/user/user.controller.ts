import { NextFunction, Request, Response } from 'express';
import { UserService } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpstatus from 'http-status';
const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, student: StudentData } = req.body;
    // const { error, value } = StudentValidationSchema.validate(StudentData);
    // const result = await StudentDB.createStudentIntoDB(value);

    // const zodData = StudentSchema.parse(StudentData);
    const result = await UserService.createStudentIntoDB(password, StudentData);

    // if (error) {
    //   res.status(500).json({
    //     success: false,
    //     mesage: 'Something went wrong',
    //     error: error.details,
    //   });
    // }

    // res.status(200).json({
    //   success: true,
    //   message: 'student is created Successfully',
    //   data: result,
    // });
    sendResponse(res, {
      statusCode: httpstatus.OK,
      success: true,
      message: 'student is created Successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const UserController = {
  createStudent,
};
