import { Model, Types } from 'mongoose';

export type Guardian = {
  fathernmae: string;
  fatherOccupation: string;
  fatherContactNo: string;
  mothernmae: string;
  motherOccupation: string;
  motherContactNo: string;
};
export type UserNmae = {
  firstname: string;
  middlename?: string;
  lastname: string;
};
export type LocalGurdian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};
export type TStudent = {
  id: string;
  user: Types.ObjectId;
  password: string;
  name: UserNmae;
  gender: 'male' | 'female';
  dateOfBirth: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  email: string;
  presentAddtAdress: string;
  parmanentAdress: string;
  guardian: Guardian;
  localGuardian: LocalGurdian;
  profileimg?: string;
  isDeleted: boolean;
};

export interface StudentModel extends Model<TStudent> {
  // eslint-disable-next-line no-unused-vars
  isUserExist(id: string): Promise<TStudent | null>;
}
