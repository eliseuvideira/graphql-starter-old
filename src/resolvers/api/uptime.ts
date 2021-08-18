import { resolver } from "../../functions/resolver";
import ms from "ms";

const uptime = resolver(async () => {
  const uptime = ms(process.uptime() * 1000);

  return uptime;
});

export const resolvers = {
  API: {
    uptime,
  },
};
