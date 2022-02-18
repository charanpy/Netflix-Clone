import { NextResponse } from 'next/server';
import { verifyToken } from '../lib/utils';

const middleware = async (req, ev) => {
  const token = req?.cookies?.token || '';

  const userId = await verifyToken(token);

  const { pathname } = req.nextUrl;

  if (
    (token && userId) ||
    pathname.includes('/api/login') ||
    pathname.includes('/static')
  ) {
    if (pathname === '/login') {
      const url = req.nextUrl.clone();
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  if (!token && pathname !== '/login') {
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }
};

export default middleware;
