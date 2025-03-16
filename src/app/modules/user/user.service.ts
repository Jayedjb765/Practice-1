import config from '../../config';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';

import { User } from './user.model';

const createStudentIntoDB = async (password: string, StudentData: TStudent) => {
  const UserData: Partial<TUser> = {};

  UserData.password = password || (config.default_pass as string);

  UserData.role = 'student';

  const generateStudentID = (payload: TAcademicSemester) => {};

  const newUser = await User.create(UserData);
  if (Object.keys(newUser).length) {
    StudentData.id = newUser.id;
    StudentData.user = newUser._id;
    const newStudent = await Student.create(StudentData);
    return newStudent;
  }
  return newUser;
};

export const UserService = {
  createStudentIntoDB,
};
