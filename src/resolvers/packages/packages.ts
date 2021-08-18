import { auth } from "../../functions/auth";
import { resolver } from "../../functions/resolver";
import { Package } from "../../models/Package";

const packages = resolver(
  auth(),
  resolver(async () => {
    const packages = await Package.find().toArray();

    return packages;
  }),
);

export const resolvers = {
  Query: {
    packages,
  },
};
