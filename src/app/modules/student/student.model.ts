import { model, Schema } from 'mongoose';
import {
  Guardian,
  LocalGurdian,
  StudentModel,
  TStudent,
  UserNmae,
} from './student.interface';
// import validator from 'validator';
const GuardianSchema = new Schema<Guardian>({
  fathernmae: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  mothernmae: { type: String, required: true },
  motherOccupation: { type: String, required: true },
  motherContactNo: { type: String, required: true },
});

const UserNameScema = new Schema<UserNmae>({
  firstname: { type: String, required: true },
  middlename: { type: String },
  lastname: { type: String, required: true },
});

const LocalGuardianSchema = new Schema<LocalGurdian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
});

const StudentSchema = new Schema<TStudent, StudentModel>({
  id: { type: String, required: true, unique: true },
  name: {
    type: UserNameScema,
    required: true,
  },
  gender: { type: String, enum: ['male', 'female'], required: true },
  dateOfBirth: { type: String, required: true },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    // validate: {
    //   validator: (value: string) => validator.isEmail(value),
    //   message: '{VALUE} is not valid email',
    // },
  },
  presentAddtAdress: { type: String, required: true },
  parmanentAdress: { type: String, required: true },
  guardian: {
    type: GuardianSchema,
    required: true,
  },
  localGuardian: {
    type: LocalGuardianSchema,
    required: true,
  },
  profileimg: { type: String },
  isActive: {
    type: String,
    enum: ['active', 'blocked'],
    required: true,
    default: 'active',
  },
});

StudentSchema.statics.isUserExist = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};
export const Student = model<TStudent, StudentModel>('Student', StudentSchema);
