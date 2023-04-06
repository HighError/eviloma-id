function getCallbackErrorMessage(callback_error: string): string {
  switch (callback_error) {
    case 'discord':
      return 'Користувача з таким Discord не знайдено';
    default:
      return 'Невідома помилка';
  }
}

export default getCallbackErrorMessage;
