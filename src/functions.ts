export const range = (len: number) => {
  const xs = []
  for (let i = 0; i < len; i++) {
    xs.push(i)
  }
  return xs;
};

export const wait = (ms: number) =>
  new Promise<void>(resolve => setTimeout(resolve, ms));
