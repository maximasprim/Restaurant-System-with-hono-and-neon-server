import { Context } from "hono";
import { driverService, getDriverService, createDriverService, updateDriverService, deleteDriverService } from "./driver.service";




export const listDriver = async (c: Context) =>{
  const data = await driverService();
  if ( data == null){
    return c.text("driver not Found", 404)
  }
    return c.json(data, 200);
}

export const getSingleDriver = async (c: Context) => {
  const id = parseInt(c.req.param("id"));
  if (isNaN(id)) 
      return c.text("invalid ID!", 400);

  const state = await getDriverService(id);
  if (state == undefined){
      return c.text(" not found!", 404);
  }
  return c.json(state, 200);
} 

export const createDriver = async (c: Context) => {
  try{
    const driver = await c.req.json();
    const createdDriver = await createDriverService(driver);
   if (!createdDriver){
    return c.text("Driver not created!", 404)
   }
    return c.json({msg: createdDriver}, 201);
} catch (error: any){
    return c.json({error: error?.message}, 400)
}
}

export const updateDriver = async (c: Context) => {
  const id = parseInt(c.req.param("id"));
  if (isNaN(id)) 
      return c.text("invalid ID!", 400);

  const user = await c.req.json();
  try{
  //search for user
  const founduser = await getDriverService(id);
  if (founduser == undefined) 
      return c.text("driver not found!", 404);
  //get the data and update
  const res = await updateDriverService(id, user);
  //return the updated user
  if (!res )
    return c.text("driver not updated!", 404); 
    return c.json({msg: res}, 201);

} catch (error: any){
    return c.json({error: error?.message}, 400)
}
}

//delete city
export const deleteDriver =  async (c: Context) => {
  const id = Number(c.req.param("id"));
  if (isNaN(id)) 
      return c.text("invalid ID!", 400);

  try{

 //search for the user
 const city = await getDriverService(id);
 if (city == undefined) 
     return c.text("driver not found!👽", 404);
  //delete the user
  const res = await deleteDriverService(id);
  if (!res) return c.text("driver not deleted!👽", 404);

  return c.json({msg: res}, 201);

  }catch(error: any){
      return c.json({error: error?.message}, 400)
  }
}