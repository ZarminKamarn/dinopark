import z from "zod";

export const loginSchema = z.object({
  email: z.email("Le mail est invalide"),
  password: z
    .string()
    .min(8, "Le mot de passe doit faire 8 caractères minimum"),
});
