import { UserService } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpstatus from 'http-status';
import catchAync from '../../utils/catchAsync';
const createStudent = catchAync(async (req, res) => {
  const { password, student: StudentData } = req.body;

  const result = await UserService.createStudentIntoDB(password, StudentData);
  sendResponse(res, {
    statusCode: httpstatus.OK,
    success: true,
    message: 'student is created Successfully',
    data: result,
  });
});

export const UserController = {
  createStudent,
};
