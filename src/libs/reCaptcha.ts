import axios from 'axios';

export default async function verifyReCaptcha(token: string) {
  const secretKey = process.env.RECAPTHA_SECRET_KEY ?? '';

  const verificationUrl = 'https://www.google.com/recaptcha/api/siteverify?secret=' + secretKey + '&response=' + token;

  return await axios.post(verificationUrl);
}
