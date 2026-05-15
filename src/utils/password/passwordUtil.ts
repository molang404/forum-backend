import bcrypt from "bcrypt";

const COUNT = 10;

const hashedPassword = async (password: string) => {
    return bcrypt.hash(password, COUNT);
}

const verifyPassword = async (plainPassword: string, hashedPassword: string) => {
    return bcrypt.compare(plainPassword, hashedPassword);
}

export default {
    hashedPassword,
    verifyPassword,
}
