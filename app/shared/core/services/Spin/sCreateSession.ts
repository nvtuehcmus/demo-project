import { SESSION_PAYLOAD } from "rest/controler/Spin/postCreateSessionHandler";
import { prettierSessionPayload } from "shared/helpers/sessionHelper";
import { rInsertSession } from "shared/core/repo/Spin/rInsertSession";

export const sCreateSession = async (
  session: SESSION_PAYLOAD,
  username: string
) => {
  const _session = prettierSessionPayload(session);

  await rInsertSession(_session, username);
};
