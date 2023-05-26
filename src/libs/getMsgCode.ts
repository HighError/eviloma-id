import { Translate } from 'next-translate';

export default function getMessage(tNotification: Translate, code: string) {
  switch (code) {
    case 'DISCORD_SUCCESS':
      return tNotification('discordSuccessfullyConnected');
    case 'GOOGLE_SUCCESS':
      return tNotification('googleSuccessfullyConnected');
    case 'LOGIN_SUCCESS':
      return tNotification('loginSuccessful');
    default:
      return tNotification('notFound');
  }
}
