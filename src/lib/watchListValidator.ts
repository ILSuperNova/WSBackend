import Profanity from "profanity-js";
import { IPost } from "../models/Post";
import { sendEmail } from "./emailClient";
import { getModratorListForCommunity } from "./tools";
import WordList from "./watchListWords.json";

export const detectWatchListWords = async (post: IPost) => {
  // In real app we might load the words from DB
  const profanity = new Profanity("", { wordsList: WordList.words });
  if (
    profanity.isProfane(post.title) ||
    profanity.isProfane(post.body) ||
    profanity.isProfane(post.summary)
  ) {
    console.log("need to send post to modrator");
    const emailList = await getModratorListForCommunity(post.communityId);

    const postLink = `${process.env.FRONT_END_HOST_URL}/api/v1/post/approve/${post._id}`;

    sendEmail({
      to: emailList,
      subject: "New post needed your approval",
      body: `Hi please modarte this post: ${postLink}`,
    });
  } else {
    console.log("post is clean");
  }
};
