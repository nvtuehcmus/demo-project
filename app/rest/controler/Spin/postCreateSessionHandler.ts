import { Index } from 'shared/core/context';
import express from 'express';
import { LogError } from 'shared/core/error/logError';
import { ErrorVars } from 'shared/core/error/errorVars';
import { sCreateSession } from 'shared/core/services/Spin/sCreateSession';
import jwt, { JwtPayload } from 'jsonwebtoken';
import process from 'process';
import { responseSuccess } from 'rest/helper';

export type SESSION_PAYLOAD = {
  limit: number | null;
  name: string;
  items: Array<{
    id?: number;
    name: string;
    ratio: number;
    quantity: number;
  }>;
  form?: Array<string>;
  archive?: boolean;
  created_by: string;
};

export const postCreateSessionHandler = async (
  ctx: Index,
  req: express.Request<any, any, { session: SESSION_PAYLOAD }>,
  res: express.Response
) => {
  if (!req.body.session || (req.body.session && Object.keys(req.body.session).length !== 3)) {
    throw new LogError(ErrorVars.E015_INVALID_DATA, 'LOGIC');
  }
  let accessKey = '';
  if (req.headers.authorization) {
    accessKey = req.headers.authorization.split(' ')[1];
  }

  const payload = jwt.verify(accessKey, process.env.SECRET_TOKEN ?? '');

  await sCreateSession(req.body.session, (payload as JwtPayload).username);

  responseSuccess(req, res, {}, true);
};
