export default function getLanguageCode(code: string): string {
  switch (code) {
    case 'en':
      return 'uk';
    case 'uk':
      return 'ua';
    default:
      return code;
  }
}
