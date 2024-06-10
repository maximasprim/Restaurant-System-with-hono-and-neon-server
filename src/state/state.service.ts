import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import { TIState,TSState,stateTable } from "../drizzle/schema";



export const stateService = async ():Promise<TSState[] | null> =>{
    return await db.query.stateTable.findMany();

}

export const getStateService = async (id: number): Promise<TSState | undefined> => {
    return await db.query.stateTable.findFirst({
        where: eq(stateTable.id, id)
    })
}

export const createStateService = async (state: TIState): Promise<TIState> => {
    await db.insert(stateTable).values(state)
    return state;
}

export const updatestateervice = async (id: number, user: TIState) => {
    await db.update(stateTable).set(user).where(eq(stateTable.id, id))
    return "State updated successfully";
}

export const deletestateService = async (id: number) => {
    await db.delete(stateTable).where(eq(stateTable.id, id))
    return "State deleted successfully";
}