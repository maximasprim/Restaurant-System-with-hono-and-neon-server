import { Hono } from "hono";
import { createOrder, getSingleOrder, listOrder, updateOrder, deleteOrder } from "./order.controller";
import {zValidator} from "@hono/zod-validator"
import { type Context } from "hono";
import { ordersSchema } from "../validators";



//creating hono instance

export const orderRouter = new Hono();

//get states
orderRouter.get("/orders", listOrder)

//get a single Driver    

orderRouter.get("/orders/:id", getSingleOrder)



//create State

orderRouter.post("/orders", zValidator('json', ordersSchema, (results, c) => {
  if (!results.success){
      return c.json(results.error, 400)
  }
}) ,createOrder)

//update Driver

orderRouter.put("/orders/:id", updateOrder)

// delete Driver
orderRouter.delete("/orders/:id", deleteOrder)