import { Schema, model, Types } from "mongoose";

export interface ICommunity {
  _id: Types.ObjectId;
  title: string;
  images?: Array<string>;
  memebers?: Array<string>;
  status: boolean;
}

// create a schema
var communitySchema = new Schema<ICommunity>(
  {
    Title: { type: String, default: "", length: 60, require: true },
    images: {
      type: Array,
      default: [],
    },
    memebers: {
      type: Array,
      default: [],
    },
    status: { type: Boolean, default: true },
  },
  {
    // Automatically include createdAt and updatedAt field
    timestamps: true,
  }
);

var Community = model<ICommunity>("Community", communitySchema);

export default Community;
