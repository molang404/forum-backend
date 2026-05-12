import { UserCreateInput } from "../generated/prisma/models/User.ts";
import prisma from "../config/prisma.ts";
import { Prisma } from "../generated/prisma/client.ts";

const createUser = async (data: UserCreateInput) => {
    try {
        return prisma.user.create({
            data,
        });
        // 에러 Prisma
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                const target = error.meta?.target as string[];

                if (target?.includes("username")) {
                    throw new Error("ALREADY_EXISTS_USERNAME");
                }
                if (target?.includes("email")) {
                    throw new Error("ALREADY_EXISTS_EMAIL");
                }
                if (target?.includes("nickname")) {
                    throw new Error("ALREADY_EXISTS_NICKNAME");
                }
                throw new Error("UNKNOWN_ERROR");
            }
        }

        throw new Error("UNKNOWN_ERROR");
    }
};

export default {
    createUser,
};
