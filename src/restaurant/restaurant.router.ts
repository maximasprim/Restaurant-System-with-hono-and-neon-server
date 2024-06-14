import { Hono } from "hono";
import { createRestaurant, getSingleRestaurant, listRestaurant, updateRestaurant, deleteRestaurant } from "./restaurant.controller";
import {zValidator} from "@hono/zod-validator"
import { type Context } from "hono";
import { restaurantSchema } from "../validators";
import { adminRoleAuth, bothRolesAuth, userRoleAuth } from "../middleware/bearAuth";



//creating hono instance

export const restaurantRouter = new Hono();

//get states
restaurantRouter.get("/restaurant", adminRoleAuth,listRestaurant)

//get a single Driver    

restaurantRouter.get("/restaurant/:id", userRoleAuth,getSingleRestaurant)



//create State

restaurantRouter.post("/restaurant", zValidator('json', restaurantSchema, (results, c) => {
  if (!results.success){
      return c.json(results.error, 400)
  }
}) ,adminRoleAuth,createRestaurant)

//update Driver

restaurantRouter.put("/restaurant/:id", bothRolesAuth,updateRestaurant)

// delete Driver
restaurantRouter.delete("/restaurant/:id", adminRoleAuth,deleteRestaurant)