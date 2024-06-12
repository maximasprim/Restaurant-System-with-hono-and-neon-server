import { Context } from "hono";
import { getUserWithAddressService} from './userRelations.server'


export const listUserWithAddress = async (c: Context) =>{
    const data = await getUserWithAddressService();
    if ( data == null){
      return c.text("user not Found", 404)
    }
      return c.json(data, 200);
  }