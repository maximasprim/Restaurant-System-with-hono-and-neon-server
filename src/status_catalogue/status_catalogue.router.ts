import { Hono } from "hono";
import { createStatus_catalogue, getSingleStatus_catalogue, listStatus_catalogue, updateStatus_catalogue, deleteStatus_catalogue } from "./status_catalogue.controller";
import {zValidator} from "@hono/zod-validator"
import { type Context } from "hono";
import { status_catalogueSchema } from "../validators";



//creating hono instance

export const status_catalogueRouter = new Hono();

//get status_catalogues
status_catalogueRouter.get("/status_catalogues", listStatus_catalogue)

//get a single Status_catalogue    

status_catalogueRouter.get("/status_catalogues/:id", getSingleStatus_catalogue)

// 

//create Status_catalogue

status_catalogueRouter.post("/status_catalogues", zValidator('json', status_catalogueSchema, (results, c) => {
  if (!results.success){
      return c.json(results.error, 400)
  }
}) ,createStatus_catalogue)

//update Status_catalogue

status_catalogueRouter.put("/status_catalogues/:id", updateStatus_catalogue)

// delete Driver
status_catalogueRouter.delete("/status_catalogues/:id", deleteStatus_catalogue)