import { Context } from "hono";
import { getUserWithAddressService, getUsersWithCommentsService} from './userRelations.service'


export const listUserWithAddress = async (c: Context) =>{
    const data = await getUserWithAddressService();
    if ( data == null){
      return c.text("user not Found", 404)
    }
      return c.json(data, 200);
  }

export const listUserWithComments = async (c: Context) =>{
    const data = await getUsersWithCommentsService();
    if ( data == null){
        return c.text("user not found", 404)
    }
    return c.json(data, 200)
}