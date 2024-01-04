import { z } from "zod";

const noteSchema = z.object({
  title: z.string().max(255),
  description: z.string().max(255),
});

export const validateNote = (object) => {
  return noteSchema.safeParse(object);
};

export const validatePartialNote = (object) => {
  return noteSchema.partial().safeParse(object);
};
