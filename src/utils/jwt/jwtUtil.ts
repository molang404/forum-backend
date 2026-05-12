import jwt, { JwtPayload } from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SCERET || "";

export interface DecodedToken extends JwtPayload {
    id: number;
}

const generateToken = (userId: number) => {
    return jwt.sign({ id: userId }, SECRET_KEY, {
        expiresIn: "1d",
    })
};

const verifyToken = (token: string) => {
    return jwt.verify(token, SECRET_KEY) as DecodedToken;
};

export default {
    generateToken,
    verifyToken,
};