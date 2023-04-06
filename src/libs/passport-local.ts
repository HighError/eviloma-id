import bcrypt from 'bcryptjs';
import Local from 'passport-local';

import User from '@/models/User';

import dbConnect from './db';

export const localStrategy = new Local.Strategy(async function (username: string, password: string, done) {
  await dbConnect();
  const user = await User.findOne({ username }).select('+password');
  if (!user) {
    return done(Error('Невірний логін або пароль'));
  }

  const matchPassword = await bcrypt.compare(password, user.password);

  if (!matchPassword) {
    return done(Error('Невірний логін або пароль'));
  }

  return done(null, user);
});
