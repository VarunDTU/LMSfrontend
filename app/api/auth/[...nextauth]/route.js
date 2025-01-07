import { connectDB } from "@/lib/mongodb";
import User from "@/models/user";
import bycrpt from "bcrypt";
import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
const authOptions = {
  providers: [
    CredentialProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "Email",
          placeholder: "jsmith@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log("credentials", credentials);
        try {
          await connectDB();
          const { email, password } = credentials;
          const user = await User.findOne({ email: email });
          if (!user) {
            return null;
          }
          if (!bycrpt.compare(password, user.password)) {
            return null;
          }
          return user;
        } catch (error) {
          console.log("Error while connecting to DB", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, user, token }) {
      if (session) {
        session.user.role = token.role;
        session.user.id = token.id;
      }

      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user._id;
      }
      return token;
    },
  },
  session: {
    jwt: true,
  },
  secret: process.env.AUTH_SECRET,
  pages: {
    newUser: "/auth/signup",
  },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
