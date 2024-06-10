import { Context } from "hono";
import { order_menu_itemService, getOrder_menu_itemService, createOrder_menu_itemService, updateOrder_menu_itemService, deleteOrder_menu_itemService } from "./order_menu_item.service";




export const listOrder_menu_item = async (c: Context) =>{
  const data = await order_menu_itemService();
  if ( data == null){
    return c.text("order_menu_item not Found", 404)
  }
    return c.json(data, 200);
}

export const getSingleOrder_menu_item = async (c: Context) => {
  const id = parseInt(c.req.param("id"));
  if (isNaN(id)) 
      return c.text("invalid ID!", 400);

  const order_menu_item= await getOrder_menu_itemService(id);
  if (order_menu_item== undefined){
      return c.text(" not found!", 404);
  }
  return c.json(order_menu_item, 200);
} 

export const createOrder_menu_item = async (c: Context) => {
  try{
    const order_menu_item = await c.req.json();
    const createdOrder_menu_item = await createOrder_menu_itemService(order_menu_item);
   if (!createdOrder_menu_item){
    return c.text("Order_menu_item not created!", 404)
   }
    return c.json({msg: createdOrder_menu_item}, 201);
} catch (error: any){
    return c.json({error: error?.message}, 400)
}
}

export const updateOrder_menu_item = async (c: Context) => {
  const id = parseInt(c.req.param("id"));
  if (isNaN(id)) 
      return c.text("invalid ID!", 400);

  const user = await c.req.json();
  try{
  //search for user
  const founduser = await getOrder_menu_itemService(id);
  if (founduser == undefined) 
      return c.text("Order_menu_item not found!", 404);
  //get the data and update
  const res = await updateOrder_menu_itemService(id, user);
  //return the updated user
  if (!res )
    return c.text("Order_menu_item not updated!", 404); 
    return c.json({msg: res}, 201);

} catch (error: any){
    return c.json({error: error?.message}, 400)
}
}

//delete city
export const deleteOrder_menu_item =  async (c: Context) => {
  const id = Number(c.req.param("id"));
  if (isNaN(id)) 
      return c.text("invalid ID!", 400);

  try{

 //search for the user
 const order_menu_item = await getOrder_menu_itemService(id);
 if (order_menu_item == undefined) 
     return c.text("Order_Menu_item not found!👽", 404);
  //delete the user
  const res = await deleteOrder_menu_itemService(id);
  if (!res) return c.text("Order_menu_item not deleted!👽", 404);

  return c.json({msg: res}, 201);

  }catch(error: any){
      return c.json({error: error?.message}, 400)
  }
}