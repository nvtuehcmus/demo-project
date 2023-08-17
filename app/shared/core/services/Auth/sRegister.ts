import { rGetUserByUsername } from "shared/core/repo/Spin/rGetUser";
import {
  phoneValidation,
  prettierPhoneNumber,
} from "shared/helpers/phoneHelper";
import { LogError } from "shared/core/error/logError";
import { ErrorVars } from "shared/core/error/errorVars";
import { rInsertUser } from "shared/core/repo/Spin/rInsertUser";

export const sRegister = async (
  username: string,
  password: string
): Promise<void> => {
  let _username = username;

  if (phoneValidation(username)) {
    _username = prettierPhoneNumber(username);
  }

  const user = await rGetUserByUsername(_username);

  if (user) {
    throw new LogError(ErrorVars.E004_USER_EXISTS, "LOGIC");
  }

  await rInsertUser(_username, password);
};
