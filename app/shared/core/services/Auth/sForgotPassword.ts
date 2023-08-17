import { LogError } from 'shared/core/error/logError';
import { ErrorVars } from 'shared/core/error/errorVars';
import { lVerifyTokenOTP } from 'shared/core/libs/Twillio/lVerifyTokenOTP';
import { sSendToken } from 'shared/core/services/Auth/sSendToken';
import { rUpdateUserPassword } from 'shared/core/repo/Auth/rUpdateUserPassword';
import { userValidation } from 'shared/core/services/helpers/userValidation';
import jwt, { JwtPayload } from 'jsonwebtoken';
import process from 'process';

export const sRequestForgotPassword = async (username: string): Promise<void> => {
  const user = await userValidation(username);

  await sSendToken(user.username);
};

export const sVerifyForgotPasswordToken = async (username: string, otp: string): Promise<string> => {
  const user = await userValidation(username);

  const status = await lVerifyTokenOTP(`+${user.username}`, otp);

  if (status === 'pending') {
    throw new LogError(ErrorVars.E006_OPT_INVALID, 'LOGIC');
  }

  return jwt.sign(
    {
      id: user.id,
      username: user.username,
    },
    process.env.RESET_PASSWORD_TOKEN ?? '',
    { expiresIn: '15m' }
  );
};

export const sSetPassword = async (password: string, token: string): Promise<void> => {
  try {
    const payload = jwt.verify(token, process.env.RESET_PASSWORD_TOKEN ?? '');
    await rUpdateUserPassword((payload as JwtPayload).username, password);
  } catch (e) {
    throw new LogError(ErrorVars.E007_TOKEN_EXPIRED, 'LOGIC');
  }
};
