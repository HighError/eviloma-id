import passport from '@/libs/passport';

passport.initialize();

export default passport.authenticate('google');
