import { Hono } from "hono";
import { createComment, getSingleComment, listComment, updateComment, deleteComment } from "./comments.controller";
import {zValidator} from "@hono/zod-validator"
import { type Context } from "hono";
import { commentsSchema } from "../validators";



//creating hono instance

export const commentsRouter = new Hono();

//get states
commentsRouter.get("/comments", listComment)

//get a single Driver    

commentsRouter.get("/comments/:id", getSingleComment)



//create State

commentsRouter.post("/comments", zValidator('json', commentsSchema, (results, c) => {
  if (!results.success){
      return c.json(results.error, 400)
  }
}) ,createComment)

//update Driver

commentsRouter.put("/comments/:id", updateComment)

// delete Driver
commentsRouter.delete("/comments/:id", deleteComment)