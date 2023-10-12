import { createMultipleUsers } from "../src/seeder/utils";

const main = async () => {
  const newUsers = await createMultipleUsers(14)
  return newUsers
};

main().then(console.log).catch(console.log);
