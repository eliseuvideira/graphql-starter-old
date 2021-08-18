import {
  ApolloContext,
  CustomContext,
} from "@ev-graphql/apollo/lib/functions/createApollo";
import { Loaders, loaders } from "./loaders";

export interface Context extends ApolloContext {
  loaders: Loaders;
}

export const context: CustomContext<Context> = { loaders };
