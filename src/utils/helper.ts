import _ from "lodash";
import Jwt from "jsonwebtoken";

const randomString = (length) => {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
};
const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
};

const createJwtAuthToken = (user) => {
  const contents = {
    _id: _.get(user, "_id", ""),
    name: _.get(user, "name", ""),
    createdAt: Date.now(),
  };
  const options = {
    key: "JWT_TOKEN_KEY",
    expires: "1y",
    verifyOptions: { algorithms: ["HS256"] },
  };

  const token = Jwt.sign(contents, options.key, {
    algorithm: options.verifyOptions.algorithms[0],
    expiresIn: options.expires,
  });

  return token;
};

const verifyToken = (token: string) => {
  try {
    console.log(token);
    const decodedToken = Jwt.verify(
      token.replace("Bearer ", ""),
      "JWT_TOKEN_KEY"
    );
    return decodedToken;
  } catch (error) {
    console.log({ error });
    throw error;
  }
};

const getFirstNWords = (str: string, n: number) => {
  return str.split(" ").slice(0, n).join(" ");
};

const helper = {
  randomString,
  isEmpty,
  createJwtAuthToken,
  verifyToken,
  getFirstNWords,
};
export default helper;
