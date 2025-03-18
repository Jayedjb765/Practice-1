import { model, Schema } from 'mongoose';
import { TAcademicDepartment } from './academicDepartment.interface';

const facultySchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: [true, 'Depertment name is reqired'],
      unique: true,
    },
    academicfaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
    },
  },
  {
    timestamps: true,
  },
);

export const AcademicDepartment = model<TAcademicDepartment>(
  'AcademicDepartment',
  facultySchema,
);
