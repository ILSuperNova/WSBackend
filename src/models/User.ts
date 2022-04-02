import { Schema, model, Types } from "mongoose";

export interface IUser {
  _id: Types.ObjectId;
  email: string;
  password: string;
  dob: Date;
  phoneNumber: string;
  gender: string;
  role: string;
  images: Array<string>;
  communities: Array<string>;
  country: string;
  status: string;
}

const schema = new Schema<IUser>(
  {
    name: String,
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: String,
    dob: { type: Date },
    phoneNumber: String,
    gender: { type: String, enum: ["female", "male"], default: "male" },
    role: {
      type: String,
      enum: ["User", "moderator", "superModerator"],
      default: "User",
    },
    images: {
      type: Array,
      default: ["img/user_profile.png"],
    },
    country: { type: String, default: "USA" },
    communities: {
      type: Array,
      default: [],
    },
    status: { type: String, default: true },
    language: { type: String, default: "en" },
    lastLogin: { type: Date },
  },
  // this is for hide _v key form collection
  { timestamps: true, versionKey: false }
  // it create two timestamp field createAt and updateAt
);

export default model("User", schema);
