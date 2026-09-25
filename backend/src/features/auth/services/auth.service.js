import jwt from "jsonwebtoken";
import env from "../../../config/env.js";
import { authRepository } from "../repository/auth.repository.js";
import { toUserResponseDTO } from "../../users/mappers/user.mapper.js";

export const authService = {
  login: async (email, plainPassword) => {
    // 1. Find user with email and password
    const user = await authRepository.findByEmailWithPassword(email);
    if (!user) {
      throw new Error("Credenciais inválidas"); // Don't reveal if user exists
    }

    // 2. Validate password using the model's method
    const isPasswordCorrect = await user.comparePassword(plainPassword);
    if (!isPasswordCorrect) {
      throw new Error("Credenciais inválidas");
    }

    // 3. Generate JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      env.AUTH.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // 4. Return token + sanitized user DTO
    return {
      token,
      user: toUserResponseDTO(user)
    };
  },
};