import { z } from 'zod';

const createFacultyValidation = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Faculty name must be a string',
      required_error: 'Name is required',
    }),
    academicfaculty: z.string({
      invalid_type_error: 'Faculty name must be a string',
      required_error: 'Faculty is required',
    }),
  }),
});

const updateFacultyValidation = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Faculty name must be a string',
        required_error: 'Name is required',
      })
      .optional(),
    academicfaculty: z
      .string({
        invalid_type_error: 'Faculty name must be a string',
        required_error: 'Faculty is required',
      })
      .optional(),
  }),
});

export const FacultyValidationSchema = {
  createFacultyValidation,
  updateFacultyValidation,
};
