import { prettierPhoneNumber } from 'shared/helpers/phoneHelper';
import { lVerifyTokenOTP } from 'shared/core/libs/Twillio/lVerifyTokenOTP';
import { rActiveStatus } from 'shared/core/repo/Auth/rActiveUser';
import { LogError } from 'shared/core/error/logError';
import { ErrorVars } from 'shared/core/error/errorVars';

export const sVerifyUserAccount = async (phoneNumber: string, token: string): Promise<void> => {
  const _phoneNumber = prettierPhoneNumber(phoneNumber);
  const status = await lVerifyTokenOTP(`+${_phoneNumber}`, token);

  if (status === 'pending') {
    throw new LogError(ErrorVars.E006_OPT_INVALID, 'LOGIC');
  }

  await rActiveStatus(_phoneNumber);
};
