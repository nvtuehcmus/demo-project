import { LogError } from "shared/core/error/logError";
import { ErrorVars } from "shared/core/error/errorVars";
import { SESSION_PAYLOAD } from "rest/controler/Spin/postCreateSessionHandler";

export const prettierSessionPayload = (session: SESSION_PAYLOAD) => {
  const _session = JSON.parse(JSON.stringify(session));
  if (
    !_session.name ||
    !_session.items ||
    (_session.items && _session.items.length < 2)
  ) {
    throw new LogError(ErrorVars.E015_INVALID_DATA, "LOGIC");
  }

  if (!_session.limit) {
    _session.limit = 0;
  }

  let totalRatio = 0;
  for (let i = 0; i < _session.items.length; i += 1) {
    if (
      _session.items[i].ratio === undefined ||
      !_session.items[i].name ||
      _session.items[i].quantity === undefined
    ) {
      throw new LogError(ErrorVars.E015_INVALID_DATA, "LOGIC");
    }
    _session.items[i].id = i + 1;
    totalRatio += _session.items[i].ratio;
  }

  if (totalRatio > 1) {
    throw new LogError(ErrorVars.E015_INVALID_DATA, "LOGIC");
  }

  return _session;
};
