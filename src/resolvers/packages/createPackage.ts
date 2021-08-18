import { auth } from "../../functions/auth";
import { resolver } from "../../functions/resolver";
import { Package } from "../../models/Package";

interface CreatePackageArgs {
  input: {
    name: string;
    version: string;
    license: string;
    description: string;
    homepage: string;
    repository: string;
    downloads: number;
  };
}

const createPackage = resolver<null, CreatePackageArgs>(
  auth(),
  resolver(async (_, { input }) => {
    const inserted = await Package.insertOne({ ...input });

    const _package = await Package.findOne({ _id: inserted.insertedId });

    return _package;
  }),
);

export const resolvers = {
  Mutation: {
    createPackage,
  },
};
