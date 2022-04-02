import { Request, Response } from "express";

import _ from "lodash";
import Community from "../models/Community";
import validateCommunity from "./validations/community/communityValidation";

export class CommunityController {
  public async createCommunity(req: Request, res: Response) {
    try {
      const payload = req.body;

      const { errors, isValid } = validateCommunity(payload);
      if (!isValid) {
        return res
          .status(400)
          .json({ status: false, message: "error", errors: errors });
      }
      const community = await Community.create(payload);
      return res.status(200).send({
        status: true,
        message: "Community create successfully.",
        data: community,
      });
    } catch (e) {
      return res.status(200).send({
        status: false,
        message: "Invalid Request.",
        data: [],
      });
    }
  }
}
