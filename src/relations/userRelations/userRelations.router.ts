import { Hono } from 'hono';
import { listUserWithAddress } from './userRelations.controller';

export const userRelationsRouter = new Hono();

userRelationsRouter.get("/useraddressrelations", listUserWithAddress);