import express from 'express';
import { AcedemicSemeterController } from './academicSemester.controller';
import validaterequest from '../../middlewares/validateRequest';
import { academicSemesterValidationSchema } from './academicSemester.validation';

const router = express.Router();

router.post(
  '/create-academicsemeter',
  validaterequest(
    academicSemesterValidationSchema.createacademicSemesterValidationSchema,
  ),
  AcedemicSemeterController.cresteAcedemicSemeter,
);
router.get('/', AcedemicSemeterController.getAllAcedemicSemester);

router.get('/:semesterId', AcedemicSemeterController.getSingleAcedemicSemester);
router.patch(
  '/:semesterId',
  validaterequest(
    academicSemesterValidationSchema.updateAcademicSemesterValidationSchema,
  ),
  AcedemicSemeterController.updateAcedemicSemeter,
);

export const AcedemicSemeter = router;
