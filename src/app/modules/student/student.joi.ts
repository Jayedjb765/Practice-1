import Joi from 'joi';

const UserNameSchema = Joi.object({
  firstname: Joi.string().required().messages({
    'any.required': 'First name is required',
  }),
  middlename: Joi.string().allow(null, '').messages({
    'string.base': 'Middle name must be a string',
  }),
  lastname: Joi.string().required().messages({
    'any.required': 'Last name is required',
  }),
});

const GuardianSchema = Joi.object({
  fathernmae: Joi.string().required().messages({
    'any.required': 'Fathers name is required',
  }),
  fatherOccupation: Joi.string().required().messages({
    'any.required': 'Fathers occupation is required',
  }),
  fatherContactNo: Joi.string().required().messages({
    'any.required': 'Fathers contact number is required',
  }),
  mothernmae: Joi.string().required().messages({
    'any.required': 'Mothers name is required',
  }),
  motherOccupation: Joi.string().required().messages({
    'any.required': 'Mothers occupation is required',
  }),
  motherContactNo: Joi.string().required().messages({
    'any.required': 'Mothers contact number is required',
  }),
});

export const LocalGuardianSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'Local guardians name is required',
  }),
  occupation: Joi.string().required().messages({
    'any.required': 'Local guardians occupation is required',
  }),
  contactNo: Joi.string().required().messages({
    'any.required': 'Local guardians contact number is required',
  }),
  address: Joi.string().required().messages({
    'any.required': 'Local guardians address is required',
  }),
});
const StudentValidationSchema = Joi.object({
  id: Joi.string().required().messages({
    'any.required': 'Student ID is required',
  }),
  name: UserNameSchema.required().messages({
    'any.required': 'Name is required',
  }),
  gender: Joi.string().valid('male', 'female').required().messages({
    'any.only': 'Gender must be either male or female',
    'any.required': 'Gender is required',
  }),
  dateOfBirth: Joi.string().required().messages({
    'any.required': 'Date of birth is required',
  }),
  contactNo: Joi.string().required().messages({
    'any.required': 'Contact number is required',
  }),
  emergencyContactNo: Joi.string().required().messages({
    'any.required': 'Emergency contact number is required',
  }),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .messages({
      'any.only': 'Blood group must be one of A+, A-, B+, B-, AB+, AB-, O+, O-',
    }),
  email: Joi.string().email().required().messages({
    'string.email': 'Invalid email format',
    'any.required': 'Email is required',
  }),
  presentAddtAdress: Joi.string().required().messages({
    'any.required': 'Present address is required',
  }),
  parmanentAdress: Joi.string().required().messages({
    'any.required': 'Permanent address is required',
  }),
  guardian: GuardianSchema.required().messages({
    'any.required': 'Guardian information is required',
  }),
  localGuardian: LocalGuardianSchema.required().messages({
    'any.required': 'Local guardian information is required',
  }),
  profileimg: Joi.string().allow(null, '').messages({
    'string.base': 'Profile image URL must be a string',
  }),
  isActive: Joi.string()
    .valid('active', 'blocked')
    .required()
    .default('active')
    .messages({
      'any.only': 'Status must be either active or blocked',
      'any.required': 'Status is required',
    }),
});

export default StudentValidationSchema;
