import mongoose from 'mongoose';
import { TStudent } from './student.interface';
import { Student } from './student.model';
import AppError from '../../errors/AppError';
import httpstatus from 'http-status';
import { User } from '../user/user.model';

const getAllStudentFromDB = async (query: Record<string, unknown>) => {
  console.log(query);

  const queryObj = { ...query };

  let searchTerm = ''; // SET DEFAULT VALUE

  // IF searchTerm  IS GIVEN SET IT
  const studentSearchAblefields = [
    'email',
    'name.firstname',
    'presentAddtAdress',
  ];
  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string;
  }

  const searchQuery = Student.find({
    $or: studentSearchAblefields.map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  });

  const excludeFields = ['searchTerm', 'sort', 'limit'];
  excludeFields.forEach((el) => delete queryObj[el]);
  const filterquery = searchQuery
    .find(queryObj)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepertment',
      populate: {
        path: 'academicfaculty',
      },
    });

  // SORTING FUNCTIONALITY:

  let sort = '-createdAt'; // SET DEFAULT VALUE

  // IF sort  IS GIVEN SET IT

  if (query.sort) {
    sort = query.sort as string;
  }

  const sortQuery = filterquery.sort(sort);
  let skip = 0;
  let page = 1;
  let limit = 1;
  if (query.limit) {
    limit = Number(query.limit);
  }
  if (query.page) {
    page = Number(query.page);
    skip = (page - 1) * limit;
  }

  const paginateQuery = sortQuery.skip(skip);

  const limitquery = await paginateQuery.limit(limit);
  return limitquery;
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
