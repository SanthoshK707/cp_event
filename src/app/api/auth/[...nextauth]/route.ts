import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@/lib/db";
import Team from "@/models/Team";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    //Allow login only if email exists in Team DB
    async signIn({ user }) {
      try {
        await connectDB();

        if (!user.email) return false;

        const teamExists = await Team.findOne({ email: user.email });

        return !!teamExists;
      } catch (error) {
        console.error("Sign-in error:", error);
        return false;
      }
    },

    //  Runs on login & every request (JWT creation)
    async jwt({ token }) {
      if (!token.email) return token;

      await connectDB();

      const team = await Team.findOne({ email: token.email });

      // if team exists, check codeforcesHandle
      token.setCodeforcesHandle = team?.codeforcesHandle == null;

      return token;
    },

    // Expose value to frontend session
    async session({ session, token }) {
      if (session.user) {
        session.user.setCodeforcesHandle =
          token.setCodeforcesHandle as boolean;
      }

      return session;
    },
  },
});

export { handler as GET, handler as POST };
