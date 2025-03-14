import { TStudent } from './student.interface';
import { Student } from './student.model';

const getAllStudentFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id });
  return result;
};

const deleteStudentFromDb = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

const updateStudentDB = async (id: string, studentdsata: Partial<TStudent>) => {
  const result = await Student.updateOne({ id }, { $set: studentdsata });
  return result;
};

export const StudentDB = {
  getAllStudentFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDb,
  updateStudentDB,
};
