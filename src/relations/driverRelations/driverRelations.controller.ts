import { Context } from "hono";
import { getDriverWithOrdersService } from "./driverRelations.service"

export const listDriversWithOrders = async (c: Context) =>{
    const data = await getDriverWithOrdersService();
    if ( data == null){
        return c.text("address not Found", 404);
  }
  return c.json(data, 200);
    
}