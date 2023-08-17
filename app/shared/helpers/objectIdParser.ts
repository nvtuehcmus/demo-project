import { ObjectId } from "mongodb";
import { LogError } from "shared/core/error/logError";
import { ErrorVars } from "shared/core/error/errorVars";

export const toObjectId = (id: string) => {
  try {
    return new ObjectId(id);
  } catch (e) {
    throw new LogError(ErrorVars.E014_ID_NOT_CORRECTLY, "LOGIC");
  }
};
