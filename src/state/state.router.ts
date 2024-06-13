import { Hono } from "hono";
import { createState, getSingleState, listState, updateState, deleteState } from "./state.controller";
import {zValidator} from "@hono/zod-validator"
import { type Context } from "hono";
import { stateSchema } from "../validators";
import { adminRoleAuth, bothRolesAuth, userRoleAuth } from "../middleware/bearAuth";



//creating hono instance

export const stateRouter = new Hono();

//get states
stateRouter.get("/states", adminRoleAuth, listState)

//get a single State    

stateRouter.get("/states/:id",userRoleAuth, getSingleState)

// 

//create State

stateRouter.post("/states", zValidator('json', stateSchema, (results, c) => {
  if (!results.success){
      return c.json(results.error, 400)
  }
}) ,adminRoleAuth, createState)

//update State

stateRouter.put("/states/:id", bothRolesAuth, updateState)
// delete State
stateRouter.delete("/states/:id", adminRoleAuth, deleteState)