import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import { TIDriver,TSDriver,driversTable } from "../drizzle/schema";



export const driverService = async ():Promise<TSDriver[] | null> =>{
    return await db.query.driversTable.findMany();

}

export const getDriverService = async (id: number): Promise<TSDriver | undefined> => {
    return await db.query.driversTable.findFirst({
        where: eq(driversTable.id, id)
    })
}

export const createDriverService = async (driver: TIDriver): Promise<TIDriver> => {
    await db.insert(driversTable).values(driver)
    return driver;
}

export const updateDriverService = async (id: number, user: TIDriver) => {
    await db.update(driversTable).set(user).where(eq(driversTable.id, id))
    return "Driver updated successfully";
}

export const deleteDriverService = async (id: number) => {
    await db.delete(driversTable).where(eq(driversTable.id, id))
    return "Driver deleted successfully";
}