import { Hono } from 'hono';
import { listUserWithAddress, listUserWithComments } from './userRelations.controller';

export const userRelationsRouter = new Hono();

userRelationsRouter.get("/useraddressrelations", listUserWithAddress);

userRelationsRouter.get("/usercommentsrelations",listUserWithComments);