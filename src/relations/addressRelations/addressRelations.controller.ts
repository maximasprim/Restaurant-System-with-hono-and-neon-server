import { Context } from "hono";
import {
  getAddressWithOrdersService,
  getAddressWithCityService,
} from "./addressRelations.service";

export const listaddressWithOrders = async (c: Context) => {
  const data = await getAddressWithOrdersService();
  if (data == null) {
    return c.text("address not Found", 404);
  }
  return c.json(data, 200);
};

export const listaddressWithCity = async (c: Context) => {
  const data = await getAddressWithCityService();
  if (data == null) {
    return c.text("address not Found", 404);
  }
  return c.json(data, 200);
};
