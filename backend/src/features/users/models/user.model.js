import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { USER_ROLES } from "../constants/userRoles.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Nome é obrigatório"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "E-mail é obrigatório"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/.+\@.+\..+/, "Por favor, insira um e-mail válido"],
    },
    cpf: {
      type: String,
      required: [true, "CPF é obrigatório"],
      unique: true,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Telefone é obrigatório"],
      trim: true,
    },
    role: {
      type: String,
      required: [true, "Cargo é obrigatório"],
      enum: Object.values(USER_ROLES),
      required: true
    },
    password: {
      type: String,
      required: [true, "Senha é obrigatória"],
      minlength: [6, "A senha deve ter no mínimo 6 caracteres"],
      select: false,
    },
  },
  {
    timestamps: true,
  }
);


userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;