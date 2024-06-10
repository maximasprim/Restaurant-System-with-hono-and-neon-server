import { Hono } from "hono";
import { createOrderStatus, getSingleOrderStatus, listOrderStatus, updateOrderStatus, deleteOrderStatus } from "./order_status.controller";
import {zValidator} from "@hono/zod-validator"
import { type Context } from "hono";
import { orderStatusSchema } from "../validators";



//creating hono instance

export const orderStatusRouter = new Hono();

//get status
orderStatusRouter.get("/orderStatus", listOrderStatus)

//get a single Status    

orderStatusRouter.get("/orderStatus/:id", getSingleOrderStatus)

// 

//create Status

orderStatusRouter.post("/orderStatus", zValidator('json', orderStatusSchema, (results, c) => {
  if (!results.success){
      return c.json(results.error, 400)
  }
}) ,createOrderStatus)

//update Status

orderStatusRouter.put("/orderStatus/:id", updateOrderStatus)
// delete order_status
orderStatusRouter.delete("/orderStatus/:id", deleteOrderStatus)