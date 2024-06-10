import { Hono } from "hono";
import { createOrder_menu_item, getSingleOrder_menu_item, listOrder_menu_item, updateOrder_menu_item, deleteOrder_menu_item } from "./order_menu_item.controller";
import {zValidator} from "@hono/zod-validator"
import { type Context } from "hono";
import { order_menu_itemSchema } from "../validators";



//creating hono instance

export const order_menu_itemRouter = new Hono();

//get states
order_menu_itemRouter.get("/order_menu_item", listOrder_menu_item)

//get a single Driver    

order_menu_itemRouter.get("/order_menu_item/:id", getSingleOrder_menu_item)



//create State

order_menu_itemRouter.post("/order_menu_item", zValidator('json', order_menu_itemSchema, (results, c) => {
  if (!results.success){
      return c.json(results.error, 400)
  }
}) ,createOrder_menu_item)

//update Driver

order_menu_itemRouter.put("/order_menu_item/:id", updateOrder_menu_item)

// delete Driver
order_menu_itemRouter.delete("/order_menu_item/:id", deleteOrder_menu_item)