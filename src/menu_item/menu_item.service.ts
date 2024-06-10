import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import { TIMenuItem,TSMenuItem,menuItemTable } from "../drizzle/schema";



export const menu_itemService = async ():Promise<TSMenuItem[] | null> =>{
    return await db.query.menuItemTable.findMany();

}

export const getMenu_itemService = async (id: number): Promise<TSMenuItem | undefined> => {
    return await db.query.menuItemTable.findFirst({
        where: eq(menuItemTable.id, id)
    })
}

export const createMenu_itemService = async (menu_item: TIMenuItem): Promise<TIMenuItem> => {
    await db.insert(menuItemTable).values(menu_item)
    return menu_item;
}

export const updateMenu_itemService = async (id: number, menu_item: TIMenuItem) => {
    await db.update(menuItemTable).set(menu_item).where(eq(menuItemTable.id, id))
    return "Menu_item updated successfully";
}

export const deleteMenu_itemService = async (id: number) => {
    await db.delete(menuItemTable).where(eq(menuItemTable.id, id))
    return "Menu_item deleted successfully";
}