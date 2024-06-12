import { Context } from "hono";
import { getUserWithAddressService, getUsersWithCommentsService,getUserWithDriversService, getSingleUserWithAddress} from './userRelations.service'


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

export const listuserWithDrivers = async (c: Context) =>{
    const data= await getUserWithDriversService();
    if ( data == null){
        return c.text("user not found",404)
    }
    return c.json(data, 200)
}

export const listsingleuserwithaddress = async (c: Context) =>{
    const id = parseInt(c.req.param("id"));
    const data = await getSingleUserWithAddress(id);
    if ( data == null){
      return c.text("user not Found", 404)
    }
      return c.json(data, 200);
}