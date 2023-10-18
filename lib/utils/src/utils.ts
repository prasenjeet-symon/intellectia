export function addNumbers(...args: number[]) {
  return args.reduce((prev, curr) => {
    return prev + curr;
  }, 0);
}

/**
 * Password validator
 */
export function validatorPassword(password: string) {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}
