import { MongoClient } from "mongodb";

const AUTH = `${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}`;
const ADDRESS = `${process.env.MONGODB_SERVER}:${process.env.MONGODB_PORT}`;
const URI = `${process.env.MONGODB_PROTOCOL}://${AUTH}@${ADDRESS}`;

export const database = new MongoClient(URI);
