import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(5),
  price: z.number().min(1),
});

export const credentialsSchema = z.object({
  // email: z.string().email(),
  email: z.string(),
  // password: z.string().min(8),
  password: z.string().min(1),
});
