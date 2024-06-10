import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import { TIComment,TSComment,commentTable } from "../drizzle/schema";



export const commentService = async ():Promise<TSComment[] | null> =>{
    return await db.query.commentTable.findMany();

}

export const getCommentService = async (id: number): Promise<TSComment | undefined> => {
    return await db.query.commentTable.findFirst({
        where: eq(commentTable.id, id)
    })
}

export const createCommentService = async (comment: TIComment): Promise<TIComment> => {
    await db.insert(commentTable).values(comment)
    return comment;
}

export const updateCommentService = async (id: number, comment: TIComment) => {
    await db.update(commentTable).set(comment).where(eq(commentTable.id, id))
    return "Comment updated successfully";
}

export const deleteCommentService = async (id: number) => {
    await db.delete(commentTable).where(eq(commentTable.id, id))
    return "Comment deleted successfully";
}