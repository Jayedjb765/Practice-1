import { Router } from 'express';
import { StudentRoutes } from '../modules/student/student.route';
import { UserRoutes } from '../modules/user/user.route';
import { AcedemicSemeter } from '../modules/academicSemester/academicSemester.rote';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.routes';
import { DepertmentRouter } from '../modules/academicDepartment/academicDepartment.routes';
import { AdminRoutes } from '../modules/Admin/Admin.router';
import { CourseRoutes } from '../modules/Course/Course.route';

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
  {
    path: '/depertment',
    route: DepertmentRouter,
  },
  {
    path: '/admin',
    route: AdminRoutes,
  },

  {
    path: '/course',
    route: CourseRoutes,
  },
];

modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
