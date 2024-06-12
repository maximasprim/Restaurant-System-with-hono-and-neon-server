import { Hono } from 'hono';
import { listDriversWithOrders } from './driverRelations.controller';


export const driverRelationsRouter = new Hono();


driverRelationsRouter.get("/driverordersRelations", listDriversWithOrders)
