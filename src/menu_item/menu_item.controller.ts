import { Context } from "hono";
import { menu_itemService, getMenu_itemService, createMenu_itemService, updateMenu_itemService, deleteMenu_itemService } from "./menu_item.service";




export const listMenu_item = async (c: Context) =>{
  const data = await menu_itemService();
  if ( data == null){
    return c.text("menu_item not Found", 404)
  }
    return c.json(data, 200);
}

export const getSingleMenu_item = async (c: Context) => {
  const id = parseInt(c.req.param("id"));
  if (isNaN(id)) 
      return c.text("invalid ID!", 400);

  const menu_item= await getMenu_itemService(id);
  if (menu_item== undefined){
      return c.text(" not found!", 404);
  }
  return c.json(menu_item, 200);
} 

export const createMenu_item = async (c: Context) => {
  try{
    const menu_item = await c.req.json();
    const createdMenu_item = await createMenu_itemService(menu_item);
   if (!createdMenu_item){
    return c.text("Menu_item not created!", 404)
   }
    return c.json({msg: createdMenu_item}, 201);
} catch (error: any){
    return c.json({error: error?.message}, 400)
}
}

export const updateMenu_item = async (c: Context) => {
  const id = parseInt(c.req.param("id"));
  if (isNaN(id)) 
      return c.text("invalid ID!", 400);

  const user = await c.req.json();
  try{
  //search for user
  const founduser = await getMenu_itemService(id);
  if (founduser == undefined) 
      return c.text("Menu_item not found!", 404);
  //get the data and update
  const res = await updateMenu_itemService(id, user);
  //return the updated user
  if (!res )
    return c.text("Menu_item not updated!", 404); 
    return c.json({msg: res}, 201);

} catch (error: any){
    return c.json({error: error?.message}, 400)
}
}

//delete city
export const deleteMenu_item =  async (c: Context) => {
  const id = Number(c.req.param("id"));
  if (isNaN(id)) 
      return c.text("invalid ID!", 400);

  try{

 //search for the user
 const city = await getMenu_itemService(id);
 if (city == undefined) 
     return c.text("Menu_item not found!👽", 404);
  //delete the user
  const res = await deleteMenu_itemService(id);
  if (!res) return c.text("Menu_item not deleted!👽", 404);

  return c.json({msg: res}, 201);

  }catch(error: any){
      return c.json({error: error?.message}, 400)
  }
}