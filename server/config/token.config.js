import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const SECRET_ACCESS_TOKEN = process.env.SECRET_ACCESS_TOKEN;
const SECRET_REFRESH_TOKEN = process.env.SECRET_REFRESH_TOKEN;

const tokenGenerator = (_id, email, admin) => {
    const accessToken = jwt.sign({ _id: _id, email, admin }, SECRET_ACCESS_TOKEN, { expiresIn: '1m' });
    const refreshToken = jwt.sign({ _id: _id, email, admin }, SECRET_REFRESH_TOKEN, { expiresIn: '10m' });
    return { accessToken, refreshToken };
};


const jwtVerify = (req, res) => {
    const { refreshToken } = req.body
    if (!refreshToken) {
        return res.status(401).json({
            status: "Failed",
            message: "Login or Create you account."
        });
    }

    try {
        jwt.verify(refreshToken, SECRET_REFRESH_TOKEN, async (err, user) => {
            if (err) {
                // throw Error
                return res.status(401).json({
                    status: "Failed",
                    message: "Login or Create you account."
                });
            }

            const accessToken = jwt.sign({ _id: user._id, email: user.email, admin: user.admin }, SECRET_ACCESS_TOKEN, {
                expiresIn: '1m'
            });

            return res.json({
                status: "Success",
                message: "User is authorized",
                accessToken,
                user
            });
        });
    } catch (error) {
        return res.status(500).json({
            status: "Failed",
            message: "Internal server error"
        });
    }
};


// const httpCookie = (res, accessToken, refreshToken) => {
//     res.cookie('accessToken', accessToken, {
//         httpOnly: true,
//         secure: true,
//         maxAge: 20000,
//         sameSite: 'strict'
//     });
//     res.cookie('refreshToken', refreshToken, {
//         httpOnly: true,
//         secure: true,
//         maxAge: 120000,
//         sameSite: 'strict'
//     });
// };

export { tokenGenerator, jwtVerify };

