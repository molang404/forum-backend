import { Request, Response } from "express";
import { UserCreateInput } from "../generated/prisma/models/User.ts";
import userService from "../services/userService.ts";

const createUser = async (req: Request, res: Response) => {
    try {
    const { username, password, name, nickname, email, phoneNumber, birthdate, gender, role } = req.body;

    const userData: UserCreateInput = {
        username,
        password,
        name,
        nickname,
        email,
        phoneNumber,
        birthdate: birthdate ? new Date(birthdate) : null,
        gender,
        role,
    }

    const newUser: UserCreateInput = await userService.createUser(userData);

    res.status(201).json(newUser);

    } catch (error) {
        console.log(error);
    }
};

export default {
    createUser,
};