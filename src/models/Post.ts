import { Schema, model, Types } from "mongoose";

export interface IPost {
  _id: Types.ObjectId;
  title: string;
  userId: Types.ObjectId;
  communityId: Types.ObjectId;
  summary: string;
  body: string;
  country: string;
  likes: Array<Types.ObjectId>;
  status: string;
  score?: number;
}

// create a schema
const postSchema = new Schema<IPost>(
  {
    title: { type: String, default: "", length: 60, require: true },
    userId: { type: Schema.ObjectId, ref: "User", require: true },
    communityId: { type: Schema.ObjectId, ref: "Community", require: true },
    summary: { type: String, default: "" },
    body: { type: String, default: "", require: true },
    country: { type: String, default: "", require: true },
    likes: {
      type: Array,
      default: [],
    },
    status: { type: String, enum: ["Pending", "Approved"], default: "Pending" },
  },
  {
    // Automatically include createdAt and updatedAt field
    timestamps: true,
    versionKey: false,
  }
);

export default model<IPost>("Post", postSchema);
