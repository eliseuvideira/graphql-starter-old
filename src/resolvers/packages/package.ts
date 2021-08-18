import { ObjectId } from "mongodb";
import { auth } from "../../functions/auth";
import { resolver } from "../../functions/resolver";
import { Package } from "../../models/Package";

interface PackageArgs {
  _id: string;
}

const _package = resolver<null, PackageArgs>(
  auth(),
  resolver(async (_, { _id }) => {
    const _package = await Package.findOne({ _id: new ObjectId(_id) });

    return _package;
  }),
);

export const resolvers = {
  Query: {
    package: _package,
  },
};
