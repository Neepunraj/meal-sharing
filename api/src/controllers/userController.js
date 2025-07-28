
import knex from '../database_client.js'
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";


function generateToken(userId, email, role) {
    const accessToken = jwt.sign(
        {
            userId,
            email,
            role,
        },
        process.env.JWT_SECRET,
        { expiresIn: "60m" }
    );
    const refreshToken = uuidv4();
    return { accessToken, refreshToken };
}

async function setToken(
    res,
    accessToken,
    refreshToken
) {
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 60 * 60 * 1000,
        domain: 'localhost'
    });
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 7 * 60 * 60 * 1000,
        domain: 'localhost'
    });
}

export async function createUser(req, res) {

    try {
        const { name, email, password } = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        const existingUser = await knex('user').where({ email }).first()
        if (existingUser) {
            res.status(401).json({
                success: false,
                error: 'Existing user Already exists'
            })
            return
        }
        const newUser = await knex('user').insert({
            name: name, email: email, password: hashedPassword, role: "USER"
        })
        res.status(200).json({
            success: true,
            message: 'user Created Successfully',
            userId: newUser.id
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error: error || 'error Occred' })
    }

}


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const extractCurrentUser = await knex('user').where({ email }).first()
        if (
            !extractCurrentUser ||
            !(await bcrypt.compare(password, extractCurrentUser.password))
        ) {
            res.status(401).json({
                success: false,
                error: "User with Email Address Not Found and invalid credential",
            });
            return;
        }

        const { accessToken, refreshToken } = generateToken(
            extractCurrentUser.id,
            extractCurrentUser.email,
            extractCurrentUser.role
        );
        await knex('user').where({ id: extractCurrentUser.id }).update({ refreshToken })

        await setToken(res, accessToken, refreshToken);
        res.status(200).json({
            success: true,
            message: "Login Successful",
            user: {
                id: extractCurrentUser.id,
                email: extractCurrentUser.email,
                name: extractCurrentUser.name,
                role: extractCurrentUser.role,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error || "Unable to Login ! Please try again Later",
        });
    }
};

export const logOut = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken) {
        await knex.user.updateMany({
            where: { refreshToken },
            data: { refreshToken: null },
        });
    }
    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        domain: "localhost",
        path: "/",
    });
    res.clearCookie("refreshToken", {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        domain: "localhost",
        path: "/",
    });
    res.json({
        success: true,
        message: "Logout Successfully",
    });
};
