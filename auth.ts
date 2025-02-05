import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import type { User } from '@/app/lib/definitions';

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    // only add credentials provider (login with a username and password)
    providers: [
        Credentials({
            async authorize(credentials: Partial<Record<string | number, unknown>>, request: Request): Promise<User | null> {
                // this function can be used to handle the authentication logic (similarly to Server Action)
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);

                    return null;
            }
        })],
});