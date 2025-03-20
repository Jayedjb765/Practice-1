import mongoose from 'mongoose';
import { TStudent } from './student.interface';
import { Student } from './student.model';
import AppError from '../../errors/AppError';
import httpstatus from 'http-status';
import { User } from '../user/user.model';

const getAllStudentFromDB = async (query: Record<string, unknown>) => {
  let searchTerm = ''; // SET DEFAULT VALUE

  // IF searchTerm  IS GIVEN SET IT
  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string;
  }
  const result = await Student.find({
    $or: ['email', 'name.firstname', 'presentAddtAdress'].map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepertment',
      populate: {
        path: 'academicfaculty',
      },
    });
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepertment',
      populate: {
        path: 'academicfaculty',
      },
    });
  return result;
};

const deleteStudentFromDb = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedStudent) {
      throw new AppError(httpstatus.BAD_REQUEST, 'Failed to delete student');
    }

    const deleteUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deleteUser) {
      throw new AppError(httpstatus.BAD_REQUEST, 'Failed to delete user');
    }
    await session.commitTransaction();
    await session.endSession();
    return deletedStudent;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    await session.commitTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const updateStudentDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, localGuardian, guardian, ...remaningStudentData } = payload;
  const modifiedUpdatedDatta: Record<string, unknown> = {
    ...remaningStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedDatta[`name.${key}`] = value;
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedDatta[`localGuardian.${key}`] = value;
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedDatta[`guardian.${key}`] = value;
    }
  }

  const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedDatta, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const StudentDB = {
  getAllStudentFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDb,
  updateStudentDB,
};
