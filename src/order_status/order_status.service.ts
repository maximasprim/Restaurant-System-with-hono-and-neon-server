import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import { TIOrderStatus,TSOrderStatus,orderStatusTable } from "../drizzle/schema";



export const orderStatusService = async ():Promise<TSOrderStatus[] | null> =>{
    return await db.query.orderStatusTable.findMany();

}

export const getOrderStatusService = async (id: number): Promise<TSOrderStatus | undefined> => {
    return await db.query.orderStatusTable.findFirst({
        where: eq(orderStatusTable.id, id)
    })
}

export const createOrderStatusService = async (orderStatus: TIOrderStatus): Promise<TIOrderStatus> => {
    await db.insert(orderStatusTable).values(orderStatus)
    return orderStatus;
}

export const updateOrderStatusService = async (id: number, orderStatus: TIOrderStatus) => {
    await db.update(orderStatusTable).set(orderStatus).where(eq(orderStatusTable.id, id))
    return "OrderStatus updated successfully";
}

export const deleteOrderStatusService = async (id: number) => {
    await db.delete(orderStatusTable).where(eq(orderStatusTable.id, id))
    return "OrderStatus deleted successfully";
}