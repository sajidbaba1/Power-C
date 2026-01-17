import { PrismaClient } from "../generated/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

// Force fresh client in dev to avoid stale model issues
let cachedClient: PrismaClient | null = null;

export const getPrisma = (): PrismaClient => {
    const url = process.env.DATABASE_URL || process.env.NEON_DATABASE_URL;

    if (!url) {
        const createProxy = (path: string): any => {
            return new Proxy(() => { }, {
                get: (target, prop) => {
                    if (prop === 'then') return undefined;
                    return createProxy(`${path}.${String(prop)}`);
                },
                apply: () => {
                    throw new Error(`Database connection not configured. Please check your DATABASE_URL environment variable.`);
                }
            });
        };
        return createProxy("prisma") as unknown as PrismaClient;
    }

    // In development, always create fresh client to pick up schema changes
    if (process.env.NODE_ENV === "development") {
        const pool = new Pool({ connectionString: url });
        const adapter = new PrismaPg(pool);
        const client = new PrismaClient({
            adapter,
            log: ["error", "warn"],
        });
        console.log("🔧 DEV: Fresh Prisma client created with models:", Object.keys(client).filter(k => !k.startsWith("_") && !k.startsWith("$")));
        return client;
    }

    // Production: use cached client
    if (!cachedClient) {
        const pool = new Pool({ connectionString: url });
        const adapter = new PrismaPg(pool);
        cachedClient = new PrismaClient({
            adapter,
            log: ["error"],
        });
    }

    return cachedClient;
};
