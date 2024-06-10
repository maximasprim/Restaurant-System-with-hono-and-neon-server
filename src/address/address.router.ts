import { Hono } from "hono";
import { createAddress, getSingleAddress, listAddress, updateAddress, deleteAddress } from "./address.controller";
import {zValidator} from "@hono/zod-validator"
import { type Context } from "hono";
import { addressSchema } from "../validators";



//creating hono instance

export const addressRouter = new Hono();

//get states
addressRouter.get("/address", listAddress)

//get a single city    

addressRouter.get("/address/:id", getSingleAddress)



//create State

addressRouter.post("/address", zValidator('json', addressSchema, (results, c) => {
  if (!results.success){
      return c.json(results.error, 400)
  }
}) ,createAddress)

//update City

addressRouter.put("/address/:id", updateAddress)

// delete city
addressRouter.delete("/address/:id", deleteAddress)