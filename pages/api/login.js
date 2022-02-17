import { magicAdmin } from '../../lib/magic';
import jwt from 'jsonwebtoken';
import { isNewUser, createNewUser } from '../../lib/db/hasura';
import { setTokenCookie } from '../../lib/cookies';

const login = async (req, res) => {
  try {
    if (req.method !== 'POST')
      return res.status(400).json({ message: 'Invalid method' });

    const auth = req?.headers?.['authorization'];
    const didToken = auth ? auth.substr(7) : '';

    const metaData = await magicAdmin.users.getMetadataByToken(didToken);

    const token = jwt.sign(
      {
        ...metaData,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000 + 7 * 24 * 60 * 60),
        'https://hasura.io/jwt/claims': {
          'x-hasura-allowed-roles': ['user', 'admin'],
          'x-hasura-default-role': 'user',
          'x-hasura-user-id': metaData.issuer,
        },
      },
      process.env.JWT_SECRET
    );

    const isNewUserQuery = await isNewUser(metaData.issuer, token);

    !isNewUserQuery &&
      (await createNewUser(
        metaData.email,
        metaData.issuer,
        metaData.publicAddress,
        token
      ));

    setTokenCookie(token, res);
    return res.status(200).json({
      metaData,
      isNewUserQuery,
      done: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Something went wrong',
      done: false,
    });
  }
};

export default login;
