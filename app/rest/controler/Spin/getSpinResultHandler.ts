import { Index } from 'shared/core/context';
import express from 'express';
import { sGetSpin } from 'shared/core/services/Spin/sGetSpin';
import { responseSuccess } from 'rest/helper';
import { LogError } from 'shared/core/error/logError';
import { ErrorVars } from 'shared/core/error/errorVars';

export const getSpinResultHandler = async (
  ctx: Index,
  req: express.Request<{ sessionId?: string }>,
  res: express.Response
) => {
  if (!req.params.sessionId) {
    throw new LogError(ErrorVars.E008_SESSION_NOT_EXISTS, 'LOGIC');
  }

  let accessKey = '';
  if (req.headers.authorization) {
    accessKey = req.headers.authorization.split(' ')[1];
  }

  const result = await sGetSpin(req.params.sessionId, accessKey);
  responseSuccess(req, res, { id: result.id, name: result.name });
};
