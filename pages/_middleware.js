import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

// protect routes
export async function middleware(req) {
    console.log('I triggered the middleware');
    // token will exist if the user is logged in
    const token = await getToken({ req, secret: process.env.JWT_SECRET });

    const { pathname } = req.nextUrl;

    // Allow the request if the following is true
    // 1) the token exists
    // 2) the token exists
    if (pathname.includes('/api/auth') || token) {
        return NextResponse.next();
    }

    // Redirect them to login if they don't have token AND are requesting protected route
    if (!token && pathname !== '/login') {
        const url = req.nextUrl.clone();
        url.pathname = '/login';
        return NextResponse.redirect(url);
    }
}
