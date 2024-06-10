import { AuthOnUsersTable, TIAuthOnUser, TSAuthOnUser } from "../drizzle/schema";
import db from "../drizzle/db";

export const createAuthUserService = async (user:TIAuthOnUser): Promise<string | null > => {
    await db.insert(AuthOnUsersTable).values(user)
    return "User created successfully";


    return "user created successfully";
}