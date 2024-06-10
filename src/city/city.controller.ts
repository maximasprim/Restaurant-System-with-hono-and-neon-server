import { Context } from "hono";
import { cityService, getCityService, createCityService, updateCityService, deleteCityService } from "./city.service";




export const listCity = async (c: Context) =>{
  const data = await cityService();
  if ( data == null){
    return c.text("City not Found", 404)
  }
    return c.json(data, 200);
}

export const getSingleCity = async (c: Context) => {
  const id = parseInt(c.req.param("id"));
  if (isNaN(id)) 
      return c.text("invalid ID!", 400);

  const state = await getCityService(id);
  if (state == undefined){
      return c.text(" not found!", 404);
  }
  return c.json(state, 200);
} 

export const createCity = async (c: Context) => {
  try{
    const city = await c.req.json();
    const createdCity = await createCityService(city);
   if (!createdCity){
    return c.text("State not created!", 404)
   }
    return c.json({msg: createdCity}, 201);
} catch (error: any){
    return c.json({error: error?.message}, 400)
}
}

export const updateCity = async (c: Context) => {
  const id = parseInt(c.req.param("id"));
  if (isNaN(id)) 
      return c.text("invalid ID!", 400);

  const user = await c.req.json();
  try{
  //search for user
  const founduser = await getCityService(id);
  if (founduser == undefined) 
      return c.text("City not found!", 404);
  //get the data and update
  const res = await updateCityService(id, user);
  //return the updated user
  if (!res )
    return c.text("City not updated!", 404); 
    return c.json({msg: res}, 201);

} catch (error: any){
    return c.json({error: error?.message}, 400)
}
}

//delete city
export const deleteCity =  async (c: Context) => {
  const id = Number(c.req.param("id"));
  if (isNaN(id)) 
      return c.text("invalid ID!", 400);

  try{

 //search for the user
 const city = await getCityService(id);
 if (city == undefined) 
     return c.text("city not found!👽", 404);
  //delete the user
  const res = await deleteCityService(id);
  if (!res) return c.text("city not deleted!👽", 404);

  return c.json({msg: res}, 201);

  }catch(error: any){
      return c.json({error: error?.message}, 400)
  }
}