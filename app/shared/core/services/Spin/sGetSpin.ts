import { rGetSession } from "shared/core/repo/Spin/rGetSession";
import { LogError } from "shared/core/error/logError";
import { ErrorVars } from "shared/core/error/errorVars";
import jwt from "jsonwebtoken";
import process from "process";
import { randomItem } from "shared/helpers/randomHelper";
import { rGetCustomer } from "shared/core/repo/Spin/rGetCustomer";
import { rUpdateSpinResult } from "shared/core/repo/Spin/rUpdateSpinResult";
import { ITEM } from "shared/types/modal";

export const sGetSpin = async (
  sessionId: string,
  accessKey?: string
): Promise<{ name: string; id: number }> => {
  const session = await rGetSession(sessionId);

  if (!session) {
    throw new LogError(ErrorVars.E008_SESSION_NOT_EXISTS, "LOGIC");
  }

  if (session.archive) {
    throw new LogError(ErrorVars.E010_SESSION_ARCHIVE, "LOGIC");
  }

  if (session.form && session.form.length > 0) {
    if (!accessKey) {
      throw new LogError(ErrorVars.E009_NOT_PERMISSION, "AUTHORISATION");
    }

    const payload = jwt.verify(accessKey, process.env.SECRET_TOKEN ?? "");

    if ((payload as jwt.JwtPayload)?.sessionId !== sessionId) {
      throw new LogError(ErrorVars.E009_NOT_PERMISSION, "AUTHORISATION");
    }

    const customer = await rGetCustomer((payload as jwt.JwtPayload)?.uId);
    if (!customer) {
      throw new LogError(ErrorVars.E002_USER_NOT_EXISTS, "LOGIC");
    }

    if (!customer.limit) {
      throw new LogError(ErrorVars.E011_NO_CHANCE, "LOGIC");
    }

    const result: ITEM = randomItem(session.items);

    await rUpdateSpinResult(result, sessionId, customer);

    return {
      name: result.name,
      id: result.id,
    };
  }

  const result: ITEM = randomItem(session.items);

  await rUpdateSpinResult(result, sessionId);

  return {
    name: result.name,
    id: result.id,
  };
};
