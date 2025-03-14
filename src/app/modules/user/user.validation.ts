import { z } from 'zod';

const userValidationSchema = z.object({
  //   id: z.string(),
  //   password: z
  //     .string()
  //     .max(20, { message: 'Password must be less than 20 characters' }),
  //   needsPasswordChange: z.boolean().optional().default(true),
  //   role: z.enum(['admin', 'student', 'faculty']),
  //   isDeleted: z.boolean().optional().default(false),
  //   status: z.enum(['in-progress', 'blocked']).default('in-progress'),
  pasword: z
    .string({
      invalid_type_error: 'Password must be string',
    })
    .max(20, { message: 'Password can not be more than 20 characters' })
    .optional(),
});

export const UserValidation = {
  userValidationSchema,
};
