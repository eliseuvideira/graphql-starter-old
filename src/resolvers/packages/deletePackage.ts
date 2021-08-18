import { ObjectId } from "mongodb";
import { auth } from "../../functions/auth";
import { resolver } from "../../functions/resolver";
import { Package } from "../../models/Package";

interface DeletePackageArgs {
  _id: string;
}

const deletePackage = resolver<null, DeletePackageArgs>(
  auth(),
  resolver(async (_, { _id }) => {
    const _package = await Package.findOne({ _id: new ObjectId(_id) });

    if (!_package) {
      return null;
    }

    await Package.findOneAndDelete({ _id: new ObjectId(_id) });

    return _package;
  }),
);

export const resolvers = {
  Mutation: {
    deletePackage,
  },
};
