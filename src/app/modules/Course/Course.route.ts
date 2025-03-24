import express from 'express';
import { CourseControllers } from './Couse.controller';
import validaterequest from '../../middlewares/validateRequest';
import { CourseValidations } from './Course.validation';

const route = express.Router();

route.post(
  '/create-course',
  validaterequest(CourseValidations.createCourseValidationSchema),
  CourseControllers.createCourse,
);
export const CourseRoutes = route;
