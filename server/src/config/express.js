import express from "express";

const configureExpress = () => {
  const app = express();

  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true }));

  return app;
};

export default configureExpress;
