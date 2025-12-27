import { authABL } from "../abl/auth.abl.js";

export const authController = {
  register: async (req, res) => {
    try {
      const { user, token } = await authABL.register(req.body);
      res.status(201).json({
        success: true,
        data: { user, token },
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message,
        input: req.body,
      });
    }
  },
  login: async (req, res) => {
    try {
      const { user, token } = await authABL.login(req.body);
      res.status(201).json({
        success: true,
        data: { user, token },
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message,
        input: req.body,
      });
    }
  },
};
