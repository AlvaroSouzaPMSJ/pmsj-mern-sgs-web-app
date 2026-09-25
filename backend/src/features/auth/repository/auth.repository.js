import User from "../../users/models/user.model.js";

export const authRepository = {
  findByEmailWithPassword: async (email) => {
    // .select('+password') is required because we set select: false in the model!
    return await User.findOne({ email }).select('+password');
  },
};