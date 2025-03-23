import express from 'express';
import { UserController } from './user.controller';

import { createStudentSchema } from '../student/student.zod';
import validaterequest from '../../middlewares/validateRequest';
import { createFacultyValidationSchema } from '../Faculty/Faculty.validation';

const route = express.Router();

route.post(
  '/create-student',
  validaterequest(createStudentSchema),
  UserController.createStudent,
);
route.post(
  '/create-faculty',
  validaterequest(createFacultyValidationSchema),
  UserController.createFaculty,
);

export const UserRoutes = route;
