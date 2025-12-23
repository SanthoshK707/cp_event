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
   
    async signIn({ user }) {
      try {
        await connectDB();
        const email = user.email;
        if (!email) {
          console.error("No email received from Google");
          return false;
        }

        const teamExists = await Team.findOne({ email });

        if (!teamExists) {
          console.error("Login rejected: Email not in Team DB");
          return false; 
        }

        return true; 
      } catch (error) {
        console.error("Sign-in error:", error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };