import { StudentDB } from './student.service';
import sendResponse from '../../utils/sendResponse';
// import StudentValidationSchema from './student.joi';
import httpstatus from 'http-status';
import catchAync from '../../utils/catchAsync';

const getAllStudent = catchAync(async (req, res) => {
  const result = await StudentDB.getAllStudentFromDB();

  res.status(200).json({
    success: true,
    message: 'Student is retrived Successfully',
    data: result,
  });
});

const getSingleStudent = catchAync(async (req, res) => {
  const { studentid } = req.params;
  const result = await StudentDB.getSingleStudentFromDB(studentid);

  sendResponse(res, {
    statusCode: httpstatus.OK,
    success: true,
    message: 'Single student is retrived Successfully',
    data: result,
  });
});
const deteStudent = catchAync(async (req, res) => {
  const { studentid } = req.params;
  const result = await StudentDB.deleteStudentFromDb(studentid);
  sendResponse(res, {
    statusCode: httpstatus.OK,
    success: true,
    message: 'Single  is deleted Successfully',
    data: result,
  });
});

const updateStudent = catchAync(async (req, res) => {
  const { studentid } = req.params;
  const { student } = req.body;
  const result = await StudentDB.updateStudentDB(studentid, student);
  sendResponse(res, {
    statusCode: httpstatus.OK,
    success: true,
    message: 'Student is updated Successfully',
    data: result,
  });
});
export const StudentController = {
  getAllStudent,
  getSingleStudent,
  deteStudent,
  updateStudent,
};
