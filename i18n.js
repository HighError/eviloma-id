const defaultLocale = process.env.LOCALE ?? 'en';

module.exports = {
  defaultLocale: defaultLocale,
  locales: ['en', 'uk'],
  pages: {
    '*': ['notifications', 'menu', 'common', 'languages'],
    '/profile': ['profile'],
    '/login': ['login'],
    '/register': ['register'],
    '/services': ['services'],
    '/edit': ['edit'],
    '/connections': ['connections'],
    '/terms': ['terms'],
    '/': ['landing'],
  },
};
