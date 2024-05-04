import NextAuth from "next-auth";
import { getApolloClient } from "@/lib/apollo/client";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";
import {
  FIND_USER_BY_EMAIL_QUERY,
  CREATE_USER_MUTATION,
} from "@/lib/apollo/queries";
import { credentialsSchema } from "@/services/validation";

const createUser = async (email, password, name) => {
  const client = getApolloClient();

  const { data } = await client.mutate({
    mutation: CREATE_USER_MUTATION,
    variables: { email, password, name },
  });

  return data.insert_users_one;
};

const findUserByEmail = async (email) => {
  const client = getApolloClient();

  const { data } = await client.query({
    query: FIND_USER_BY_EMAIL_QUERY,
    variables: { email },
  });

  return data.users[0];
};

const authUser = async (credentials) => {
  const { email, password, name } = credentials;

  const user = await findUserByEmail(email);

  if (!user) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser(email, hashedPassword, name);
    return newUser;
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return null;
  }

  return user;
};

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: { label: "Name", type: "text", placeholder: "Not required" },
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = credentialsSchema.safeParse(credentials);
        if (!parsed.success) {
          return null;
        }

        if (!credentials.email || !credentials.password) {
          return null;
        }
        const user = await authUser(credentials);
        if (user) {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          };
        }
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "profile email",
        },
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, account }) => {
      if (user) {
        token.sub = user.id;
        token.role = user.role;
      }
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token && session.user) {
        session.user.id = token.sub;
        session.user.role = token.role;
      }
      return session;
    },
  },
});
