import { TSUsers, usersTable } from "../../drizzle/schema";
import { db } from "../../drizzle/db";
import { Column, sql } from "drizzle-orm";
import { eq } from "drizzle-orm";

export const getUserWithAddressService = async (): Promise<
  TSUsers[] | null
> => {
  return await db.query.usersTable.findMany({
    with: {
      addresses: {
        columns: {
          street_address_1: true,
          street_address_2: true,
          zip_code: true,
          delivery_instructions: true,
        },
      },
    },
  });
};

export const getUsersWithCommentsService = async (): Promise<
  TSUsers[] | null
> => {
  return await db.query.usersTable.findMany({
    with: {
      comments: {
        columns: {
          comment_text: true,
          is_complaint: true,
          is_praise: true,
        },
      },
    },
  });
};
export const getUserWithDriversService = async (): Promise<
  TSUsers[] | null
> => {
  return await db.query.usersTable.findMany({
    with: {
      drivers: {
        columns: {
          car_make: true,
          car_year: true,
        },
      },
    },
  });
};
export const getSingleUserWithAddress = async (id:number): Promise<TSUsers[] | null> =>{
    return await db.query.usersTable.findMany({
        where: eq(usersTable.id,id),
        with:{
            addresses: {
                columns: {
                  street_address_1: true,
                  street_address_2: true,
                  zip_code: true,
                  delivery_instructions: true,
                },
              },
            }
    })
}