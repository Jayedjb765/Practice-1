import mongoose from 'mongoose';
import config from '../../config';

import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';

import { User } from './user.model';
import { generateStudentID } from './user.utils';
import AppError from '../../errors/AppError';
import httpstatus from 'http-status';
import { TFaculty } from '../Faculty/Faculty.interface';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  const UserData: Partial<TUser> = {};

  UserData.password = password || (config.default_pass as string);

  UserData.role = 'student';

  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    //set  generated id
    UserData.id = await generateStudentID(admissionSemester);

    const newUser = await User.create([UserData], { session });
    if (!newUser.length) {
      throw new AppError(httpstatus.BAD_REQUEST, 'Failed to create user');
    }
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;
    const newStudent = await Student.create([payload], { session });
    if (!newStudent.length) {
      throw new AppError(httpstatus.BAD_REQUEST, 'Failed to create student');
    }

    await session.commitTransaction();
    await session.endSession();
    return newStudent;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const createFaculty = async (password: string, payload: TFaculty) => {
  const userData: Partial<TUser> = {};
  userData.password = password || (config.default_pass as string);
  userData.role = 'faculty';
  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment,
  );
  if (!academicDepartment) {
    throw new AppError(400, 'Depertment not found');
  }
  const session = await mongoose.startSession();
  try {
  } catch (err) {
    console.log(err);
  }
};

export const UserService = {
  createStudentIntoDB,
  createFaculty,
};
