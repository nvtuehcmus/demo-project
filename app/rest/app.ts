import express from 'express';
import asyncHandler from 'express-async-handler';
import bodyParser from 'body-parser';

import { cors } from 'rest/config/cors';
import { apiLimiter } from 'rest/config/rateLimit';
import { loginHandler } from 'rest/controler/Auth/loginHandler';
import { context } from 'rest/middleware/context';
import { catchHandler } from 'rest/middleware/catchControler';
import { registerHandler } from 'rest/controler/Auth/registerHandler';
import { verifyOTPHandler } from 'rest/controler/Auth/verifyOTPHandler';
import { changePasswordHandler } from 'rest/controler/Auth/changePasswordHandler';
import {
  requestForgotPasswordHandler,
  setPasswordHandler,
  verifyForgotPasswordToken,
} from 'rest/controler/Auth/forgotPasswordHandler';
import { getSpinResultHandler } from 'rest/controler/Spin/getSpinResultHandler';
import { postRegisterCustomerHandler } from 'rest/controler/Spin/postRegisterCustomerHandler';
import { postCreateSessionHandler } from 'rest/controler/Spin/postCreateSessionHandler';

const app = express();

app.all('*', cors);
app.all('*', apiLimiter);
app.get('/v1/health', (req: express.Request, res: express.Response) => {
  res.send({ smg: 'live' });
});

app.post('/v1/login', context, bodyParser.json(), asyncHandler(catchHandler(loginHandler)));
app.post('/v1/register', context, bodyParser.json(), asyncHandler(catchHandler(registerHandler)));

app.post('/v1/verify-otp', context, bodyParser.json(), asyncHandler(catchHandler(verifyOTPHandler)));

app.post('/v1/change-password', context, bodyParser.json(), asyncHandler(catchHandler(changePasswordHandler)));

app.post('/v1/forgot-password', context, bodyParser.json(), asyncHandler(catchHandler(requestForgotPasswordHandler)));

app.post(
  '/v1/verify-forgot-password',
  context,
  bodyParser.json(),
  asyncHandler(catchHandler(verifyForgotPasswordToken))
);

app.post('/v1/set-password', context, bodyParser.json(), asyncHandler(catchHandler(setPasswordHandler)));

app.get('/v1/spin/:sessionId', context, bodyParser.json(), asyncHandler(catchHandler(getSpinResultHandler)));

app.post(
  '/v1/customer/:sessionId',
  context,
  bodyParser.json(),
  asyncHandler(catchHandler(postRegisterCustomerHandler))
);

app.post('/v1/session', context, bodyParser.json(), asyncHandler(catchHandler(postCreateSessionHandler)));

export default app;
