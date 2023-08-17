import { COLLECTION } from 'shared/types/db';
import { usersSeeding } from 'rest/tests/seed/users';
import { sessionsSeeding } from 'rest/tests/seed/sessions';
import { customersSeeding } from 'rest/tests/seed/customers';

const initDB = async (): Promise<void> => {
  const connector = global.db;
  const instance = connector.db(process.env.DB);
  await Promise.all([
    instance.dropCollection(COLLECTION.USERS),
    instance.dropCollection(COLLECTION.CUSTOMERS),
    instance.dropCollection(COLLECTION.SESSIONS),
  ]);

  await Promise.all([
    instance.createCollection(COLLECTION.USERS),
    instance.createCollection(COLLECTION.CUSTOMERS),
    instance.createCollection(COLLECTION.SESSIONS),
  ]);

  await Promise.all([usersSeeding(instance), sessionsSeeding(instance)]);
  await customersSeeding(instance);
};

beforeAll(async () => {
  // await initDB();
});
