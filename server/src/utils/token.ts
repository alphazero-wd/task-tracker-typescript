import { sign } from 'jsonwebtoken';
import { User } from '../models/User';

export const createAccessToken = (user: User) => {
  return sign({ userId: user.userId }, process.env.JWT_ACCESS_TOKEN_KEY!, {
    expiresIn: '1h',
  });
};

export const createRefreshToken = (user: User) => {
  return sign({ userId: user.userId }, process.env.JWT_REFRESH_TOKEN_KEY!, {
    expiresIn: '1h',
  });
};
