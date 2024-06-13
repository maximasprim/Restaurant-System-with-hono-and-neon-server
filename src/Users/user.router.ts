import { Hono } from "hono";
import { createUser, getSingleUser, listUsers, updateUser, deleteUser, nameslike } from "./user.controller";
import {zValidator} from "@hono/zod-validator"
import { type Context } from "hono";
import { userSchema } from "../validators";
import { adminRoleAuth, userRoleAuth } from "../middleware/bearAuth";



//creating hono instance

export const userRouter = new Hono();

// get states
userRouter.get("/users", adminRoleAuth, listUsers)

//get a single user    

userRouter.get("/users/:id", userRoleAuth, getSingleUser)

// 

//create a user

userRouter.post("/users", zValidator('json', userSchema, (results, c) => {
  if (!results.success){
      return c.json(results.error, 400)
  }
}) ,createUser)

//update user

userRouter.put("/users/:id", updateUser)

// delete Driver
userRouter.delete("/users/:id", deleteUser)

// get user with name begin with..
userRouter.get("/nameslike", nameslike)