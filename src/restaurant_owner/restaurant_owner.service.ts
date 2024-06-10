import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import { TIRestaurant_owner,TSRestaurant_owner,restaurantOwnerTable } from "../drizzle/schema";



export const restaurant_ownerService = async ():Promise<TSRestaurant_owner[] | null> =>{
    return await db.query.restaurantOwnerTable.findMany();

}

export const getRestaurant_ownerService = async (id: number): Promise<TSRestaurant_owner | undefined> => {
    return await db.query.restaurantOwnerTable.findFirst({
        where: eq(restaurantOwnerTable.id, id)
    })
}

export const createRestaurant_ownerService = async (restaurant_owner: TIRestaurant_owner): Promise<TIRestaurant_owner> => {
    await db.insert(restaurantOwnerTable).values(restaurant_owner)
    return restaurant_owner;
}

export const updateRestaurant_ownerService = async (id: number, restaurant_owner: TIRestaurant_owner) => {
    await db.update(restaurantOwnerTable).set(restaurant_owner).where(eq(restaurantOwnerTable.id, id))
    return "Restaurant_owner updated successfully";
}

export const deleteRestaurant_ownerService = async (id: number) => {
    await db.delete(restaurantOwnerTable).where(eq(restaurantOwnerTable.id, id))
    return "Restaurant_owner deleted successfully";
}