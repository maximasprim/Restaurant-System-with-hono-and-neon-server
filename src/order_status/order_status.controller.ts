import { Context } from "hono";
import { orderStatusService, getOrderStatusService, createOrderStatusService, updateOrderStatusService, deleteOrderStatusService } from "./order_status.service"




export const listOrderStatus = async (c: Context) =>{
  const data = await orderStatusService();
  if ( data == null){
    return c.text("Status not Found", 404)
  }
    return c.json(data, 200);
}

export const getSingleOrderStatus = async (c: Context) => {
  const id = parseInt(c.req.param("id"));
  if (isNaN(id)) 
      return c.text("invalid ID!", 400);

  const orderStatus = await getOrderStatusService(id);
  if (orderStatus == undefined){
      return c.text("OrderStatus not found!", 404);
  }
  return c.json(orderStatus, 200);
} 

export const createOrderStatus = async (c: Context) => {
  try{
    const orderStatus = await c.req.json();
    const createdOrderStatus = await createOrderStatusService(orderStatus);
   if (!createdOrderStatus){
    return c.text("OrderStatus not created!", 404)
   }
    return c.json({msg: createdOrderStatus}, 201);
} catch (error: any){
    return c.json({error: error?.message}, 400)
}
}

export const updateOrderStatus = async (c: Context) => {
  const id = parseInt(c.req.param("id"));
  if (isNaN(id)) 
      return c.text("invalid ID!", 400);

  const orderStatus = await c.req.json();
  try{
  //search for user
  const foundorderStatus = await getOrderStatusService(id);
  if (foundorderStatus == undefined) 
      return c.text("OrderStatus not found!", 404);
  //get the data and update
  const res = await updateOrderStatusService(id, orderStatus);
  //return the updated user
  if (!res )
    return c.text("OrderStatus not updated!", 404); 
    return c.json({msg: res}, 201);

} catch (error: any){
    return c.json({error: error?.message}, 400)
}
}

//delete order_status
export const deleteOrderStatus =  async (c: Context) => {
  const id = Number(c.req.param("id"));
  if (isNaN(id)) 
      return c.text("invalid ID!", 400);

  try{

 //search for the category
 const orderStatus = await getOrderStatusService(id);
 if (orderStatus == undefined) 
     return c.text("OrderStatus not found!👽", 404);
  //delete the user
  const res = await deleteOrderStatusService(id);
  if (!res) return c.text("OrderStatus not deleted!👽", 404);

  return c.json({msg: res}, 201);

  }catch(error: any){
      return c.json({error: error?.message}, 400)
  }
}