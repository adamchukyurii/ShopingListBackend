import jwt from "jsonwebtoken";

import { userDao } from "../dao/User.dao.js";

const JWT_SECRET = process.env.JWT_SECRET;

export const authABL = {
  register: async ({ username, email, password }) => {
    if (!username || !email || !password)
      throw new Error("All fields required!");
    if (password.length < 8)
      throw new Error("Password should contain 8 characters");

    const user = await userDao.create({ username, email, password });

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "7d",
    });

    return { user, token };
  },
  login: async ({ email, password }) => {
    console.log(typeof email, email, password);
    if (!email || !password) throw new Error("All fields required!");

    const user = await userDao.findByEmail(email);
    if (!user) throw new Error("Invalid credentials");

    const isValid = await userDao.validatePassword(user, password);
    if (!isValid) throw new Error("Invalid password");

    const token = jwt.sign({ id: user._id, email: email }, JWT_SECRET, {
      expiresIn: "7d",
    });

    return { user, token };
  },
};
