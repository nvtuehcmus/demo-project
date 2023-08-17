import { COLLECTION, DB } from "shared/types/db";
import { prettierPhoneNumber } from "shared/helpers/phoneHelper";

export const rInsertCustomer = async (
  sessionId: string,
  limit: number,
  form: { [key: string]: string | number }
): Promise<string> => {
  const connector = await global.db;
  const instance = connector.db(DB);
  const collection = instance.collection(COLLECTION.CUSTOMERS);

  const document: { [key: string]: string | number | null } = {
    limit: limit,
    session_id: sessionId,
    item: null,
  };
  for (const key in form) {
    if (key === "phone_number") {
      document[key] = prettierPhoneNumber(form[key] as string);
      continue;
    }
    document[key] = form[key];
  }

  const result = await collection.insertOne(document);

  return result.insertedId.toString();
};
