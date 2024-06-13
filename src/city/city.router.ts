import { Hono } from "hono";
import { createCity, getSingleCity, listCity, updateCity, deleteCity } from "./city.controller";
import {zValidator} from "@hono/zod-validator"
import { type Context } from "hono";
import { citySchema } from "../validators";
import { adminRoleAuth, bothRolesAuth, userRoleAuth } from "../middleware/bearAuth";



//creating hono instance

export const cityRouter = new Hono();

//get states
cityRouter.get("/cities",bothRolesAuth, listCity)

//get a single city    

cityRouter.get("/cities/:id",userRoleAuth, getSingleCity)



//create State

cityRouter.post("/cities", zValidator('json', citySchema, (results, c) => {
  if (!results.success){
      return c.json(results.error, 400)
  }
}) ,adminRoleAuth,createCity)

//update City

cityRouter.put("/cities/:id",bothRolesAuth, updateCity)

// delete city
cityRouter.delete("/cities/:id",adminRoleAuth, deleteCity)