import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_PW,
    }),
  ],
  secret: process.env.SECRET_KEY,
};
export default NextAuth(authOptions);
