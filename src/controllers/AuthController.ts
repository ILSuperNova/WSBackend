import _ from "lodash";
import { Request, Response } from "express";
import Bcrypt from "bcryptjs";
import User from "../models/User";
import loginValidation from "./validations/auth/loginValidation";
import registrationValidation from "./validations/auth/registrationValidation";
import Helper from "../utils/helper";

export class AuthController {
  public async login(req: Request, res: Response) {
    try {
      const body = req.body;
      const { errors, isValid } = loginValidation(body);
      if (!isValid) {
        return res
          .status(400)
          .json({ status: false, message: "error", errors: errors });
      }
      const user = await User.findOne(
        { email: body.email },
        { createdAt: 0, updateAt: 0 }
      );
      if (user) {
        const passwordCheck = await Bcrypt.compare(
          body.password,
          user.password
        );
        if (passwordCheck) {
          const token = Helper.createJwtAuthToken(user);
          const users = await User.findOne(
            { _id: user._id },
            {
              createdAt: 0,
              updateAt: 0,
              roles: 0,
              password: 0,
              status: 0,
            }
          );

          return res.status(200).send({
            status: true,
            message: "Logged-in successfully.",
            data: { token, user: users },
          });
        } else {
          return res.status(200).send({
            status: false,
            message: "Wrong Password. Please try again.",
            data: {},
          });
        }
      } else {
        return res.status(200).send({
          status: false,
          message: "Login email not found. Please register.",
          data: {},
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(200).send({
        status: false,
        message: error.message,
        data: [],
      });
    }
  }

  public async signUp(req: Request, res: Response) {
    try {
      const body = req.body;
      const { errors, isValid } = registrationValidation(body);
      if (!isValid) {
        return res
          .status(400)
          .json({ status: false, message: "error", errors: errors });
      }
      let user = await User.findOne({ email: body.email });
      if (!user) {
        const salt = await Bcrypt.genSalt(10);
        body.password = await Bcrypt.hash(body.password, salt);
        user = await User.create(body);
        return res.status(200).send({
          status: true,
          message: "User created successfully.",
          data: _.pick(user, [
            "name",
            "userName",
            "email",
            "_id",
            "country",
            "title",
          ]),
        });
      } else {
        return res.status(200).send({
          status: false,
          message: "User already exists with this email address!!!",
          data: [],
        });
      }
    } catch (error) {
      return res.status(200).send({
        status: false,
        message: error.message,
        data: [],
      });
    }
  }
}
