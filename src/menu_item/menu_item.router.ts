import { Hono } from "hono";
import { createMenu_item, getSingleMenu_item, listMenu_item, updateMenu_item, deleteMenu_item } from "./menu_item.controller";
import {zValidator} from "@hono/zod-validator"
import { type Context } from "hono";
import { menu_itemSchema } from "../validators";



//creating hono instance

export const menu_itemRouter = new Hono();

//get states
menu_itemRouter.get("/menu_item", listMenu_item)

//get a single Driver    

menu_itemRouter.get("/menu_item/:id", getSingleMenu_item)



//create State

menu_itemRouter.post("/menu_item", zValidator('json', menu_itemSchema, (results, c) => {
  if (!results.success){
      return c.json(results.error, 400)
  }
}) ,createMenu_item)

//update Driver

menu_itemRouter.put("/menu_item/:id", updateMenu_item)

// delete Driver
menu_itemRouter.delete("/menu_item/:id", deleteMenu_item)