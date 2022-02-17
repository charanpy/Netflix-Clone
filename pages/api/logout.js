import { removeTokenCookie } from '../../lib/cookies';
import { magicAdmin } from '../../lib/magic';
import { verifyToken } from '../../lib/utils';

const logout = async (req, res) => {
  try {
    if (!req.cookies.token)
      return res.status(401).json({ message: 'User is not logged in' });
    const token = req.cookies.token;

    const userId = await verifyToken(token);
    removeTokenCookie(res);

    await magicAdmin.users.logoutByIssuer(userId);

    res.writeHead(302, { Location: '/login' });
    res.end();
  } catch (error) {
    console.error({ error });
    res.status(401).json({ message: 'User is not logged in' });
  }
};

export default logout;
