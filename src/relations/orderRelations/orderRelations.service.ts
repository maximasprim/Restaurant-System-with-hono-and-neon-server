import { TSOrders, ordersTable} from "../../drizzle/schema";
import { db } from "../../drizzle/db";
import { Column, sql } from "drizzle-orm";
import { eq } from "drizzle-orm";

export const getOrderWithOrderMenuItemsService = async (): Promise<
  TSOrders[] | null
> => {
  return await db.query.ordersTable.findMany({
    with: {
      orderMenuItems: {
        columns: {
          order_id:true,
          menu_item_id:true,
          quantity:true,
          price: true,
          comment:true
        },
      },
    },
  });
};