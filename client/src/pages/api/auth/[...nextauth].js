import {json} from "express";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import {loginUserData} from "../../../utils/axios";

export const nextOption = {
  providers: [
    // login
    CredentialsProvider({
      id: "login",
      name: "login",
      credentials: {
        email: {label: "email", type: "email", placeholder: "email"},
        password: {label: "Password", type: "password"},
      },

      async authorize(credentials, req) {
        const {email, password} = credentials;

        try {
          const {
            data: {user},
          } = await loginUserData({email, password});
          return user;
        } catch (error) {
          const errorMsg = error.response.data.msg;
          throw new Error(errorMsg);
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/login",
  },
  callbacks: {
    async signIn({user, account, profile, email, credentials}) {
      console.log({user, account, profile, email, credentials}), "@@@";
      return true;
    },
    async redirect({url, baseUrl}) {
      return baseUrl;
    },
    async session({session, user, token}) {
      return session;
    },
    async jwt({token, user, account, profile, isNewUser}) {
      return token;
    },
  },
};

export default NextAuth(nextOption);
