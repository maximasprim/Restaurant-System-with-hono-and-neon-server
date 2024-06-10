import { Hono } from "hono";
import { createCategory, getSingleCategory, listCategory, updateCategory, deleteCategory } from "./category.controller";
import {zValidator} from "@hono/zod-validator"
import { type Context } from "hono";
import { categorySchema } from "../validators";



//creating hono instance

export const categoryRouter = new Hono();

//get states
categoryRouter.get("/category", listCategory)

//get a single Driver    

categoryRouter.get("/category/:id", getSingleCategory)



//create State

categoryRouter.post("/category", zValidator('json', categorySchema, (results, c) => {
  if (!results.success){
      return c.json(results.error, 400)
  }
}) ,createCategory)

//update Driver

categoryRouter.put("/category/:id", updateCategory)

// delete Driver
categoryRouter.delete("/category/:id", deleteCategory)