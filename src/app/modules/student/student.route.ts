import express from 'express';
import { StudentController } from './student.controller';

const router = express.Router();

router.get('/', StudentController.getAllStudent);
router.get('/:studentid', StudentController.getSingleStudent);
router.delete('/:studentid', StudentController.deteStudent);
router.put('/:studentid', StudentController.updateStudent);

export const StudentRoutes = router;
