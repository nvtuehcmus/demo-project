import { CUSTOMER, ITEM } from "shared/types/modal";
import { COLLECTION, DB } from "shared/types/db";
import { toObjectId } from "shared/helpers/objectIdParser";

export const rUpdateSpinResult = async (
  result: ITEM,
  sessionId: string,
  customer: CUSTOMER | null = null
): Promise<boolean> => {
  const connector = await global.db;
  const instance = connector.db(DB);
  const session = connector.startSession();

  return new Promise((resolve, reject) => {
    session
      .withTransaction(
        async () => {
          if (result.quantity > 0) {
            const sessionCollection = instance.collection(COLLECTION.SESSIONS);
            await sessionCollection.updateOne(
              { _id: toObjectId(sessionId), "items.id": result.id },
              {
                $set: { "items.$.quantity": result.quantity - 1 },
              }
            );
          }

          if (customer && customer.limit > 0) {
            const customerCollection = instance.collection(
              COLLECTION.CUSTOMERS
            );
            await customerCollection.updateOne(
              { _id: toObjectId(customer.id) },
              {
                $set: { limit: customer.limit - 1, item: result.id },
              }
            );
          }
        },
        {
          readConcern: { level: "snapshot" },
          writeConcern: { w: "majority" },
        }
      )
      .then(() => {
        resolve(true);
      })
      .catch((e) => reject(e));
  });
};
