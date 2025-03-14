import { z } from 'zod';

const UserNameSchema = z.object({
  firstname: z.string().min(1, { message: 'First name is required' }),
  middlename: z.string().optional(),
  lastname: z.string().min(1, { message: 'Last name is required' }),
});

const GuardianSchema = z.object({
  fathernmae: z.string().min(1, { message: 'Fathers name is required' }),
  fatherOccupation: z
    .string()
    .min(1, { message: 'Fathers occupation is required' }),
  fatherContactNo: z
    .string()
    .min(1, { message: 'Fathers contact number is required' }),
  mothernmae: z.string().min(1, { message: 'Mothers name is required' }),
  motherOccupation: z
    .string()
    .min(1, { message: 'Mothers occupation is required' }),
  motherContactNo: z
    .string()
    .min(1, { message: 'Mothers contact number is required' }),
});

export const LocalGuardianSchema = z.object({
  name: z.string().min(1, { message: 'Local guardians name is required' }),
  occupation: z
    .string()
    .min(1, { message: 'Local guardians occupation is required' }),
  contactNo: z
    .string()
    .min(1, { message: 'Local guardians contact number is required' }),
  address: z
    .string()
    .min(1, { message: 'Local guardians address is required' }),
});

const StudentSchema = z.object({
  id: z.string().min(1, { message: 'Student ID is required' }),
  password: z.string().max(30),
  name: UserNameSchema,
  gender: z.enum(['male', 'female'], {
    message: 'Gender must be either male or female',
  }),
  dateOfBirth: z.string().min(1, { message: 'Date of birth is required' }),
  contactNo: z.string().min(1, { message: 'Contact number is required' }),
  emergencyContactNo: z
    .string()
    .min(1, { message: 'Emergency contact number is required' }),
  bloodGroup: z
    .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
      message: 'Blood group must be one of A+, A-, B+, B-, AB+, AB-, O+, O-',
    })
    .optional(),
  email: z.string().email({ message: 'Invalid email format' }),
  presentAddtAdress: z
    .string()
    .min(1, { message: 'Present address is required' }),
  parmanentAdress: z
    .string()
    .min(1, { message: 'Permanent address is required' }),
  guardian: GuardianSchema,
  localGuardian: LocalGuardianSchema,
  profileimg: z.string().optional(),
  isActive: z
    .enum(['active', 'blocked'], {
      message: 'Status must be either active or blocked',
    })
    .default('active'),
  isDeleted: z.boolean(),
});

export default StudentSchema;
