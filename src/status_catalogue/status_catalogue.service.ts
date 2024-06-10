import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import { TIStatusCatalogue,TSStatusCatalogue,statusCatalogueTable } from "../drizzle/schema";



export const status_catalogueService = async ():Promise<TSStatusCatalogue[] | null> =>{
    return await db.query.statusCatalogueTable.findMany();

}

export const getStatus_catalogueService = async (id: number): Promise<TSStatusCatalogue | undefined> => {
    return await db.query.statusCatalogueTable.findFirst({
        where: eq(statusCatalogueTable.id, id)
    })
}

export const createStatus_catalogueService = async (status_catalogue: TIStatusCatalogue): Promise<TIStatusCatalogue> => {
    await db.insert(statusCatalogueTable).values(status_catalogue)
    return status_catalogue;
}

export const updateStatus_catalogueService = async (id: number, status_catalogue: TIStatusCatalogue) => {
    await db.update(statusCatalogueTable).set(status_catalogue).where(eq(statusCatalogueTable.id, id))
    return "Status_catalogue updated successfully";
}

export const deleteStatus_catalogueService = async (id: number) => {
    await db.delete(statusCatalogueTable).where(eq(statusCatalogueTable.id, id))
    return "Status_catalogue deleted successfully";
}