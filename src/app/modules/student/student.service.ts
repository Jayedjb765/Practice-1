import { TStudent } from './student.interface';
import { Student } from './student.model';

const createStudentIntoDB = async (student: TStudent) => {
  if (await Student.isUserExist(student.id)) {
    throw new Error('User already exists!');
  }
  const result = await Student.create(student);
  return result;
};

const getAllStudentFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id });
  return result;
};

const deleteStudentFromDb = async (id: string) => {};

export const StudentDB = {
  createStudentIntoDB,
  getAllStudentFromDB,
  getSingleStudentFromDB,
};
