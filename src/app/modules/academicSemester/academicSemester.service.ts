import AppError from '../../errors/AppError';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';
import { acedemicSemesternameCodeMapper } from './academicSemeter.const';
import httpstatus from 'http-status';

const createAcedemicSemeterIntoDB = async (payload: TAcademicSemester) => {
  if (acedemicSemesternameCodeMapper[payload.name] !== payload.code) {
    throw new AppError(httpstatus.NOT_FOUND, 'Invalid  semester code');
  }
  const result = await AcademicSemester.create(payload);
  return result;
};

const getAllSemesterFromDb = async () => {
  const result = await AcademicSemester.find();

  return result;
};

const getAsingleSmesterfromDB = async (id: string) => {
  const result = await AcademicSemester.findOne({ _id: id });
  return result;
};

const updateSemesterFromDB = async (
  id: string,
  payload: Partial<TAcademicSemester>,
) => {
  if (
    payload.name &&
    payload.code &&
    acedemicSemesternameCodeMapper[payload.name] !== payload.code
  ) {
    throw new AppError(httpstatus.NOT_FOUND, 'Invalid semester code');
  }
  const result = await AcademicSemester.findOneAndUpdate(
    { _id: id },
    { $set: payload },
    { new: true },
  );
  return result;
};

export const AcedemicSemeterService = {
  createAcedemicSemeterIntoDB,
  getAsingleSmesterfromDB,
  getAllSemesterFromDb,
  updateSemesterFromDB,
};
