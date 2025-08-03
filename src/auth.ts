import NextAuth, { CredentialsSignin } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { ROUTES } from '@/constants/routes';

// TODO 로그인 시 서버 ..
export const {
  handlers: { GET, POST },
  auth,
  signIn, // 로그인 하는 함수
} = NextAuth({
  // 직접 만든 페이지 등록
  pages: {
    signIn: ROUTES.SIGN_IN,
    newUser: ROUTES.SIGN_UP, // 회원 가입 페이지
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const response: Response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/signin`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: credentials.username,
            password: credentials.password,
          }),
        });

        // 로그인 실패를 여기서 잡아주기
        if (!response.ok) {
          const credentialsSignin = new CredentialsSignin();
          credentialsSignin.code = 'invalid_credentials';
          throw credentialsSignin;
        }

        const user = await response.json();

        console.log('login user : ', user);

        // 여기서 return 한 user 정보가 auth.js가 누가 로그인했는데 가져온다.
        return {
          id: user.id,
          name: user.nickname,
          ...user,
        };
      },
    }),
  ],

  //  TODO 왜?
  session: {
    strategy: 'jwt', // 이거 꼭 있어야 아래 jwt 콜백이 동작함
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // authorize에서 받은 id 저장
      }
      return token;
    },

    async session({ session, token }) {
      // token.id를 session.user.id로 복사
      if (session.user && token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },

  cookies: {
    sessionToken: {
      name: 'authjs.session-token',
      options: {
        domain: '.interview-town.com',
        path: '/',
        sameSite: 'none',
        secure: true,
      },
    },
  },
});
