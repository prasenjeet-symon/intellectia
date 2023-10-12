import { createMultipleUsers } from '../src/seeder/utils';
import { PrismaClientSingleton } from '../src/utils';

const main = async () => {
    const newUsers = await createMultipleUsers(14);
    return newUsers;
};

main()
    .then(async () => {
        const prisma = PrismaClientSingleton.prisma;
        await prisma.$disconnect();
    })
    .catch(async () => {
        const prisma = PrismaClientSingleton.prisma;
        await prisma.$disconnect();
        process.exit(1);
    });
