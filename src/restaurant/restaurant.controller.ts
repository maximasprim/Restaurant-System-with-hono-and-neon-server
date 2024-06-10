import { Context } from "hono";
import { restaurantService, getRestaurantService, createRestaurantService, updateRestaurantService, deleteRestaurantService } from "./restaurant.service";




export const listRestaurant = async (c: Context) =>{
  const data = await restaurantService();
  if ( data == null){
    return c.text("restaurant not Found", 404)
  }
    return c.json(data, 200);
}

export const getSingleRestaurant = async (c: Context) => {
  const id = parseInt(c.req.param("id"));
  if (isNaN(id)) 
      return c.text("invalid ID!", 400);

  const restaurant = await getRestaurantService(id);
  if (restaurant == undefined){
      return c.text(" not found!", 404);
  }
  return c.json(restaurant, 200);
} 

export const createRestaurant = async (c: Context) => {
  try{
    const restaurant = await c.req.json();
    const createdRestaurant = await createRestaurantService(restaurant);
   if (!createdRestaurant){
    return c.text("Restaurant not created!", 404)
   }
    return c.json({msg: createdRestaurant}, 201);
} catch (error: any){
    return c.json({error: error?.message}, 400)
}
}

export const updateRestaurant = async (c: Context) => {
  const id = parseInt(c.req.param("id"));
  if (isNaN(id)) 
      return c.text("invalid ID!", 400);

  const restaurant = await c.req.json();
  try{
  //search for user
  const foundrestaurant = await getRestaurantService(id);
  if (foundrestaurant == undefined) 
      return c.text("restaurant not found!", 404);
  //get the data and update
  const res = await updateRestaurantService(id, restaurant);
  //return the updated user
  if (!res )
    return c.text("restaurant not updated!", 404); 
    return c.json({msg: res}, 201);

} catch (error: any){
    return c.json({error: error?.message}, 400)
}
}

//delete city
export const deleteRestaurant =  async (c: Context) => {
  const id = Number(c.req.param("id"));
  if (isNaN(id)) 
      return c.text("invalid ID!", 400);

  try{

 //search for the user
 const restaurant = await getRestaurantService(id);
 if (restaurant == undefined) 
     return c.text("restaurant not found!👽", 404);
  //delete the user
  const res = await deleteRestaurantService(id);
  if (!res) return c.text("restaurant not deleted!👽", 404);

  return c.json({msg: res}, 201);

  }catch(error: any){
      return c.json({error: error?.message}, 400)
  }
}