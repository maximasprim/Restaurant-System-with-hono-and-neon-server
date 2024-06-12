import { Hono } from 'hono';
import { listOrdersWithMenuItems } from './orderRelations.controller';

export const ordersRelationsRouter = new Hono();

ordersRelationsRouter.get("/orderMenuItemrelations", listOrdersWithMenuItems );
