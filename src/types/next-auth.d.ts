import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      setCodeforcesHandle: boolean;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    setCodeforcesHandle: boolean;
  }
}
