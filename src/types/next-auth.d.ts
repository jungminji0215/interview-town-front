import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    nickname: string;
  }

  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      nickname: string;
    };
  }

  interface JWT {
    id: string;
    nickname: string;
  }
}
