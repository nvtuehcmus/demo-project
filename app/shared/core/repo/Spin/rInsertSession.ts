import { COLLECTION, DB } from "shared/types/db";
import { getCurrentUTC } from "shared/helpers/dateHelper";
import { SESSION_PAYLOAD } from "rest/controler/Spin/postCreateSessionHandler";

export const rInsertSession = async (
  session: SESSION_PAYLOAD,
  username: string
): Promise<void> => {
  const connector = await global.db;
  const instance = connector.db(DB);
  const collection = instance.collection(COLLECTION.SESSIONS);

  await collection.insertOne({
    items: session.items,
    archive: false,
    name: username,
    form: session.form,
    limit: session.limit,
    created_at: getCurrentUTC(),
  });
};
