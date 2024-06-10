import { Context } from "hono";
import { commentService, getCommentService, createCommentService, updateCommentService, deleteCommentService } from "./comments.service";




export const listComment = async (c: Context) =>{
  const data = await commentService();
  if ( data == null){
    return c.text("comment not Found", 404)
  }
    return c.json(data, 200);
}

export const getSingleComment = async (c: Context) => {
  const id = parseInt(c.req.param("id"));
  if (isNaN(id)) 
      return c.text("invalid ID!", 400);

  const comment = await getCommentService(id);
  if (comment == undefined){
      return c.text(" not found!", 404);
  }
  return c.json(comment, 200);
} 

export const createComment = async (c: Context) => {
  try{
    const comment = await c.req.json();
    const createdComment = await createCommentService(comment);
   if (!createdComment){
    return c.text("Comment not created!", 404)
   }
    return c.json({msg: createdComment}, 201);
} catch (error: any){
    return c.json({error: error?.message}, 400)
}
}

export const updateComment = async (c: Context) => {
  const id = parseInt(c.req.param("id"));
  if (isNaN(id)) 
      return c.text("invalid ID!", 400);

  const comment = await c.req.json();
  try{
  //search for user
  const foundcomment = await getCommentService(id);
  if (foundcomment == undefined) 
      return c.text("driver not found!", 404);
  //get the data and update
  const res = await updateCommentService(id, comment);
  //return the updated user
  if (!res )
    return c.text("comment not updated!", 404); 
    return c.json({msg: res}, 201);

} catch (error: any){
    return c.json({error: error?.message}, 400)
}
}

//delete city
export const deleteComment =  async (c: Context) => {
  const id = Number(c.req.param("id"));
  if (isNaN(id)) 
      return c.text("invalid ID!", 400);

  try{

 //search for the user
 const comment = await getCommentService(id);
 if (comment == undefined) 
     return c.text("comment not found!👽", 404);
  //delete the user
  const res = await deleteCommentService(id);
  if (!res) return c.text("comment not deleted!👽", 404);

  return c.json({msg: res}, 201);

  }catch(error: any){
      return c.json({error: error?.message}, 400)
  }
}