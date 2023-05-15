import Discord from 'passport-discord';

import { getLoginSession } from '@/libs/auth';
import User from '@/models/User';

import dbConnect from './db';

const scopes = ['identify', 'connections'];

const options: Discord.StrategyOptionsWithRequest = {
  passReqToCallback: true,
  clientID: process.env.DISCORD_CLIENT_ID ?? '',
  clientSecret: process.env.DISCORD_CLIENT_SECRET ?? '',
  callbackURL: `${process.env.HOSTNAME}/api/auth/discord/callback`,
  scope: scopes,
};

export const discordStrategy = new Discord.Strategy(options, async function (
  req,
  accessToken,
  refreshToken,
  profile,
  done
) {
  await dbConnect();
  const session = await getLoginSession(req);
  const user = await User.findOne({ discord: profile.id });

  if (!user && !session) {
    return done(null, undefined);
  }
  if (!user && session) {
    const activeUser = await User.findById(session.id);
    activeUser.discord = profile.id;
    await activeUser.save();
    return done(null, activeUser);
  }
  if (user) {
    return done(null, user);
  }
});
