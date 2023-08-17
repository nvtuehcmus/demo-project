import { Index } from 'shared/core/context';
import express from 'express';
import { phoneValidation } from 'shared/helpers/phoneHelper';
import { emailValidation } from 'shared/helpers/emailHelper';
import { responseError, responseSuccess } from 'shared/core/context';
import { LogError } from 'shared/core/error/logError';
import { ErrorVars } from 'shared/core/error/errorVars';
import {
  sRequestForgotPassword,
  sSetPassword,
  sVerifyForgotPasswordToken,
} from 'shared/core/services/Auth/sForgotPassword';

export const requestForgotPasswordHandler = async (
  ctx: Index,
  req: express.Request<any, any, { username: string }>,
  res: express.Response
) => {
  if (
    !req.body.username ||
    (req.body.username && !(phoneValidation(req.body.username) || emailValidation(req.body.username)))
  ) {
    responseError(new LogError(ErrorVars.E001_MISSING_DATA, 'LOGIC'), req, res);
    return;
  }

  await sRequestForgotPassword(req.body.username);

  responseSuccess(req, res, {}, true);
};

export const verifyForgotPasswordToken = async (
  ctx: Index,
  req: express.Request<any, any, { username: string; otp: string }>,
  res: express.Response
) => {
  if (
    !req.body.username ||
    (req.body.username && !(phoneValidation(req.body.username) || emailValidation(req.body.username)))
  ) {
    responseError(new LogError(ErrorVars.E001_MISSING_DATA, 'LOGIC'), req, res);
    return;
  }

  const token = await sVerifyForgotPasswordToken(req.body.username, req.body.otp);

  responseSuccess(req, res, { token });
};

export const setPasswordHandler = async (
  ctx: Index,
  req: express.Request<any, any, { password: string }, { token?: string }>,
  res: express.Response
) => {
  if (!req.body.password || !req.query.token) {
    responseError(new LogError(ErrorVars.E001_MISSING_DATA, 'LOGIC'), req, res);
    return;
  }

  await sSetPassword(req.body.password, req.query.token);

  responseSuccess(req, res, {}, true);
};
