export type TUser = {
  id: string;
  password: string;
  needspassword: boolean;
  role: 'admin' | 'student' | 'faculty';
  isDeleted: false;
  status: 'in-progress' | 'blocked';
};
