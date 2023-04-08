const defaultLocale = process.env.LOCALE ?? 'uk';

module.exports = {
  defaultLocale: defaultLocale,
  locales: [defaultLocale],
  pages: {
    '*': ['notifications', 'menu'],
    '/': ['profile'],
    '/login': ['login'],
  },
};
