import { mongodb } from "./mongodb";

export const database = mongodb.db(process.env.MONGODB_DATABASE);
