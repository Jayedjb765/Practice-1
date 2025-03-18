import catchAync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { FacutyScervice } from './academicDepartment.service';
import httpStatus from 'http-status';
const createDepertment = catchAync(async (req, res) => {
  const result = await FacutyScervice.createFacultySchemaDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Depertment is created succesfully',
    data: result,
  });
});

const findAllDepertment = catchAync(async (req, res) => {
  const result = await FacutyScervice.getAllFacultySchemaDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Depertment is retrived succesfully',
    data: result,
  });
});

const fingSingleDepertment = catchAync(async (req, res) => {
  const { facultyId } = req.params;
  const result = await FacutyScervice.getSingleFacultySchemaDb(facultyId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Academic Depertment is retrived succesfully',
    data: result,
  });
});

const updateDepertment = catchAync(async (req, res) => {
  const { facultyId } = req.params;
  const result = await FacutyScervice.updateFacultySchemaDb(
    facultyId,
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Depertment is updated succesfully',
    data: result,
  });
});

export const FacultyController = {
  createDepertment,
  findAllDepertment,
  fingSingleDepertment,
  updateDepertment,
};
