import { Request, Response } from 'express';
import { StudentDB } from './student.service';
// import StudentValidationSchema from './student.joi';
import StudentSchema from './student.zod';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: StudentData } = req.body;
    // const { error, value } = StudentValidationSchema.validate(StudentData);
    // const result = await StudentDB.createStudentIntoDB(value);

    const zodData = StudentSchema.parse(StudentData);
    const result = await StudentDB.createStudentIntoDB(zodData);

    // if (error) {
    //   res.status(500).json({
    //     success: false,
    //     mesage: 'Something went wrong',
    //     error: error.details,
    //   });
    // }

    res.status(200).json({
      success: true,
      message: 'student is created Successfulllyy',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      mesage: 'Something went wrong',
      error: err,
    });
  }
};

const getAllStudent = async (req: Request, res: Response) => {
  try {
    const result = await StudentDB.getAllStudentFromDB();

    res.status(200).json({
      success: true,
      message: 'student is retrived Successfulllyy',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentid } = req.params;
    const result = await StudentDB.getSingleStudentFromDB(studentid);
    res.status(200).json({
      success: true,
      message: 'Single student is retrived Successfulllyy',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const StudentController = {
  createStudent,
  getAllStudent,
  getSingleStudent,
};
