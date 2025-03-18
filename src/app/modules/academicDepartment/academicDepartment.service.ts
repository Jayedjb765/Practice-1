import { TAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

const createFacultySchemaDB = async (payload: TAcademicDepartment) => {
  const result = await AcademicDepartment.create(payload);
  return result;
};

const getAllFacultySchemaDB = async () => {
  const result = await AcademicDepartment.find();
  return result;
};

const getSingleFacultySchemaDb = async (id: string) => {
  const result = await AcademicDepartment.findById({ _id: id });
  return result;
};

const updateFacultySchemaDb = async (
  id: string,
  payload: Partial<TAcademicDepartment>,
) => {
  const result = await AcademicDepartment.findByIdAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    },
  );
  return result;
};

export const FacutyScervice = {
  createFacultySchemaDB,
  getAllFacultySchemaDB,
  getSingleFacultySchemaDb,
  updateFacultySchemaDb,
};
