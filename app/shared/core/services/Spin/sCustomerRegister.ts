// sessionId, uId

import { rGetSession } from "shared/core/repo/Spin/rGetSession";
import { LogError } from "shared/core/error/logError";
import { ErrorVars } from "shared/core/error/errorVars";
import { emailValidation } from "shared/helpers/emailHelper";
import { phoneValidation } from "shared/helpers/phoneHelper";
import { rInsertCustomer } from "shared/core/repo/Spin/rInsertCustomer";
import jwt from "jsonwebtoken";
import process from "process";
import {
  rGetCustomerSessionByEmail,
  rGetCustomerSessionByPhone,
} from "shared/core/repo/Spin/rGetCustomer";

export const sCustomerRegister = async (
  sessionId: string,
  form: { [key: string]: string | number }
): Promise<string> => {
  const session = await rGetSession(sessionId);
  if (!session) {
    throw new LogError(ErrorVars.E008_SESSION_NOT_EXISTS, "LOGIC");
  }

  const formKeys = Object.keys(form);

  if (formKeys.length !== session.form.length) {
    throw new LogError(ErrorVars.E001_MISSING_DATA, "LOGIC");
  }

  for (const key of session.form) {
    if (!formKeys.includes(key)) {
      throw new LogError(ErrorVars.E001_MISSING_DATA, "LOGIC");
    }
  }

  if (form.email && !emailValidation(form.email as string)) {
    throw new LogError(ErrorVars.E012_EMAIL_INVALID, "LOGIC");
  }

  if (form.phone_number && !phoneValidation(form.phone_number as string)) {
    throw new LogError(ErrorVars.E013_PHONE_INVALID, "LOGIC");
  }

  if (
    form.phone_number &&
    (await rGetCustomerSessionByPhone(
      sessionId,
      form.phone_number as string
    )) !== null
  ) {
    throw new LogError(ErrorVars.E004_USER_EXISTS, "LOGIC");
  }

  if (
    form.email &&
    (await rGetCustomerSessionByEmail(sessionId, form.email as string)) !== null
  ) {
    throw new LogError(ErrorVars.E004_USER_EXISTS, "LOGIC");
  }

  const id = await rInsertCustomer(sessionId, session.limit, form);

  return jwt.sign(
    {
      uId: id,
      sessionId: sessionId,
      role: "c",
    },
    process.env.SECRET_TOKEN ?? " "
  );
};
