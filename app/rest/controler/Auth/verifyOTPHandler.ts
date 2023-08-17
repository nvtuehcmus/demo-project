import express from 'express';
import { phoneValidation } from 'shared/helpers/phoneHelper';
import { emailValidation } from 'shared/helpers/emailHelper';
import { responseError, responseSuccess } from 'shared/core/context';
import { LogError } from 'shared/core/error/logError';
import { ErrorVars } from 'shared/core/error/errorVars';
import { Index } from 'shared/core/context';
import { sVerifyUserAccount } from 'shared/core/services/Auth/sVerifyUserAccount';

type VerifyPayload = {
  username: string;
  token: string;
};
export const verifyOTPHandler = async (
  ctx: Index,
  req: express.Request<any, any, VerifyPayload>,
  res: express.Response
) => {
  if (
    !req.body.username ||
    (req.body.username && !(phoneValidation(req.body.username) || emailValidation(req.body.username)))
  ) {
    responseError(new LogError(ErrorVars.E001_MISSING_DATA, 'LOGIC'), req, res);
    return;
  }

  if (!req.body.token || (req.body.token && req.body.token.length !== 6)) {
    responseError(new LogError(ErrorVars.E006_OPT_INVALID, 'LOGIC'), req, res);
    return;
  }
  if (phoneValidation(req.body.username)) {
    await sVerifyUserAccount(req.body.username, req.body.token);
  }

  responseSuccess(req, res, {}, true);
};
