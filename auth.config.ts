// next auth was replaced by clerk auth in this project

import type { NextAuthConfig } from 'next-auth';

// contains the configuration options for NextAuth.js
export const authConfig = {
    pages: {
        signIn: '/login', // redirect user to our custom login page, rather that the NextAuth.js default page
    },
    callbacks: {
        /* authorized callback is used to verify if the request is authorized to access a page with Next.js Middleware
        
        params:
            auth: contains the user's session
            request: contains the incoming request
        */ 
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');

            if (isOnDashboard) {
                if (isLoggedIn) return true;
                return false; // redirect unauthenticated users to login page
            } else if (isLoggedIn) {
                // user is logged but is not in the dashboard page: redirect them to the dashboard page
                return Response.redirect(new URL('/dashboard', nextUrl));
            }
            return true;
        }
    },
    // providers: list the different login options (google or social auth, etc)
    providers: [], // add providers with an empty array for now
} satisfies NextAuthConfig;