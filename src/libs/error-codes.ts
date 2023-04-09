import { Translate } from 'next-translate';

export default function getErrorMessage(tNotification: Translate, code: string) {
  switch (code) {
    case 'ERR_DISCORD_BOT_FOUND':
      return tNotification('discordAccountNotFound');
    case 'ERR_INVALID_LOGIN_OR_PASSWORD':
      return tNotification('invalidLoginOrPassword');
    case 'ERR_MISSING_PARAMS':
      return tNotification('paramsMissing');
    case 'ERR_LOGIN_EXISTS':
      return tNotification('registerLoginExists');
    case 'ERR_PASSWORD_EXISTS':
      return tNotification('registerEmailExists');
    case 'ERR_UNKNOWN':
      return tNotification('unknownError');
    case 'ERR_INVALID_ID':
      return tNotification('invalidId');
    case 'ERR_SERVER':
      return tNotification('serverError');
    default:
      return tNotification('notFound');
  }
}
