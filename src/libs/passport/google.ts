import Google from 'passport-google-oauth20';

import { getLoginSession } from '@/libs/auth-cookies';
import dbConnect from '@/libs/db';
import User from '@/models/User';

const options: Google.StrategyOptionsWithRequest = {
  passReqToCallback: true,
  clientID: process.env.GOOGLE_CLIENT_ID ?? '',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
  callbackURL: `${process.env.HOSTNAME}/api/auth/google/callback`,
  scope: ['profile', 'email'],
};

const googleStrategy = new Google.Strategy(options, async function (req, accessToken, refreshToken, profile, done) {
  await dbConnect();
  const session = await getLoginSession(req.cookies);
  const user = await User.findOne({ google: profile.id });

  if (!user && !session) {
    return done(null, undefined);
  }
  if (!user && session) {
    const activeUser = await User.findById(session.id);
    activeUser.google = profile.id;
    await activeUser.save();
    return done(null, activeUser);
  }
  if (user) {
    return done(null, user);
  }
});

export default googleStrategy;
