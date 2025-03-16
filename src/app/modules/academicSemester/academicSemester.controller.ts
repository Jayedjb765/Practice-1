import catchAync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpstatus from 'http-status';
import { AcedemicSemeterService } from './academicSemester.service';

const cresteAcedemicSemeter = catchAync(async (req, res) => {
  const result = await AcedemicSemeterService.createAcedemicSemeterIntoDB(
    req.body,
  );
  sendResponse(res, {
    statusCode: httpstatus.OK,
    success: true,
    message: 'Academic Semester Created Successfully',
    data: result,
  });
});

const getAllAcedemicSemester = catchAync(async (req, res) => {
  const result = await AcedemicSemeterService.getAllSemesterFromDb();
  sendResponse(res, {
    statusCode: httpstatus.OK,
    success: true,
    message: 'Academic Semesteris retreved Successfully',
    data: result,
  });
});

const getSingleAcedemicSemester = catchAync(async (req, res) => {
  const { semesterId } = req.params;
  const result =
    await AcedemicSemeterService.getAsingleSmesterfromDB(semesterId);
  sendResponse(res, {
    statusCode: httpstatus.OK,
    success: true,
    message: 'Single Academic Semesteris retreved Successfully',
    data: result,
  });
});

const updateAcedemicSemeter = catchAync(async (req, res) => {
  const { semesterId } = req.params;
  const result = await AcedemicSemeterService.updateSemesterFromDB(
    semesterId,
    req.body,
  );
  sendResponse(res, {
    statusCode: httpstatus.OK,
    success: true,
    message: ' Academic Semesteris updated Successfully',
    data: result,
  });
});

export const AcedemicSemeterController = {
  cresteAcedemicSemeter,
  getAllAcedemicSemester,
  getSingleAcedemicSemester,
  updateAcedemicSemeter,
};
