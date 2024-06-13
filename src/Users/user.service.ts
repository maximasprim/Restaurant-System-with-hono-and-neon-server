import db from "../drizzle/db";
import { eq,ilike, like } from "drizzle-orm";
import { TIUsers,TSUsers,usersTable } from "../drizzle/schema";



export const usersService = async ():Promise<TSUsers[] | null> =>{
    return await db.query.usersTable.findMany();

}


//getting city with specific names
export const userNamelike=async (userName:string) =>{
    const name=await db.select().from(usersTable).where(ilike(usersTable.name,`${userName}%`));
    return name;
}

export const getUserService = async (id: number): Promise<TSUsers | undefined> => {
    return await db.query.usersTable.findFirst({
        where: eq(usersTable.id, id)
    })
}

export const createUserService = async (user: TIUsers): Promise<TIUsers> => {
    await db.insert(usersTable).values(user)
    return user;
}

export const updateUserService = async (id: number, user: TIUsers) => {
    await db.update(usersTable).set(user).where(eq(usersTable.id, id))
    return "User updated successfully";
}

export const deleteUserService = async (id: number) => {
    await db.delete(usersTable).where(eq(usersTable.id, id))
    return "User deleted successfully";
}