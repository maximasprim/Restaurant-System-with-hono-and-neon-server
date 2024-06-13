import { Context } from "hono";
import { usersService, getUserService, createUserService, updateUserService, deleteUserService, userNamelike } from "./user.service";




export const listUsers = async (c: Context) =>{
  const data = await usersService();
  if ( data == null){
    return c.text("User not Found", 404)
  }
    return c.json(data, 200);
}

//get users with name begin with..
export const nameslike= async (c: Context) => {
  try{
      const userName = String(c.req.query('userName'))
  
      const data = await userNamelike(userName);
      if (data == null || data.length == 0) {
          return c.text("cityName not found", 404)
      }
      return c.json(data, 200);
  }catch (error: any) {
      return c.json({ error: error?.message }, 400)
  }
  }


export const getSingleUser = async (c: Context) => {
  const id = parseInt(c.req.param("id"));
  if (isNaN(id)) 
      return c.text("invalid ID!", 400);

  const user = await getUserService(id);
  if (user == undefined){
      return c.text("user not found!", 404);
  }
  return c.json(user, 200);
} 

export const createUser = async (c: Context) => {
  try{
    const user = await c.req.json();
    const createdUser = await createUserService(user);
   if (!createdUser){
    return c.text("user not created!", 404)
   }
    return c.json({msg: createdUser}, 201);
} catch (error: any){
    return c.json({error: error?.message}, 400)
}
}

export const updateUser = async (c: Context) => {
  const id = parseInt(c.req.param("id"));
  if (isNaN(id)) 
      return c.text("invalid ID!", 400);

  const user = await c.req.json();
  try{
  //search for user
  const founduser = await getUserService(id);
  if (founduser == undefined) 
      return c.text("user not found!", 404);
  //get the data and update
  const res = await updateUserService(id, user);
  //return the updated user
  if (!res )
    return c.text("user not updated!", 404); 
    return c.json({msg: res}, 201);

} catch (error: any){
    return c.json({error: error?.message}, 400)
}
}

//delete user
export const deleteUser =  async (c: Context) => {
  const id = Number(c.req.param("id"));
  if (isNaN(id)) 
      return c.text("invalid ID!", 400);

  try{

 //search for the user
 const user = await getUserService(id);
 if (user == undefined) 
     return c.text("User not found!👽", 404);
  //delete the user
  const res = await deleteUserService(id);
  if (!res) return c.text("User not deleted!👽", 404);

  return c.json({msg: res}, 201);

  }catch(error: any){
      return c.json({error: error?.message}, 400)
  }
}