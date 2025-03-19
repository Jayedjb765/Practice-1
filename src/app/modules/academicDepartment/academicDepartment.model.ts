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

facultySchema.pre('save', async function (next) {
  const isDepertmemt = await AcademicDepartment.findOne({
    name: this.name,
  });
  if (isDepertmemt) {
    throw new Error('Department name already exists');
  }

  next();
});

facultySchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const isDepertmentExist = await AcademicDepartment.findOne(query);
  if (!isDepertmentExist) {
    throw new Error('Department does not exists');
  }
  next();
});

export const AcademicDepartment = model<TAcademicDepartment>(
  'AcademicDepartment',
  facultySchema,
);
