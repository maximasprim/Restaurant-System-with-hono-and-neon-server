import { Hono } from "hono";
import { createRestaurant_owner, getSingleRestaurant_owner, listRestaurant_owner, updateRestaurant_owner, deleteRestaurant_owner } from "./restaurant_owner.controller";
import {zValidator} from "@hono/zod-validator"
import { type Context } from "hono";
import { restaurant_ownerSchema } from "../validators";



//creating hono instance

export const restaurant_ownerRouter = new Hono();

//get states
restaurant_ownerRouter.get("/restaurant_owner", listRestaurant_owner)

//get a single Driver    

restaurant_ownerRouter.get("/restaurant_owner/:id", getSingleRestaurant_owner)



//create State

restaurant_ownerRouter.post("/restaurant_owner", zValidator('json', restaurant_ownerSchema, (results, c) => {
  if (!results.success){
      return c.json(results.error, 400)
  }
}) ,createRestaurant_owner)

//update Driver

restaurant_ownerRouter.put("/restaurant_owner/:id", updateRestaurant_owner)

// delete Driver
restaurant_ownerRouter.delete("/restaurant_owner/:id", deleteRestaurant_owner)