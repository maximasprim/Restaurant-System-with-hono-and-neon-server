import { Context } from "hono";
import { categoryService, getCategoryService, createCategoryService, updateCategoryService, deleteCategoryService } from "./category.service";




export const listCategory = async (c: Context) =>{
  const data = await categoryService();
  if ( data == null){
    return c.text("category not Found", 404)
  }
    return c.json(data, 200);
}

export const getSingleCategory = async (c: Context) => {
  const id = parseInt(c.req.param("id"));
  if (isNaN(id)) 
      return c.text("invalid ID!", 400);

  const category = await getCategoryService(id);
  if (category == undefined){
      return c.text(" not found!", 404);
  }
  return c.json(category, 200);
} 

export const createCategory = async (c: Context) => {
  try{
    const category = await c.req.json();
    const createdCategory = await createCategoryService(category);
   if (!createdCategory){
    return c.text("Category not created!", 404)
   }
    return c.json({msg: createdCategory}, 201);
} catch (error: any){
    return c.json({error: error?.message}, 400)
}
}

export const updateCategory = async (c: Context) => {
  const id = parseInt(c.req.param("id"));
  if (isNaN(id)) 
      return c.text("invalid ID!", 400);

  const category = await c.req.json();
  try{
  //search for user
  const foundcategory = await getCategoryService(id);
  if (foundcategory == undefined) 
      return c.text("Category not found!", 404);
  //get the data and update
  const res = await updateCategoryService(id, category);
  //return the updated category
  if (!res )
    return c.text("Category not updated!", 404); 
    return c.json({msg: res}, 201);

} catch (error: any){
    return c.json({error: error?.message}, 400)
}
}

//delete city
export const deleteCategory =  async (c: Context) => {
  const id = Number(c.req.param("id"));
  if (isNaN(id)) 
      return c.text("invalid ID!", 400);

  try{

 //search for the category
 const city = await getCategoryService(id);
 if (city == undefined) 
     return c.text("Category not found!👽", 404);
  //delete the user
  const res = await deleteCategoryService(id);
  if (!res) return c.text("Category not deleted!👽", 404);

  return c.json({msg: res}, 201);

  }catch(error: any){
      return c.json({error: error?.message}, 400)
  }
}