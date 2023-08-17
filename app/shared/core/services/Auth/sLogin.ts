import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { LogError } from "shared/core/error/logError";
import { ErrorVars } from "shared/core/error/errorVars";
import * as process from "process";
import { userValidation } from "shared/core/services/helpers/userValidation";

export const sLogin = async (
  username: string,
  password: string
): Promise<string> => {
  const user = await userValidation(username);

  if (!bcrypt.compareSync(password, user.password)) {
    throw new LogError(ErrorVars.E003_PASSWORD_NOT_CORRECT, "LOGIC");
  }

  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      active: user.active,
      role: "user",
    },
    process.env.SECRET_TOKEN ?? " "
  );
};
