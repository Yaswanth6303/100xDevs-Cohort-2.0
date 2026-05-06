import { z } from 'zod';

export const signupSchema = z.object({
  email: z
    .string({
      message: 'Email is required',
    })
    .email('Invalid email format'),
  password: z
    .string({
      message: 'Password is required',
    })
    .min(6, 'Password must be at least 6 characters')
    .max(100, 'Password must be less than 100 characters'),
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .optional(),
});

export const signinSchema = z.object({
  email: z
    .string({
      message: 'Email is required',
    })
    .email({ message: 'Invalid email format' }),
  password: z.string({
    message: 'Password is required',
  }),
});

export type SignupInput = z.infer<typeof signupSchema>;
export type SigninInput = z.infer<typeof signinSchema>;
