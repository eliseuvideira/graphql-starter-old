import { ObjectId } from "mongodb";
import { auth } from "../../functions/auth";
import { resolver } from "../../functions/resolver";
import { Package } from "../../models/Package";

interface UpdatePackageArgs {
  _id: string;
  input: {
    name?: string;
    version?: string;
    license?: string;
    description?: string;
    homepage?: string;
    repository?: string;
    downloads?: number;
  };
}

const updatePackage = resolver<null, UpdatePackageArgs>(
  auth(),
  resolver(async (_, { _id, input }) => {
    const updated = await Package.findOneAndUpdate(
      { _id: new ObjectId(_id) },
      { $set: { ...input } },
    );

    const _package = updated.value;

    return _package;
  }),
);

export const resolvers = {
  Mutation: {
    updatePackage,
  },
};
