import catchAync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CourseServices } from './Course.service';
import httpStatus from 'http-status';
const createCourse = catchAync(async (req, res) => {
  const result = await CourseServices.createCourseIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty is retrieved succesfully',
    data: result,
  });
});

export const CourseControllers = {
  createCourse,
};
