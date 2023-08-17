import { COLLECTION, DB } from "shared/types/db";
import { CUSTOMER } from "shared/types/modal";
import { toObjectId } from "shared/helpers/objectIdParser";
import { prettierPhoneNumber } from "shared/helpers/phoneHelper";

export const rGetCustomer = async (id: string): Promise<CUSTOMER | null> => {
  const connector = await global.db;
  const instance = connector.db(DB);
  const collection = instance.collection(COLLECTION.CUSTOMERS);

  const customer = await collection.findOne({ _id: toObjectId(id) });

  if (!customer) {
    return null;
  }

  return {
    id: customer._id.toString(),
    item: customer.item,
    limit: customer.limit,
  };
};

export const rGetCustomerSessionByPhone = async (
  sessionId: string,
  phoneNumber: string
) => {
  const connector = await global.db;
  const instance = connector.db(DB);
  const collection = instance.collection(COLLECTION.CUSTOMERS);

  const _phoneNumber = prettierPhoneNumber(phoneNumber);
  const customer = await collection.findOne({
    session_id: sessionId,
    phone_number: _phoneNumber,
  });

  if (!customer) {
    return null;
  }

  return {
    id: customer._id.toString(),
    item: customer.item,
    limit: customer.limit,
  };
};

export const rGetCustomerSessionByEmail = async (
  sessionId: string,
  email: string
) => {
  const connector = await global.db;
  const instance = connector.db(DB);
  const collection = instance.collection(COLLECTION.CUSTOMERS);

  const customer = await collection.findOne({
    session_id: sessionId,
    email: email,
  });

  if (!customer) {
    return null;
  }

  return {
    id: customer._id.toString(),
    item: customer.item,
    limit: customer.limit,
  };
};
