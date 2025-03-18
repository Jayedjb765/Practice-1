import express from 'express';
import { DepertmentController } from './academicDepartment.controller';
import validaterequest from '../../middlewares/validateRequest';
import { FacultyValidationSchema } from './academicDepartment.validation';

const router = express.Router();

router.post(
  '/create-depertment',
  validaterequest(FacultyValidationSchema.createFacultyValidation),
  DepertmentController.createDepertment,
);
router.patch(
  '/:facultyId',
  validaterequest(FacultyValidationSchema.updateFacultyValidation),
  DepertmentController.updateDepertment,
);
router.get('/', DepertmentController.findAllDepertment);
router.get('/:facultyId', DepertmentController.fingSingleDepertment);

export const DepertmentRouter = router;
