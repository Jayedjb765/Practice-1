import config from '../../config';

import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';

import { User } from './user.model';
import { generateStudentID } from './user.utils';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  const UserData: Partial<TUser> = {};

  UserData.password = password || (config.default_pass as string);

  UserData.role = 'student';

  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );
  UserData.id = await generateStudentID(admissionSemester);

  const newUser = await User.create(UserData);
  if (Object.keys(newUser).length) {
    payload.id = newUser.id;
    payload.user = newUser._id;
    const newStudent = await Student.create(payload);
    return newStudent;
  }
  return newUser;
};

export const UserService = {
  createStudentIntoDB,
};
