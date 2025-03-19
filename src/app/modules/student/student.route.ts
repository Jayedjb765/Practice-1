import express from 'express';
import { StudentController } from './student.controller';
import validaterequest from '../../middlewares/validateRequest';
import { StudentValidations } from './student.zod';

const router = express.Router();

router.get('/', StudentController.getAllStudent);
router.get('/:studentid', StudentController.getSingleStudent);
router.delete('/:studentid', StudentController.deteStudent);
router.patch(
  '/:studentid',
  validaterequest(StudentValidations.updateStudentSchema),
  StudentController.updateStudent,
);

export const StudentRoutes = router;
