import { HttpException } from '@/Exceptions/HttpException';
import HttpStatusCodes from '@/Utils/HttpStatusCodes';
import { sign, verify } from 'jsonwebtoken';
import UserToken from './token.model';
import { type ITokenPayload, ITokenService } from './token.interface';
import { ACCESS_TOKEN_PRIVATE_KEY, REFRESH_TOKEN_PRIVATE_KEY } from '@/Config/index';
import { findUserModelByRole } from '@/User/user.util';

export const generateTokens = async (tokenPayload: ITokenPayload): Promise<ITokenService> => {
  try {
    const accessToken = sign(tokenPayload, ACCESS_TOKEN_PRIVATE_KEY, { expiresIn: '14m' });
    const refreshToken = sign(tokenPayload, REFRESH_TOKEN_PRIVATE_KEY, { expiresIn: '30d' });

    const userToken = await UserToken.findOne({ userId: tokenPayload._id });

    if (userToken) await userToken.remove();
    // we save refresh token into the Database
    await new UserToken({ token: refreshToken, userId: tokenPayload._id }).save();
    return { accessToken, refreshToken };
  } catch (err) {
    if (err) throw new HttpException(HttpStatusCodes.INTERNAL_SERVER_ERROR, 'Cant Generate Token');
  }
};

export const verifyRefreshToken = (refreshToken: string) => {
  const privateKey = REFRESH_TOKEN_PRIVATE_KEY;

  const findUser = UserToken.findOne({ token: refreshToken });
  if (!findUser) throw new HttpException(HttpStatusCodes.FORBIDDEN, 'FORBIDDEN : Invalid Refresh Token');

  return verify(refreshToken, privateKey, (err, tokenDetails) => {
    if (err) throw new HttpException(HttpStatusCodes.FORBIDDEN, 'FORBIDDEN : Invalid Refresh Token');
    const { _id, role } = tokenDetails as ITokenPayload;
    const userModel = findUserModelByRole(role);
    const findUser = userModel.findOne({ _id });
    if (!findUser) throw new HttpException(HttpStatusCodes.FORBIDDEN, 'FORBIDDEN : Invalid Refresh Token');
    const accessToken = sign(
      {
        _id,
        role,
      },
      ACCESS_TOKEN_PRIVATE_KEY,
      { expiresIn: '14m' },
    );
    return accessToken;
  });
};
