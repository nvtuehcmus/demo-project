import { COLLECTION, DB } from "shared/types/db";
import { USERS } from "shared/types/modal";

export const rGetUserByUsername = async (
  username: string
): Promise<USERS | null> => {
  const connector = await global.db;
  const instance = connector.db(DB);
  const collection = instance.collection(COLLECTION.USERS);

  const user = await collection.findOne({ username: username });

  if (!user) {
    return null;
  }

  return {
    id: user._id.toString(),
    username: user.username,
    password: user.password,
    active: user.active,
  };
};
