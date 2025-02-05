import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import type { User } from '@/app/lib/definitions';
import postgres from 'postgres';
import bcrypt from 'bcrypt';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'prefer' });

async function getUser(email: string): Promise<User | undefined> {
    try {
        const user = await sql<User[]>`
        SELECT * FROM users
        WHERE email=${email}
        `;
        return user[0];
    } catch (error) {
        console.error('Failed to fetch user: ', error);
        throw new Error('Failed to fetch user.');
    }
}

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    // only add credentials provider (login with a username and password)
    providers: [
        Credentials({
            async authorize(credentials) {
                // this function can be used to handle the authentication logic (similarly to Server Action)
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);

                    if (parsedCredentials.success) {
                        // successful zod data validation
                        const { email, password } = parsedCredentials.data;
                        const user = await getUser(email);
                        if (!user) {
                            // email not found
                            return null;
                        }

                        // if user was found, decrypt and validate their password
                        const passwordMatch = await bcrypt.compare(password, user.password);

                        if (passwordMatch) {
                            // user authenticated
                            return user;
                        }

                        console.log('Invalid credentials');
                        // prevents the user from logging in
                        return null;
                    }
                    return null;
            }
        })],
});