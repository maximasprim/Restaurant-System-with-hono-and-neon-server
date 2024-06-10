import { Context } from "hono";
import { addressService, getAddressService, createAddressService, updateAddressService, deleteAddressService } from "./address.service";




export const listAddress = async (c: Context) =>{
  const data = await addressService();
  if ( data == null){
    return c.text("address not Found", 404)
  }
    return c.json(data, 200);
}

export const getSingleAddress = async (c: Context) => {
  const id = parseInt(c.req.param("id"));
  if (isNaN(id)) 
      return c.text("invalid ID!", 400);

  const address = await getAddressService(id);
  if (address == undefined){
      return c.text(" not found!", 404);
  }
  return c.json(address, 200);
} 

export const createAddress = async (c: Context) => {
  try{
    const address = await c.req.json();
    const createdAddress = await createAddressService(address);
   if (!createdAddress){
    return c.text("address not created!", 404)
   }
    return c.json({msg: createdAddress}, 201);
} catch (error: any){
    return c.json({error: error?.message}, 400)
}
}

export const updateAddress = async (c: Context) => {
  const id = parseInt(c.req.param("id"));
  if (isNaN(id)) 
      return c.text("invalid ID!", 400);

  const address = await c.req.json();
  try{
  //search for user
  const foundaddress = await getAddressService(id);
  if (foundaddress == undefined) 
      return c.text("Address not found!", 404);
  //get the data and update
  const res = await updateAddressService(id, address);
  //return the updated user
  if (!res )
    return c.text("Address not updated!", 404); 
    return c.json({msg: res}, 201);

} catch (error: any){
    return c.json({error: error?.message}, 400)
}
}

//delete city
export const deleteAddress =  async (c: Context) => {
  const id = Number(c.req.param("id"));
  if (isNaN(id)) 
      return c.text("invalid ID!", 400);

  try{

 //search for the user
 const address = await getAddressService(id);
 if (address == undefined) 
     return c.text("address not found!👽", 404);
  //delete the user
  const res = await deleteAddressService(id);
  if (!res) return c.text("address not deleted!👽", 404);

  return c.json({msg: res}, 201);

  }catch(error: any){
      return c.json({error: error?.message}, 400)
  }
}