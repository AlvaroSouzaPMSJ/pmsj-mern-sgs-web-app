import { authService } from "../services/auth.service.js";
import { loginSchema } from "../validations/auth.validation.js";

export const authController = {
  login: async (req, res, next) => {
    try {
      // 1. Validate request body
      const validatedData = loginSchema.parse(req.body);

      // 2. Call service
      const result = await authService.login(validatedData.email, validatedData.password);

      // 3. Return success
      return res.status(200).json({
        success: true,
        message: "Login realizado com sucesso!",
        token: result.token,
        user: result.user
      });
    } catch (error) {
      // If Zod validation fails, return 400
      if (error.name === "ZodError") {
        return res.status(400).json({
          success: false,
          errors: error.errors.map(e => e.message)
        });
      }
      // Pass other errors (invalid credentials) to global handler
      next(error);
    }
  },
};