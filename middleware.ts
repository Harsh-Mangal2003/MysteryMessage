import {NextRequest,NextResponse} from 'next/server'
import {getToken} from "next-auth/jwt"
export {default} from "next-auth/middleware" //default  mtlb sare jgh user hoga

export  async function middleware(request:NextRequest){

    const token =await getToken({req:request})
    const url = request.nextUrl
    if(token && (
        url.pathname.startsWith('/sign-in') ||
        url.pathname.startsWith('/sign-up') ||
        url.pathname.startsWith('/verify')||
        url.pathname.startsWith('/')

    )){


    return NextResponse.redirect(new URL('/dashboard',request.url))}
    if(!token && url.pathname.startsWith('/dashboard')){
        return NextResponse.redirect(new URL('/sign-in',request.url));
    }
    return NextResponse.next();
}

export const config={//batata hai ki khn khn middlewae chahiye
    matcher:[
        '/sign-in',
        '/sign-up',
        '/',
        '/dashboard/:path*',
        '/verify/:path*'
    ]
}
// src/middleware.ts

