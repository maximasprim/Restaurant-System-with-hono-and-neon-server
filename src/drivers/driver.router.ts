import { Hono } from "hono";
import { createDriver, getSingleDriver, listDriver, updateDriver, deleteDriver } from "./driver.controller";
import {zValidator} from "@hono/zod-validator"
import { type Context } from "hono";
import { driverSchema } from "../validators";



//creating hono instance

export const driverRouter = new Hono();

//get states
driverRouter.get("/drivers", listDriver)

//get a single Driver    

driverRouter.get("/drivers/:id", getSingleDriver)



//create State

driverRouter.post("/drivers", zValidator('json', driverSchema, (results, c) => {
  if (!results.success){
      return c.json(results.error, 400)
  }
}) ,createDriver)

//update Driver

driverRouter.put("/drivers/:id", updateDriver)

// delete Driver
driverRouter.delete("/drivers/:id", deleteDriver)