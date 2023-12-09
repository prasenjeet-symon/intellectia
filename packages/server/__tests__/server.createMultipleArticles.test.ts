import { createMultipleArticles } from '@intellectia/server/seeder/utils';
import { PrismaClientSingleton } from '@intellectia/server/utils';

describe("execution of createMulripleArticles()", () => {
    test("Should resolve if any users in DB and reject if no users in DB", async () => {
        const prisma = PrismaClientSingleton.prisma;
        const users = await prisma.user.findMany();

        if (users.length > 0){
            await expect(createMultipleArticles(0,0)).resolves.not.toThrow();
        }else{
            await expect(createMultipleArticles(0,0)).rejects.toThrow();
        }
    });        
});

describe('createMulripleArticles() with range where min > max', () => {
    test("min 6 max 3", async () => {
        await expect(createMultipleArticles(6,3)).rejects.toThrow();
    });
    test("min 5 max 1", async () => {
        await expect(createMultipleArticles(5,1)).rejects.toThrow();
    });
    test("min 10 max 7", async () => {
        await expect(createMultipleArticles(10,7)).rejects.toThrow();
    });
});

describe('createMulripleArticles() with range where min < 0', () => {
    test("min -6 max 3", async () => {
        await expect(createMultipleArticles(-6,3)).rejects.toThrow();
    });
    test("min -5 max 1", async () => {
        await expect(createMultipleArticles(-5,1)).rejects.toThrow();
    });
    test("min -10 max 7", async () => {
        await expect(createMultipleArticles(-10,7)).rejects.toThrow();
    });
});

describe('createMulripleArticles() with range where max < 0', () => {
    test("min 6 max -3", async () => {
        await expect(createMultipleArticles(6,-3)).rejects.toThrow();
    });
    test("min 5 max -1", async () => {
        await expect(createMultipleArticles(5,-1)).rejects.toThrow();
    });
    test("min 10 max -7", async () => {
        await expect(createMultipleArticles(10,-7)).rejects.toThrow();
    });
});