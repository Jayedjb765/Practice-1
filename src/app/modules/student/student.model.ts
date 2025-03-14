import { model, Schema } from 'mongoose';
import {
  Guardian,
  LocalGurdian,
  StudentModel,
  TStudent,
  UserNmae,
} from './student.interface';
// import bcrypt from 'bcrypt';
// import config from '../../config';

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

const StudentSchema = new Schema<TStudent, StudentModel>(
  {
    id: { type: String, required: true, unique: true },
    user: {
      type: Schema.ObjectId,
      required: [true, 'User id must needed'],
      unique: true,
      ref: 'User',
    },
    // password: {
    //   type: String,
    //   required: [true, 'password is required'],
    //   unique: true,
    //   maxlength: [20, 'password canot be more than 20'],
    // },
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

    isDeleted: { type: Boolean, default: false },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

// StudentSchema.pre('save', async function (next) {
//
//   const user = this;
//   user.password = await bcrypt.hash(
//     user.password,
//     Number(config.bcrypt_salt_rounds),
//   );
//   next();
// });

// StudentSchema.post('save', function (doc, next) {
//   doc.password = '';
//   next();
// });

StudentSchema.pre('find', async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
StudentSchema.pre('findOne', async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

StudentSchema.virtual('fullname').get(function () {
  return `${this.name.firstname} ${this.name.middlename} ${this.name.lastname}`;
});

StudentSchema.statics.isUserExist = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};
export const Student = model<TStudent, StudentModel>('Student', StudentSchema);
