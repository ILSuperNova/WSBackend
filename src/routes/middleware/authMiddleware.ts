import { Request, Response } from "express";
import Helper from "../../utils/helper";

/**
 * @description JWT token validation
 * @param req
 * @param res
 * @param next
 * @returns success and error any encountered
 */
export const AuthMiddleware = (req: Request, res: Response, next) => {
  if (!req.headers.authorization) {
    res.status(401).send({ message: "Unauthorized access" });
  } else {
    try {
      const decoded = Helper.verifyToken(req.headers.authorization);
      res.locals.loggedInUser = decoded;
      next();
    } catch (err) {
      res.status(401).send(err.message);
    }
  }
};
