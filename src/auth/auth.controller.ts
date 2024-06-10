import { Context } from "hono"
import { createAuthUserService } from "./auth.service";
import bycrpt from 'bcrypt';

export const registerUser = async (c: Context) =>{
    try{
        const user = await c.req.json();
        const pass = user.password;
        const hashedPassword = await bycrpt.hash(pass, 10);
        user.password = hashedPassword;

        const createdUser = await createAuthUserService(user);
        
       if (!createdUser){
        return c.text("user not created!", 404)
       }
        return c.json({msg: createdUser}, 201);
    } catch (error: any){
        return c.json({error: error?.message}, 400)
    }
}

export const loginUser = async (c: Context) =>{
    
}