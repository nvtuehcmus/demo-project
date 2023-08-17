import express from "express";
import jwt from "jsonwebtoken";
export const postRegister = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    if (!req.headers.authorization) {
      return res.sendStatus(401);
    }
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.JWT_SECRET_TOKEN ?? ""
    );

    return next();
  } catch (error) {
    return res.sendStatus(403);
  }
};
