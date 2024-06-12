import { Context } from "hono";
import { getOrderWithOrderMenuItemsService } from './orderRelations.service'


export const listOrdersWithMenuItems = async (c: Context) =>{
    const data = await getOrderWithOrderMenuItemsService();
    if ( data == null){
      return c.text("user not Found", 404)
    }
      return c.json(data, 200);
  }