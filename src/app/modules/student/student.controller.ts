import { StudentDB } from './student.service';
import sendResponse from '../../utils/sendResponse';
// import StudentValidationSchema from './student.joi';
import httpstatus from 'http-status';
import catchAync from '../../utils/catchAsync';

const getAllStudent = catchAync(async (req, res) => {
  const result = await StudentDB.getAllStudentFromDB(req.query);

  sendResponse(res, {
    statusCode: httpstatus.OK,
    success: true,
    message: ' Student are retrived Successfully',
    data: result,
  });
});

const getSingleStudent = catchAync(async (req, res) => {
  const { id } = req.params;
  const result = await StudentDB.getSingleStudentFromDB(id);

  sendResponse(res, {
    statusCode: httpstatus.OK,
    success: true,
    message: 'Single student is retrived Successfully',
    data: result,
  });
});
const deteStudent = catchAync(async (req, res) => {
  const { id } = req.params;
  const result = await StudentDB.deleteStudentFromDb(id);
  sendResponse(res, {
    statusCode: httpstatus.OK,
    success: true,
    message: 'Single  is deleted Successfully',
    data: result,
  });
});

const updateStudent = catchAync(async (req, res) => {
  const { id } = req.params;
  const { student } = req.body;
  const result = await StudentDB.updateStudentDB(id, student);
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
