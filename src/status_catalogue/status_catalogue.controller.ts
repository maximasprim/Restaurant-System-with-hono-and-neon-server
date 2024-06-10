import { Context } from "hono";
import { status_catalogueService, getStatus_catalogueService, createStatus_catalogueService, updateStatus_catalogueService, deleteStatus_catalogueService } from "./status_catalogue.service";




export const listStatus_catalogue = async (c: Context) =>{
  const data = await status_catalogueService();
  if ( data == null){
    return c.text("Status_catalogue not Found", 404)
  }
    return c.json(data, 200);
}

export const getSingleStatus_catalogue = async (c: Context) => {
  const id = parseInt(c.req.param("id"));
  if (isNaN(id)) 
      return c.text("invalid ID!", 400);

  const status_catalogue = await getStatus_catalogueService(id);
  if (status_catalogue == undefined){
      return c.text("Status_catalogue not found!", 404);
  }
  return c.json(status_catalogue, 200);
} 

export const createStatus_catalogue = async (c: Context) => {
  try{
    const status_catalogue = await c.req.json();
    const createdStatus_catalogue = await createStatus_catalogueService(status_catalogue);
   if (!createdStatus_catalogue){
    return c.text("Status_catalogue not created!", 404)
   }
    return c.json({msg: createdStatus_catalogue}, 201);
} catch (error: any){
    return c.json({error: error?.message}, 400)
}
}

export const updateStatus_catalogue = async (c: Context) => {
  const id = parseInt(c.req.param("id"));
  if (isNaN(id)) 
      return c.text("invalid ID!", 400);

  const status_catalogue = await c.req.json();
  try{
  //search for user
  const foundstatus_catalogue = await getStatus_catalogueService(id);
  if (foundstatus_catalogue == undefined) 
      return c.text("Status_catalogue not found!", 404);
  //get the data and update
  const res = await updateStatus_catalogueService(id, status_catalogue);
  //return the updated user
  if (!res )
    return c.text("Status_catalogue not updated!", 404); 
    return c.json({msg: res}, 201);

} catch (error: any){
    return c.json({error: error?.message}, 400)
}
}
//delete city
export const deleteStatus_catalogue =  async (c: Context) => {
  const id = Number(c.req.param("id"));
  if (isNaN(id)) 
      return c.text("invalid ID!", 400);

  try{

 //search for the user
 const status_catalogue = await getStatus_catalogueService(id);
 if (status_catalogue == undefined) 
     return c.text("status_catalogue not found!👽", 404);
  //delete the user
  const res = await deleteStatus_catalogueService(id);
  if (!res) return c.text("status_catalogue not deleted!👽", 404);

  return c.json({msg: res}, 201);

  }catch(error: any){
      return c.json({error: error?.message}, 400)
  }
}