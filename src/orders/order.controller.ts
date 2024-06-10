import { Context } from "hono";
import { orderService, getOrderService, createOrderService, updateOrderService, deleteOrderService } from "./order.service";




export const listOrder = async (c: Context) =>{
  const data = await orderService();
  if ( data == null){
    return c.text("order not Found", 404)
  }
    return c.json(data, 200);
}

export const getSingleOrder = async (c: Context) => {
  const id = parseInt(c.req.param("id"));
  if (isNaN(id)) 
      return c.text("invalid ID!", 400);

  const order = await getOrderService(id);
  if (order == undefined){
      return c.text(" not found!", 404);
  }
  return c.json(order, 200);
} 

export const createOrder = async (c: Context) => {
  try{
    const order = await c.req.json();
    const createdOrder = await createOrderService(order);
   if (!createdOrder){
    return c.text("Order not created!", 404)
   }
    return c.json({msg: createdOrder}, 201);
} catch (error: any){
    return c.json({error: error?.message}, 400)
}
}

export const updateOrder = async (c: Context) => {
  const id = parseInt(c.req.param("id"));
  if (isNaN(id)) 
      return c.text("invalid ID!", 400);

  const order = await c.req.json();
  try{
  //search for user
  const foundorder = await getOrderService(id);
  if (foundorder == undefined) 
      return c.text("order not found!", 404);
  //get the data and update
  const res = await updateOrderService(id, order);
  //return the updated user
  if (!res )
    return c.text("order not updated!", 404); 
    return c.json({msg: res}, 201);

} catch (error: any){
    return c.json({error: error?.message}, 400)
}
}

//delete city
export const deleteOrder =  async (c: Context) => {
  const id = Number(c.req.param("id"));
  if (isNaN(id)) 
      return c.text("invalid ID!", 400);

  try{

 //search for the user
 const order = await getOrderService(id);
 if (order == undefined) 
     return c.text("order not found!👽", 404);
  //delete the user
  const res = await deleteOrderService(id);
  if (!res) return c.text("order not deleted!👽", 404);

  return c.json({msg: res}, 201);

  }catch(error: any){
      return c.json({error: error?.message}, 400)
  }
}