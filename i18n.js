const defaultLocale = process.env.LOCALE ?? 'uk';

module.exports = {
  defaultLocale: defaultLocale,
  locales: [defaultLocale],
  pages: {
    '*': ['notifications', 'menu', 'common'],
    '/': ['profile'],
    '/login': ['login'],
    '/services': ['services'],
  },
};
