import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import {loginUserData} from "../../../utils/axios/authAxios";

export const nextOption = (_, res) => {
  return {
    providers: [
      // login
      CredentialsProvider({
        id: "login",
        name: "login",
        credentials: {
          email: {label: "email", type: "email", placeholder: "email"},
          password: {label: "Password", type: "password"},
        },

        async authorize(credentials, _) {
          const {email, password} = credentials;
          try {
            //  react-query api 요청
            const response = await loginUserData({email, password});
            const user = response.data.user;

            // cookie setting
            const responseCookie = response.headers["set-cookie"];
            res.setHeader("Set-Cookie", responseCookie);

            //  return user
            if (user) {
              return user;
            } else {
              return null;
            }
          } catch (error) {
            const errorMsg = error.response.data.msg;
            console.log(error, "nextauth error");
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
};

export default (req, res) => {
  return NextAuth(req, res, nextOption(req, res));
};
