import { COLLECTION, DB } from "shared/types/db";
import { SESSION } from "shared/types/modal";
import { toObjectId } from "shared/helpers/objectIdParser";

export const rGetSession = async (
  sessionId: string
): Promise<SESSION | null> => {
  const connector = await global.db;
  const instance = connector.db(DB);
  const collection = instance.collection(COLLECTION.SESSIONS);

  const session = await collection.findOne({
    _id: toObjectId(sessionId),
  });

  if (!session) {
    return null;
  }

  return {
    id: session._id.toString(),
    items: session.items,
    archive: session.archive,
    name: session.name,
    createdBy: session.created_by,
    form: session.form,
    limit: session.limit,
  };
};
