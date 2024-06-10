import { Context } from "hono";
import { stateService, getStateService, createStateService, updatestateervice, deletestateService } from "./state.service";




export const listState = async (c: Context) =>{
  const data = await stateService();
  if ( data == null){
    return c.text("State not Found", 404)
  }
    return c.json(data, 200);
}

export const getSingleState = async (c: Context) => {
  const id = parseInt(c.req.param("id"));
  if (isNaN(id)) 
      return c.text("invalid ID!", 400);

  const state = await getStateService(id);
  if (state == undefined){
      return c.text("State not found!", 404);
  }
  return c.json(state, 200);
} 

export const createState = async (c: Context) => {
  try{
    const user = await c.req.json();
    const createdUser = await createStateService(user);
   if (!createdUser){
    return c.text("State not created!", 404)
   }
    return c.json({msg: createdUser}, 201);
} catch (error: any){
    return c.json({error: error?.message}, 400)
}
}

export const updateState = async (c: Context) => {
  const id = parseInt(c.req.param("id"));
  if (isNaN(id)) 
      return c.text("invalid ID!", 400);

  const user = await c.req.json();
  try{
  //search for user
  const founduser = await getStateService(id);
  if (founduser == undefined) 
      return c.text("State not found!", 404);
  //get the data and update
  const res = await updatestateervice(id, user);
  //return the updated user
  if (!res )
    return c.text("State not updated!", 404); 
    return c.json({msg: res}, 201);

} catch (error: any){
    return c.json({error: error?.message}, 400)
}
}

//delete state
export const deleteState =  async (c: Context) => {
  const id = Number(c.req.param("id"));
  if (isNaN(id)) 
      return c.text("invalid ID!", 400);

  try{

 //search for the user
 const state = await getStateService(id);
 if (state == undefined) 
     return c.text("state not found!👽", 404);
  //delete the state
  const res = await deletestateService(id);
  if (!res) return c.text("state not deleted!👽", 404);

  return c.json({msg: res}, 201);

  }catch(error: any){
      return c.json({error: error?.message}, 400)
  }
}