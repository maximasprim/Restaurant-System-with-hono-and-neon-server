import { Hono } from "hono";
import { createAddress, getSingleAddress, listAddress, updateAddress, deleteAddress, limit} from "./address.controller";
import {zValidator} from "@hono/zod-validator"
import { type Context } from "hono";
import { addressSchema } from "../validators";
import { adminRoleAuth, bothRolesAuth, userRoleAuth } from "../middleware/bearAuth";



//creating hono instance

export const addressRouter = new Hono();

//get states
addressRouter.get("/address",adminRoleAuth, listAddress)

//get a single city    

addressRouter.get("/address/:id", userRoleAuth, getSingleAddress)



//create State

addressRouter.post("/address", zValidator('json', addressSchema, (results, c) => {
  if (!results.success){
      return c.json(results.error, 400)
  }
}) ,adminRoleAuth,createAddress)

//update City

addressRouter.put("/address/:id", bothRolesAuth,updateAddress)

// delete city
addressRouter.delete("/address/:id", adminRoleAuth,deleteAddress)

//limit address
addressRouter.get("/limitAddress", bothRolesAuth,limit)