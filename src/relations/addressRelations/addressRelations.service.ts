import { TSAddress, addressTable } from "../../drizzle/schema";
import { db } from "../../drizzle/db";
import { Column, sql } from "drizzle-orm";
import { eq } from "drizzle-orm";

export const getAddressWithOrdersService = async (): Promise<
  TSAddress[] | null
> => {
  return await db.query.addressTable.findMany({
    with: {
      orders: {
        columns: {
          restaurant_id: true,
          estimated_delivery_time: true,
          actual_delivery_time: true,
          price: true,
          discount:true,
          final_price:true
        }
      }
    }
  })
}

export const getAddressWithCityService = async (): Promise<TSAddress[] | null> =>{
    return await db.query.addressTable.findMany({
        with:{
            city:{
                columns:{
                    name:true,
                    state_id:true
                }
            }
        }
    })

}