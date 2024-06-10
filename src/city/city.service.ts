import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import { TICity,TSCity,cityTable } from "../drizzle/schema";



export const cityService = async ():Promise<TSCity[] | null> =>{
    return await db.query.cityTable.findMany();

}

export const getCityService = async (id: number): Promise<TSCity | undefined> => {
    return await db.query.cityTable.findFirst({
        where: eq(cityTable.id, id)
    })
}

export const createCityService = async (city: TICity): Promise<TICity> => {
    await db.insert(cityTable).values(city)
    return city;
}

export const updateCityService = async (id: number, user: TICity) => {
    await db.update(cityTable).set(user).where(eq(cityTable.id, id))
    return "City updated successfully";
}

export const deleteCityService = async (id: number) => {
    await db.delete(cityTable).where(eq(cityTable.id, id))
    return "City deleted successfully";
}