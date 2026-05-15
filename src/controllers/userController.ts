import { Request, Response } from "express";
import { UserCreateInput } from "../generated/prisma/models/User.ts";
import userService from "../services/userService.ts";
import passwordUtil from "../utils/password/passwordUtil.ts";

const createUser = async (req: Request, res: Response) => {
    try {
        const { username, password, name, nickname, email, phoneNumber, birthdate, gender, role } =
            req.body;

        const userData: UserCreateInput = {
            username,
            password: await passwordUtil.hashedPassword(password) ,
            name,
            nickname,
            email,
            phoneNumber,
            birthdate: birthdate ? new Date(birthdate) : null,
            gender,
            role,
        };

        const newUser: UserCreateInput = await userService.createUser(userData);

        res.status(201).json(newUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "유저 생성 중 오류가 발생했습니다."})
    }
};

export default {
    createUser,
};
