import { TSDriver, driversTable } from "../../drizzle/schema";
import { db } from "../../drizzle/db";
import { Column, sql } from "drizzle-orm";
import { eq } from "drizzle-orm";


export const getDriverWithOrdersService = async (): Promise<TSDriver[] | null>=>{
    return await db.query.driversTable.findMany({
        with: {
            orders:{
                columns:{
                    id:true,
                    restaurant_id:true,
                    estimated_delivery_time:true,
                    actual_delivery_time:true
                }
            }
        }
    })
}