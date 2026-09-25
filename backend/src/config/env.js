import "dotenv/config"; // Loads .env into process.env
import { z } from "zod";

// 1. Define the Zod schema (This is your ONE source of truth)
const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),

  // Parse PORT as a string, transform it to a Number, and refine it
  PORT: z
    .string()
    .default("5000")
    .transform((val) => Number(val))
    .refine((num) => num >= 1 && num <= 65535, {
      message: "PORT must be a number between 1 and 65535",
    }),

  MONGO_URI: z.string().min(1, "MONGO_URI is required"),
  JWT_SECRET: z.string().min(10, "JWT_SECRET must be at least 10 characters"),

  // Split comma-separated strings into arrays of trimmed strings
  CLIENT_URLS: z
    .string()
    .transform((val) => val.split(",").map((url) => url.trim())),

  CORS_ORIGINS: z
    .string()
    .transform((val) => val.split(",").map((url) => url.trim())),
});

// 2. Run the validation.
// If ANY variable is missing or invalid, Zod throws a beautiful error immediately.
const parsedEnv = envSchema.parse(process.env);

// 3. Freeze the validated object and export it
const env = Object.freeze({
  NODE_ENV: parsedEnv.NODE_ENV,
  PORT: parsedEnv.PORT,
  DATABASE: {
    URI: parsedEnv.MONGO_URI,
  },
  AUTH: {
    JWT_SECRET: parsedEnv.JWT_SECRET,
  },
  clientUrls: parsedEnv.CLIENT_URLS,
  corsOrigins: parsedEnv.CORS_ORIGINS,
});

export default env;