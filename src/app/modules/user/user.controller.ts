import { RequestHandler } from 'express';
import { UserService } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpstatus from 'http-status';
const createStudent: RequestHandler = async (req, res, next) => {
  try {
    const { password, student: StudentData } = req.body;

    // const zodData = StudentSchema.parse(StudentData);
    const result = await UserService.createStudentIntoDB(password, StudentData);
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
