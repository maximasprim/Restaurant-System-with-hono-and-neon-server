import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import { TICategory,TSCategory,categoryTable } from "../drizzle/schema";



export const categoryService = async ():Promise<TSCategory[] | null> =>{
    return await db.query.categoryTable.findMany();

}

export const getCategoryService = async (id: number): Promise<TSCategory | undefined> => {
    return await db.query.categoryTable.findFirst({
        where: eq(categoryTable.id, id)
    })
}

export const createCategoryService = async (category: TICategory): Promise<TICategory> => {
    await db.insert(categoryTable).values(category)
    return category;
}

export const updateCategoryService = async (id: number, category: TICategory) => {
    await db.update(categoryTable).set(category).where(eq(categoryTable.id, id))
    return "Category updated successfully";
}

export const deleteCategoryService = async (id: number) => {
    await db.delete(categoryTable).where(eq(categoryTable.id, id))
    return "Category deleted successfully";
}