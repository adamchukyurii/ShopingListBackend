import User from "../models/User.model.js";

import bcrypt from "bcryptjs";

export const userDao = {
  findByEmail: async (email) => await User.findOne({ email }),

  create: async ({ username, email, password }) => {
    const existingEmail = await userDao.findByEmail(email);
    if (existingEmail) throw new Error("Email already in use.");

    const existingUsername = await User.findOne({ username });
    if (existingUsername) throw new Error("Username is already taken.");

    const hashedPassword = await bcrypt.hash(password, 12);

    const inviteCode = Math.random().toString(36).substring(2, 8).toUpperCase();

    const user = new User({
      username,
      email,
      password: hashedPassword,
      inviteCode,
      ownedLists: [],
      sharedLists: [],
    });

    await user.save();

    return user;
  },

  validatePassword: async (user, password) => {
    return await bcrypt.compare(password, user.password);
  },
};
