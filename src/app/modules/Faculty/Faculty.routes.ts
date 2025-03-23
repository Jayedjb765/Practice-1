import express from 'express';
import { FacultyControllers } from './Faculty.controller';
import validaterequest from '../../middlewares/validateRequest';
import { updateFacultyValidationSchema } from './Faculty.validation';

const router = express.Router();

router.get('/:id', FacultyControllers.getSingleFaculty);

router.patch(
  '/:id',
  validaterequest(updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
);

router.delete('/:id', FacultyControllers.deleteFaculty);

router.get('/', FacultyControllers.getAllFaculties);

export const FacultyRoutes = router;
