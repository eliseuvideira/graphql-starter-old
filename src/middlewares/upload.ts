import { graphqlUploadExpress } from "graphql-upload";

const MAX_FILE_SIZE = 50 * 1024 * 1024;
const MAX_FILES = 1;

export const upload = graphqlUploadExpress({
  maxFileSize: MAX_FILE_SIZE,
  maxFiles: MAX_FILES,
});
