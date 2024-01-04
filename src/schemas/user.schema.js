import { z } from "zod";

const userSchema = z.object({
  username: z.string().min(3).max(28),
  password: z.string().min(4).max(64),
});

export const validateUser = (object) => {
  return userSchema.safeParse(object);
};

export const validatePartialUser = (object) => {
  return userSchema.partial().safeParse(object);
};
