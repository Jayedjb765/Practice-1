import express from 'express';
import { AdminControllers } from './Admin.controller';

const router = express.Router();

router.get('/', AdminControllers.getAllAdmins);

export const AdminRoutes = router;
