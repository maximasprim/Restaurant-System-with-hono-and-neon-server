import { Context } from "hono";
import { restaurant_ownerService, getRestaurant_ownerService, createRestaurant_ownerService, updateRestaurant_ownerService, deleteRestaurant_ownerService } from "./restaurant_owner.service";




export const listRestaurant_owner = async (c: Context) =>{
  const data = await restaurant_ownerService();
  if ( data == null){
    return c.text("restaurant_owner not Found", 404)
  }
    return c.json(data, 200);
}

export const getSingleRestaurant_owner = async (c: Context) => {
  const id = parseInt(c.req.param("id"));
  if (isNaN(id)) 
      return c.text("invalid ID!", 400);

  const restaurant_owner = await getRestaurant_ownerService(id);
  if (restaurant_owner == undefined){
      return c.text(" not found!", 404);
  }
  return c.json(restaurant_owner, 200);
} 

export const createRestaurant_owner = async (c: Context) => {
  try{
    const restaurant_owner = await c.req.json();
    const createdRestaurant_owner = await createRestaurant_ownerService(restaurant_owner);
   if (!createdRestaurant_owner){
    return c.text("Restaurant_owner not created!", 404)
   }
    return c.json({msg: createdRestaurant_owner}, 201);
} catch (error: any){
    return c.json({error: error?.message}, 400)
}
}

export const updateRestaurant_owner = async (c: Context) => {
  const id = parseInt(c.req.param("id"));
  if (isNaN(id)) 
      return c.text("invalid ID!", 400);

  const restaurant_owner = await c.req.json();
  try{
  //search for user
  const foundrestaurant_owner = await getRestaurant_ownerService(id);
  if (foundrestaurant_owner == undefined) 
      return c.text("restaurant_owner not found!", 404);
  //get the data and update
  const res = await updateRestaurant_ownerService(id, restaurant_owner);
  //return the updated user
  if (!res )
    return c.text("restaurant_owner not updated!", 404); 
    return c.json({msg: res}, 201);

} catch (error: any){
    return c.json({error: error?.message}, 400)
}
}

//delete city
export const deleteRestaurant_owner =  async (c: Context) => {
  const id = Number(c.req.param("id"));
  if (isNaN(id)) 
      return c.text("invalid ID!", 400);

  try{

 //search for the user
 const restaurant_owner = await getRestaurant_ownerService(id);
 if (restaurant_owner == undefined) 
     return c.text("restaurant not found!👽", 404);
  //delete the user
  const res = await deleteRestaurant_ownerService(id);
  if (!res) return c.text("restaurant_owner not deleted!👽", 404);

  return c.json({msg: res}, 201);

  }catch(error: any){
      return c.json({error: error?.message}, 400)
  }
}