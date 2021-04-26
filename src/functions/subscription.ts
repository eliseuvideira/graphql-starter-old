export const subscription = (
  fn: (parent: any, args: any, context: any) => any
) => ({ subscribe: fn });
