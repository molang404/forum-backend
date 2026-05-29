import { Request, Response } from "express";

const createUser = async (req: Request, res: Response) => {
    try {
        const { username, password, nickname, name, email, phoneNumber, birthdate, gender, role } =
            req.body;

        
    } catch {}
};

export default {
    createUser,
};
