import { Router } from 'express';
import { StudentRoutes } from '../modules/student/student.route';
import { UserRoutes } from '../modules/user/user.route';
import { AcedemicSemeter } from '../modules/academicSemester/academicSemester.rote';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.routes';

const router = Router();

const modulesRoutes = [
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/acedemic',
    route: AcedemicSemeter,
  },
  {
    path: '/faculty',
    route: AcademicFacultyRoutes,
  },
];

modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
