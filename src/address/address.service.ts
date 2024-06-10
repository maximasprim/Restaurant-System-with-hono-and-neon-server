import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import { TIAddress,TSAddress,addressTable } from "../drizzle/schema";



export const addressService = async ():Promise<TSAddress[] | null> =>{
    return await db.query.addressTable.findMany();

}

export const getAddressService = async (id: number): Promise<TSAddress | undefined> => {
    return await db.query.addressTable.findFirst({
        where: eq(addressTable.id, id)
    })
}

export const createAddressService = async (address: TIAddress): Promise<TIAddress> => {
    await db.insert(addressTable).values(address)
    return address;
}

export const updateAddressService = async (id: number, user: TIAddress) => {
    await db.update(addressTable).set(user).where(eq(addressTable.id, id))
    return "Address updated successfully";
}

export const deleteAddressService = async (id: number) => {
    await db.delete(addressTable).where(eq(addressTable.id, id))
    return "Address deleted successfully";
}