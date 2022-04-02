import User from "../models/User";

export const getModratorListForCommunity = async (
  communityId: string
): Promise<Array<string>> => {
  console.log("getModratorListForCommunity", communityId);
  const users = await User.find(
    { communities: `${communityId}`, role: { $ne: "User" } },
    { email: 1 }
  );
  const emails = users.map((v) => v.email);
  return emails;
};
