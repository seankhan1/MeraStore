import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const SECRET_ACCESS_TOKEN = process.env.SECRET_ACCESS_TOKEN;

const authorization = async (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.json({
            status: "Failed",
            message: "Authorization header is missing.",
        });
    }

    const [bearer, accessToken] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !accessToken) {
        return res.status(401).json({
            status: "Failed",
            message: "Invalid authorization format. Use 'Bearer token'.",
        });
    }

    try {
        const user = jwt.verify(accessToken, SECRET_ACCESS_TOKEN);
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            status: "Failed",
            message: "Unauthorized User.",
        });
    }
};

export default authorization;
