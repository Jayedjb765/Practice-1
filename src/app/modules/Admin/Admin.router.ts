import express from 'express';
import { AdminControllers } from './Admin.controller';
import validaterequest from '../../middlewares/validateRequest';
import { updateAdminValidationSchema } from './Admin.validatio';

const router = express.Router();

router.get('/', AdminControllers.getAllAdmins);
router.get('/:adminid', AdminControllers.getSingleAdmin);
router.patch(
  '/:adminid',
  validaterequest(updateAdminValidationSchema),
  AdminControllers.updateAdmin,
);

export const AdminRoutes = router;
