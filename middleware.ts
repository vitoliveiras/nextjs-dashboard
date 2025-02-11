// import NextAuth from 'next-auth';
// import { authConfig } from './auth.config';
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// export default NextAuth(authConfig).auth;

// export const config = {
//     // specifies that it should run on specific paths
//     matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
// };

// defines which rotes will be protected (all that init with /dashboard)
const isProtectedRoute = createRouteMatcher(['/dashboard(.*)']);

export default clerkMiddleware(async (auth, req) => {
    if (isProtectedRoute(req)) {
        auth.protect(); // redirect user to the login page
    }
});

export const config = {
    matcher: [
      // Skip Next.js internals and all static files, unless found in search params
      '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
      // Always run for API routes
      '/(api|trpc)(.*)',
    ],
  }