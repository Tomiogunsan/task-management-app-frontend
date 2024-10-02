export const joinPath = (...args: (string | null)[]) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return args.filter((item) => ![null, undefined].includes(item)).join("/");
};
