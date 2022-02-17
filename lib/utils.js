import jwt from 'jsonwebtoken';

export async function verifyToken(token) {
  if (!token) return '';
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const userId = decoded?.issuer || '';

  return userId;
}
