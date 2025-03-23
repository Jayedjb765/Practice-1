import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

const findlastStudent = async () => {
  const lastStudent = await User.findOne(
    {
      role: 'student',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastStudent?.id ? lastStudent.id : undefined;
};

export const generateStudentID = async (payload: TAcademicSemester) => {
  let currentID = (0).toString();
  const lastStudentId = await findlastStudent();
  const lastStudentSemesterCode = lastStudentId?.substring(4, 6);
  const lastStudentSemesteryear = lastStudentId?.substring(0, 4);
  const currentSesterCode = payload.code;
  const currentSesterYear = payload.year;
  if (
    lastStudentId &&
    lastStudentSemesterCode === currentSesterCode &&
    lastStudentSemesteryear === currentSesterYear
  ) {
    currentID = lastStudentId.substring(6);
  }
  let incrementID = (Number(currentID) + 1).toString().padStart(4, '0');
  incrementID = `${payload.year}${payload.code}${incrementID}`;
  return incrementID;
};

// Faculty ID
export const findLastFacultyId = async () => {
  const lastFaculty = await User.findOne(
    {
      role: 'faculty',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};

export const generateFacultyId = async () => {
  let currentId = (0).toString();
  const lastFacultyId = await findLastFacultyId();

  if (lastFacultyId) {
    currentId = lastFacultyId.substring(2);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `F-${incrementId}`;

  return incrementId;
};

export const findAdminId = async () => {
  const lastAdmin = await User.findOne(
    {
      role: 'admin',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastAdmin?.id ? lastAdmin?.id.substring(2) : undefined;
};

export const generateAdminId = async () => {
  let currentId = (0).toString();
  const lastAdminId = await findAdminId();
  if (lastAdminId) {
    currentId = lastAdminId.substring(2);
  }
  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  incrementId = `A-${incrementId}`;
  return incrementId;
};
