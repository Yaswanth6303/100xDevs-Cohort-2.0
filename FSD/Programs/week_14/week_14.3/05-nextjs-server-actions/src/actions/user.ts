"use server";
// When we are using server actions, we need to use the "use server" directive explicitly at the top of the file
// to tell the compiler that this is a server action and it will be executed on the server.

import { z } from "zod";
import prisma from "../db";

const signupSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
});

type SignupInput = z.infer<typeof signupSchema>;

export async function signup(data: SignupInput) {
  try {
    const validatedData = signupSchema.parse(data);

    await prisma.user.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        password: validatedData.password,
      },
    });

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Signup failed" };
  }
}
