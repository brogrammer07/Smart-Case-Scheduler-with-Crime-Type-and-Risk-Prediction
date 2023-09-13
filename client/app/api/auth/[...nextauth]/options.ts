import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDB } from "@/utils/database";
import User from "@/models/user";
export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: {
          label: "Police Station Code",
          type: "text",
          placeholder: "PS-101",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          await connectToDB();
          const userExists = await User.findOne({
            ps_code: credentials?.username,
          });

          // if not, create a new user
          if (!userExists) {
            // await User.create({
            //   ps_code: credentials?.username,
            //   password: credentials?.password,
            // });

            return null;
          }
          const user = {
            id: userExists._id,
            name: userExists.ps_code,
          };
          if (userExists.password !== credentials?.password) {
            return null;
          }
          return user;
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
};
