import { prettierPhoneNumber } from 'shared/helpers/phoneHelper';
import { lSendToken } from 'shared/core/libs/Twillio/lSendToken';

// {
//   sid: 'VE3f9adfa264b9dc9c6a089f5ef17ec5a6',
//       serviceSid: 'VAc07d3059f487f7924011a89114c90796',
//     accountSid: 'AC1f43ffc9fdbdd5bb4c0226ebb03da6a2',
//     to: '+84344465654',
//     channel: 'sms',
//     status: 'pending',
//     valid: false,
//     lookup: { carrier: null },
//   amount: null,
//       payee: null,
//     sendCodeAttempts: [
//   {
//     attempt_sid: 'VL2e4575ed874159f0550375b28a27d67c',
//     channel: 'sms',
//     time: '2023-03-24T11:11:42.545Z'
//   }
// ],
//     dateCreated: 2023-03-24T11:11:42.000Z,
//     dateUpdated: 2023-03-24T11:11:42.000Z,
//     sna: undefined,
//     url: 'https://verify.twilio.com/v2/Services/VAc07d3059f487f7924011a89114c90796/Verifications/VE3f9adfa264b9dc9c6a089f5ef17ec5a6'
// }

export const sSendToken = async (phoneNumber: string) => {
  const _phoneNumber = '+' + prettierPhoneNumber(phoneNumber);
  await lSendToken(_phoneNumber);
};
