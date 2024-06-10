import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import { TIOrderMenuItem,TSOrderMenuItem,orderMenuItemTable } from "../drizzle/schema";



export const order_menu_itemService = async ():Promise<TSOrderMenuItem[] | null> =>{
    return await db.query.orderMenuItemTable.findMany();

}

export const getOrder_menu_itemService = async (id: number): Promise<TSOrderMenuItem | undefined> => {
    return await db.query.orderMenuItemTable.findFirst({
        where: eq(orderMenuItemTable.id, id)
    })
}

export const createOrder_menu_itemService = async (order_menu_item: TIOrderMenuItem): Promise<TIOrderMenuItem> => {
    await db.insert(orderMenuItemTable).values(order_menu_item)
    return order_menu_item;
}

export const updateOrder_menu_itemService = async (id: number, order_menu_item: TIOrderMenuItem) => {
    await db.update(orderMenuItemTable).set(order_menu_item).where(eq(orderMenuItemTable.id, id))
    return "Order_menu_item updated successfully";
}

export const deleteOrder_menu_itemService = async (id: number) => {
    await db.delete(orderMenuItemTable).where(eq(orderMenuItemTable.id, id))
    return "Order_menu_item deleted successfully";
}