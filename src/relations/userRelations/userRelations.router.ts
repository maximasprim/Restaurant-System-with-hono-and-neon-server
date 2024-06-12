import { Hono } from 'hono';
import { listUserWithAddress, listUserWithComments, listuserWithDrivers, listsingleuserwithaddress } from './userRelations.controller';

export const userRelationsRouter = new Hono();

userRelationsRouter.get("/useraddressrelations", listUserWithAddress);

userRelationsRouter.get("/usercommentsrelations",listUserWithComments);

userRelationsRouter.get("/userdriversrelations",listuserWithDrivers);

userRelationsRouter.get("/singleuseraddressrelations/:id", listsingleuserwithaddress);