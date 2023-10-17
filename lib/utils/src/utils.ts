
export function addNumbers(...args: number[]) {
  return args.reduce((prev, curr) => {
    return prev + curr;
  }, 0);
}
