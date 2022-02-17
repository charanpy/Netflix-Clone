import { verifyToken } from '../lib/utils';

const redirectUser = async (token) => {
  const userId = await verifyToken(token);

  return { userId, token };
};

export default redirectUser;
