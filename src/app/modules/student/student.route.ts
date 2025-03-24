import express from 'express';
import { StudentController } from './student.controller';
import validaterequest from '../../middlewares/validateRequest';
import { StudentValidations } from './student.zod';

const router = express.Router();

router.get('/', StudentController.getAllStudent);
router.get('/:id', StudentController.getSingleStudent);
router.delete('/:id', StudentController.deteStudent);
router.patch(
  '/:id',
  validaterequest(StudentValidations.updateStudentSchema),
  StudentController.updateStudent,
);

export const StudentRoutes = router;
