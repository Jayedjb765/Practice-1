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
route.get('/', CourseControllers.getAllCourses);
route.get('/:id', CourseControllers.getAllCourses);
export const CourseRoutes = route;
