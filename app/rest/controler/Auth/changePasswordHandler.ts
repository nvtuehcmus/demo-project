import express from 'express';
import { phoneValidation } from 'shared/helpers/phoneHelper';
import { emailValidation } from 'shared/helpers/emailHelper';
import { responseError, responseSuccess } from 'shared/core/context';
import { LogError } from 'shared/core/error/logError';
import { ErrorVars } from 'shared/core/error/errorVars';
import { Index } from 'shared/core/context';
import { sChangePassword } from 'shared/core/services/Auth/sChangePassword';

type ChangePasswordType = {
  username: string;
  oldPassword: string;
  newPassword: string;
};
export const changePasswordHandler = async (
  ctx: Index,
  req: express.Request<any, any, ChangePasswordType>,
  res: express.Response
) => {
  if (
    !req.body.username ||
    (req.body.username && !(phoneValidation(req.body.username) || emailValidation(req.body.username)))
  ) {
    responseError(new LogError(ErrorVars.E001_MISSING_DATA, 'LOGIC'), req, res);
    return;
  }

  if (!req.body.oldPassword || !req.body.newPassword) {
    responseError(new LogError(ErrorVars.E001_MISSING_DATA, 'LOGIC'), req, res);
    return;
  }

  if (!req.body.oldPassword.trim() || !req.body.newPassword.trim()) {
    responseError(new LogError(ErrorVars.E001_MISSING_DATA, 'LOGIC'), req, res);
    return;
  }

  await sChangePassword(req.body.username, req.body.oldPassword, req.body.newPassword);

  responseSuccess(req, res, {}, true);
};
