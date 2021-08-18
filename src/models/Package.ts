import { database } from "../utils/database";

export interface PackageProps {
  _id?: string;
  name: string;
  version: string;
  license: string;
  description: string;
  homepage: string;
  repository: string;
  downloads: number;
}

export const Package = database.collection("packages");
