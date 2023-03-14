import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import {loginUserData} from "../../../utils/axios";

export const nextOption = {
  providers: [
    // login
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      type: "credentials",
      credentials: {
        email: {label: "email", type: "email", placeholder: "email"},
        password: {label: "Password", type: "password"},
      },

      async authorize(credentials, req) {
        console.log("1");
        console.log(credentials, "credentials");
        // const {email, password} = credentials;
        // const user = await loginUserData({email, password});
        // console.log(user, "credential user");
        // return credentials;
        return credentials;
      },
    }),
  ],
  pages: {
    signIn: "/login",
    signOut: "/",
  },
  secret: "secret",
};

export default NextAuth(nextOption);
