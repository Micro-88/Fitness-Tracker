import SequelizeAdapter from "@auth/sequelize-adapter"
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import sequelize from "../db_connection"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
})

