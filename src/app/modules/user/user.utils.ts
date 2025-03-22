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

export const geberatedFacultyID = async () => {
  const lastfaculty = await User.findOne(
    {
      role: 'faculty',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({ createdAt: -1 })
    .lean();

  return lastfaculty?.id ? lastfaculty?.id.substring(2) : undefined;
};
