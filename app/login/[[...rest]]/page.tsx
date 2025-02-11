import { SignIn } from '@clerk/nextjs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login'
}

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
        <SignIn />
    </main>
  );
}