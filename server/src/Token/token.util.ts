import { HttpException } from '@/Exceptions/HttpException';
import HttpStatusCodes from '@/Utils/HttpStatusCodes';
import jwt from 'jsonwebtoken';
import UserToken from './token.model';
import { type ITokenPayload, ITokenService } from './token.interface';

export const generateTokens = async (tokenPayload: ITokenPayload): Promise<ITokenService> => {
  try {
    const payload = { _id: tokenPayload._id, roles: tokenPayload.role };
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_PRIVATE_KEY, { expiresIn: '14m' });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_PRIVATE_KEY, { expiresIn: '30d' });

    const userToken = await UserToken.findOne({ userId: tokenPayload._id });

    if (userToken) await userToken.remove();

    await new UserToken({ token: refreshToken, userId: tokenPayload._id }).save();
    return Promise.resolve({ accessToken, refreshToken });
  } catch (err) {
    if (err) throw new HttpException(HttpStatusCodes.INTERNAL_SERVER_ERROR, 'Cant Generate Token');
  }
};

export const verifyRefreshToken = refreshToken => {
  const privateKey = process.env.REFRESH_TOKEN_PRIVATE_KEY;

  return new Promise(resolve => {
    UserToken.findOne({ token: refreshToken }, (err, doc) => {
      if (!doc) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Invalid refresh token');
      jwt.verify(refreshToken, privateKey, (err, tokenDetails) => {
        if (err) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Invalid refresh token');

        resolve({
          error: false,
          message: 'Valid refresh token',
          tokenDetails,
        });
      });
    });
  });
};
