import { Request, Response } from "express";
import { UserCreateInput } from "../generated/prisma/models/User.ts";
import userService from "../services/userService.ts";
import passwordUtil from "../utils/password/passwordUtil.ts";
import {LoginInputType} from "../schemas/user/login.ts";

const createUser = async (req: Request, res: Response) => {
    try {
        // 요청 가공
        const { username, password, name, nickname, email, phoneNumber, birthdate, gender, role } =
            req.body;

        const userData: UserCreateInput = {
            username,
            password: await passwordUtil.hashPassword(password),
            name,
            nickname,
            email,
            phoneNumber,
            birthdate: birthdate ? new Date(birthdate) : null,
            gender,
            role,
        };

        const newUser = await userService.createUser(userData);

        // 응답
        res.status(201).json(newUser);
        // 에러 (자바스크립트 표준)
    } catch (error) {
        if (error instanceof Error) {
            switch (error.message) {
                case "ALREADY_EXISTS_USERNAME":
                    res.status(409).json({ error: "이미 사용중인 아이디입니다." });
                    return;
                case "ALREADY_EXISTS_EMAIL":
                    res.status(409).json({ error: "이미 사용중인 이메일입니다."});
                    return;
                case "ALREADY_EXISTS_NICKNAME":
                    res.status(409).json({ error: "이미 사용중인 닉네임입니다."});
                    return;
                default:
                    console.log(error);
                    res.status(500).json({ message: "유저 생성 중 오류가 발생했습니다." });
            }
        }

        console.log(error);
        res.status(500).json({ message: "유저 생성 중 오류가 발생했습니다." });
    }
};

const login = async (req: Request, res: Response) => {
    const loginData: LoginInputType = req.body;

    const result = await userService.login(loginData);
};

export default {
    createUser,
    login,
};
