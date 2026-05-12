import { UserCreateInput } from "../generated/prisma/models/User.ts";
import prisma from "../config/prisma.ts";
import { Prisma } from "../generated/prisma/client.ts";

const createUser = async (data: UserCreateInput) => {
    try {
        return await prisma.user.create({
            data,
        });
        // 에러 Prisma
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                const errorMassage = error.message;

                if (errorMassage.includes("username")) {
                    throw new Error("ALREADY_EXISTS_USERNAME");
                }
                if (errorMassage.includes("email")) {
                    throw new Error("ALREADY_EXISTS_EMAIL");
                }
                if (errorMassage.includes("nickname")) {
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
