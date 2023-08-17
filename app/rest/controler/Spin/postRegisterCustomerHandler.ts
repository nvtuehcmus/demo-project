import { Index } from 'shared/core/context';
import express from 'express';
import { LogError } from 'shared/core/error/logError';
import { ErrorVars } from 'shared/core/error/errorVars';
import { responseError, responseSuccess } from 'shared/core/context';
import { sCustomerRegister } from 'shared/core/services/Spin/sCustomerRegister';

export const postRegisterCustomerHandler = async (
  ctx: Index,
  req: express.Request<{ sessionId?: string }, any, { [key: string]: string | number }>,
  res: express.Response
) => {
  if (!req.params.sessionId) {
    throw new LogError(ErrorVars.E008_SESSION_NOT_EXISTS, 'LOGIC');
  }

  if (!req.body || (req.body && Object.keys(req.body).length === 0)) {
    responseError(new LogError(ErrorVars.E001_MISSING_DATA, 'LOGIC'), req, res);
    return;
  }
  const token = await sCustomerRegister(req.params.sessionId, req.body);

  responseSuccess(req, res, { token });
};
