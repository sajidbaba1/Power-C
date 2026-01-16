import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient | null = null;

export const getPrisma = (): PrismaClient => {
    // If already created, return it
    if (prisma) return prisma;

    const url = process.env.DATABASE_URL || process.env.NEON_DATABASE_URL;

    // Check if we have a connection string
    if (!url) {
        console.warn("No DATABASE_URL found. Prisma features will be disabled.");

        // Recursive proxy to handle any property access like prisma.apiKey.findMany()
        const createProxy = (path: string): any => {
            return new Proxy(() => { }, {
                get: (target, prop) => {
                    if (prop === 'then') return undefined; // Handle async/await
                    return createProxy(`${path}.${String(prop)}`);
                },
                apply: (target, thisArg, args) => {
                    console.error(`Prisma error: Attempted to call ${path}() but no database is configured.`);
                    throw new Error(`Database not configured. Path: ${path}`);
                }
            });
        };

        return createProxy("prisma") as unknown as PrismaClient;
    }

    // Direct connection with config object
    try {
        // Use type-casting to bypass strict constructor checks that vary between Prisma versions
        const options: any = {
            datasourceUrl: url,
        };
        prisma = new PrismaClient(options);
        return prisma;
    } catch (e) {
        console.error("Failed to initialize PrismaClient:", e);
        throw e;
    }
};
