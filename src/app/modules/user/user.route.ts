import express from 'express';
import { UserController } from './user.controller';

import { createStudentSchema } from '../student/student.zod';
import validaterequest from '../../middlewares/validateRequest';

const route = express.Router();

route.post(
  '/create-student',
  validaterequest(createStudentSchema),
  UserController.createStudent,
);

export const UserRoutes = route;
