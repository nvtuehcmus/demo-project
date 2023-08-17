import { emailValidation } from "shared/helpers/emailHelper";
import { prettierPhoneNumber } from "shared/helpers/phoneHelper";
import { rGetUserByUsername } from "shared/core/repo/Spin/rGetUser";
import { LogError } from "shared/core/error/logError";
import { ErrorVars } from "shared/core/error/errorVars";

export const userValidation = async (username: string) => {
  if (!emailValidation(username)) {
    username = prettierPhoneNumber(username);
  }

  const user = await rGetUserByUsername(username);

  if (!user) {
    throw new LogError(ErrorVars.E002_USER_NOT_EXISTS, "LOGIC");
  }
  if (!user.active) {
    throw new LogError(ErrorVars.E005_USER_PENDING, "LOGIC");
  }

  return user;
};
