import CredentialsProvider from "next-auth/providers/credentials";

export const NEXT_AUTH_CONFIG = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "email", type: "text", placeholder: "" },
        password: { label: "password", type: "password", placeholder: "" },
      },
      async authorize(credentials: any) {
        return {
          // To access this id we use callbacks.
          id: "user1", // this is the user id
          name: "John Doe",
          email: "john.doe@example.com",
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt: async ({ user, token }: any) => {
      // Here the id is sub. In token id is set as sub it is a convention.
      console.log("token", token);
      // token.id = "1";
      token.userId = token.sub;
      token.type = "credentials";
      return token;
    },
    async session({ session, token }: any) {
      console.log("session", session, token);
      session.user.id = token.userId;
      session.user.type = token.type;
      return session;
    },
  },
  // Explicitly set the signIn page otherwise it will redirect to the default signIn page.
  pages: {
    signIn: "/signin",
  },
};
