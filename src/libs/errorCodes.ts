import { Translate } from 'next-translate';

export default function getErrorMessage(tNotification: Translate, code: string) {
  switch (code) {
    case 'ERR_DISCORD_ACCOUNT_NOT_FOUND':
      return tNotification('discordAccountNotFound');
    case 'ERR_GOOGLE_ACCOUNT_NOT_FOUND':
      return tNotification('googleAccountNotFound');
    case 'ERR_INVALID_LOGIN_OR_PASSWORD':
      return tNotification('invalidLoginOrPassword');
    case 'ERR_MISSING_PARAMS':
      return tNotification('paramsMissing');
    case 'ERR_LOGIN_EXISTS':
      return tNotification('registerLoginExists');
    case 'ERR_EMAIL_EXISTS':
      return tNotification('registerEmailExists');
    case 'ERR_UNKNOWN':
      return tNotification('unknownError');
    case 'ERR_INVALID_ID':
      return tNotification('invalidId');
    case 'ERR_SERVER':
      return tNotification('serverError');
    case 'ERR_LOGIN_ALREADY_EXISTS':
      return tNotification('loginAlreadyExists');
    case 'ERR_WRONG_PASSWORD':
      return tNotification('wrongPassword');
    case 'ERR_PASSWORD_MISMATCH':
      return tNotification('mismatchPassword');
    case 'ERR_INVALID_CAPTCHA':
      return tNotification('invalidCaptcha');
    default:
      return tNotification('notFound');
  }
}
