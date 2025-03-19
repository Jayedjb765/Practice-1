import { TAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

const createDepertmentSchemaDB = async (payload: TAcademicDepartment) => {
  const result = await AcademicDepartment.create(payload);
  return result;
};

const getAllDepertmentSchemaDB = async () => {
  const result = await AcademicDepartment.find();
  return result;
};

const getSingleDepertmentSchemaDb = async (id: string) => {
  const result = await AcademicDepartment.findById({ _id: id });
  return result;
};

const updateDepertmentSchemaDb = async (
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
  createFacultySchemaDB: createDepertmentSchemaDB,
  getAllFacultySchemaDB: getAllDepertmentSchemaDB,
  getSingleFacultySchemaDb: getSingleDepertmentSchemaDb,
  updateFacultySchemaDb: updateDepertmentSchemaDb,
};
