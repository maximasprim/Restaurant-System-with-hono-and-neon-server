import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import { TIOrders,TSOrders,ordersTable } from "../drizzle/schema";



export const orderService = async ():Promise<TSOrders[] | null> =>{
    return await db.query.ordersTable.findMany();

}

export const getOrderService = async (id: number): Promise<TSOrders | undefined> => {
    return await db.query.ordersTable.findFirst({
        where: eq(ordersTable.id, id)
    })
}

export const createOrderService = async (order: TIOrders): Promise<TIOrders> => {
    await db.insert(ordersTable).values(order)
    return order;
}

export const updateOrderService = async (id: number, order: TIOrders) => {
    await db.update(ordersTable).set(order).where(eq(ordersTable.id, id))
    return "Order updated successfully";
}

export const deleteOrderService = async (id: number) => {
    await db.delete(ordersTable).where(eq(ordersTable.id, id))
    return "Order deleted successfully";
}