import { UserCreateInput } from "../generated/prisma/models/User.ts";
import prisma from "../config/prisma.ts";
import { Prisma } from "../generated/prisma/client.ts";
import { LoginInputType } from "../schemas/user/login.ts";
import passwordUtil from "../utils/password/passwordUtil.ts";

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

const login = async (data: LoginInputType) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                username: data.username,
            },
        });

        if (!user || user.deleteAt) {
            throw new Error("INVALID_CREDENTIALS");
        }

        const isValid = await passwordUtil.verifyPassword(data.password, user.password);
        if (!isValid) {
            throw new Error("INVALID_CREDENTIALS");
        }

    } catch (error) {

    }
};

export default {
    createUser,
    login,
};
