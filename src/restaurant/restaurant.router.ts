import { Hono } from "hono";
import { createRestaurant, getSingleRestaurant, listRestaurant, updateRestaurant, deleteRestaurant } from "./restaurant.controller";
import {zValidator} from "@hono/zod-validator"
import { type Context } from "hono";
import { restaurantSchema } from "../validators";



//creating hono instance

export const restaurantRouter = new Hono();

//get states
restaurantRouter.get("/restaurant", listRestaurant)

//get a single Driver    

restaurantRouter.get("/restaurant/:id", getSingleRestaurant)



//create State

restaurantRouter.post("/restaurant", zValidator('json', restaurantSchema, (results, c) => {
  if (!results.success){
      return c.json(results.error, 400)
  }
}) ,createRestaurant)

//update Driver

restaurantRouter.put("/restaurant/:id", updateRestaurant)

// delete Driver
restaurantRouter.delete("/restaurant/:id", deleteRestaurant)