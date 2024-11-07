import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getUserByPhoneAndPin } from '../../../utils/authUtils'; // Custom function to verify user by phone and PIN

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "MobileLogin",
      credentials: {
        phoneNumber: { label: "Phone Number", type: "text" },
        pin: { label: "PIN", type: "password" },
      },
      async authorize(credentials) {
        const { phoneNumber, pin } = credentials;

        // Verify user by phone number and PIN
        const user = await getUserByPhoneAndPin(phoneNumber, pin);
        if (user) {
          return user;
        } else {
          throw new Error("Invalid Phone Number or Pin");
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin", // Custom sign-in page
  },
  callbacks: {
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
});