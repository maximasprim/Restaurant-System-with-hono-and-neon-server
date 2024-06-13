import { Hono } from "hono";
import { createDriver, getSingleDriver, listDriver, updateDriver, deleteDriver } from "./driver.controller";
import {zValidator} from "@hono/zod-validator"
import { type Context } from "hono";
import { driverSchema } from "../validators";
import { adminRoleAuth, bothRolesAuth, userRoleAuth } from "../middleware/bearAuth";



//creating hono instance

export const driverRouter = new Hono();

//get states
driverRouter.get("/drivers",bothRolesAuth, listDriver)

//get a single Driver    

driverRouter.get("/drivers/:id", userRoleAuth, getSingleDriver)



//create State

driverRouter.post("/drivers", zValidator('json', driverSchema, (results, c) => {
  if (!results.success){
      return c.json(results.error, 400)
  }
}) ,adminRoleAuth, createDriver)

//update Driver

driverRouter.put("/drivers/:id",bothRolesAuth, updateDriver)

// delete Driver
driverRouter.delete("/drivers/:id",adminRoleAuth, deleteDriver)