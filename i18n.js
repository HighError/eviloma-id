const defaultLocale = process.env.LOCALE ?? 'en';

module.exports = {
  defaultLocale: defaultLocale,
  locales: [defaultLocale],
  pages: {
    '*': ['notifications', 'menu', 'common'],
    '/': ['profile'],
    '/login': ['login'],
    '/register': ['register'],
    '/services': ['services'],
    '/edit': ['edit'],
  },
};
