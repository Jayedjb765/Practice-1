import { Schema } from 'mongoose';
import { TAdmin, TUserName } from './Admin.interface';
import { Gender } from './Admin.constant';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'first name is required'],
    trim: true,
    maxlength: [20, 'Name should not be more than 20 characters'],
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'last name is required'],
    trim: true,
    maxlength: [20, 'Name should not be more than 20 characters'],
  },
});

const adminSchema = new Schema<TAdmin>({
  id: {
    type: String,
    required: [true, 'Id is required'],
    unique: true,
  },
  user: {
    type: Schema.ObjectId,
    required: [true, 'User is required'],
    unique: true,
    ref: 'User',
  },
  designation: {
    type: String,
    required: [true, 'Designation is required'],
  },
  name: {
    type: userNameSchema,
    required: [true, 'Name is required'],
  },
  gender: {
    type: String,
    enum: {
      values: Gender,
      message: `{VALUE} is not gender`,
    },
    required: [true, 'Gender is required'],
  },
  dateOfBirth: {
    type: Date,
  },

  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
});
