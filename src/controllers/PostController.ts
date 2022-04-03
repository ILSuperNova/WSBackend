import Post, { IPost } from "../models/Post";
import { Request, Response } from "express";
import mongoose from "mongoose";
import _ from "lodash";
import validatePost from "./validations/post/postValidation";
import User, { IUser } from "../models/User";
import helper from "../utils/helper";
import { detectWatchListWords } from "../lib/watchListValidator";

export class PostController {
  public async createPost(req: Request, res: Response) {
    try {
      const payload = req.body;
      // validate post data
      const { errors, isValid } = validatePost(payload);
      if (!isValid) {
        return res
          .status(400)
          .json({ status: false, message: "error", errors: errors });
      }
      //load user object
      const userId = res.locals.loggedInUser._id;
      const user: IUser = await User.findOne(
        { _id: userId },
        {
          createdAt: 0,
          updatedAt: 0,
          roles: 0,
          password: 0,
          status: 0,
        }
      );

      if (!user) {
        return res
          .status(500)
          .json({ status: false, message: "User not found - internal error" });
      }

      // validate that the user is register in this community
      const index = _.indexOf(user.communities, payload.communityId);

      if (index < 0) {
        return res
          .status(400)
          .json({ status: false, message: "User is not community memebr" });
      }

      //copy user country to post payload

      const postData: IPost = {
        ...payload,
        country: user.country,
        userId: user._id,
      };

      if (!postData.summary) {
        postData.summary = helper.getFirstNWords(postData.body, 100);
      }

      const post = await Post.create(postData);

      //start words check id diffrent "thread"
      setTimeout(() => {
        detectWatchListWords(post);
      }, 10);

      return res.status(200).send({
        status: true,
        message: "Post create successfully.",
        data: post,
      });
    } catch (e) {
      return res.status(200).send({
        status: false,
        message: "Invalid Request.",
        data: e,
      });
    }
  }

  public async getFeed(req: Request, res: Response) {
    const userId = res.locals.loggedInUser._id;
    console.log("userId", userId);
    const user: IUser = await User.findOne(
      { _id: userId },
      {
        communities: 1,
        country: 1,
      }
    );

    if (!user) {
      return res
        .status(500)
        .json({ status: false, message: "User not found - internal error" });
    }

    //need to add filter for post status and pagnation
    const posts = await Post.find({
      userId: { $ne: userId },
      communityId: { $in: user.communities },
    });

    //sort post by relevance
    for (let index = 0; index < posts.length; index++) {
      const post: IPost = posts[index];
      let weightedScore = post.country == user.country ? 1000 : 0;
      weightedScore += post.likes.length * 0.8;
      weightedScore += post.body.length * 0.2;
      post.score = weightedScore;
    }

    posts.sort((a, b) => b.score - a.score);

    return res.status(200).send({
      status: true,
      message: `Posts:${posts.length}`,
      data: posts,
    });
  }
}
