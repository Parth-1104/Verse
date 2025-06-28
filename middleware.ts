import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { AUTH_ROUTES, NON_AUTH_ROUTES } from "./routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    const isAuthRoute = AUTH_ROUTES.includes(nextUrl.pathname);
    const isNonAuthRoute = NON_AUTH_ROUTES.includes(nextUrl.pathname);

    if (isAuthRoute && !isLoggedIn) {
        return Response.redirect(new URL('/login', nextUrl));
    } 
    if (isNonAuthRoute && isLoggedIn) {
        return Response.redirect(new URL('/', nextUrl));
    } 
})

export const config = {
    matcher: [
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        '/(api|trpc)(.*)',
        '/'
    ],
}