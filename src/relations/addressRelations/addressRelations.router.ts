import { Hono } from 'hono';
import { listaddressWithCity, listaddressWithOrders } from './addressRelations.controller';

export const addressRelationsRouter = new Hono();

addressRelationsRouter.get("/addressorderrelations", listaddressWithOrders);
addressRelationsRouter.get("/addresscityrelations", listaddressWithCity);
