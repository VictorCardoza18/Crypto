import { createAccessToken } from '../libs/jwt.js';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

export const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const userFound = await User.findOne({ email });
        if (userFound) return res.status(400).json(['Email already exists'])

        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: passwordHash
        });
        const userSaved = await newUser.save();
        const token = await createAccessToken({ id: userSaved._id, })

        res.cookie('token', token)
        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt
        })
    } catch (error) {
        res.status(500).json(['Error creating user'])
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userFound = await User.findOne({ email });
        if (!userFound) return res.status(400).json(['User not found'])

        const isMatch = await bcrypt.compare(password, userFound.password);
        if (!isMatch) return res.status(400).json(['Invalid password'])

        const token = await createAccessToken({ id: userFound._id, })

        res.cookie('token', token)
        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            isAdmin: userFound.isAdmin,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt
        })
    } catch (error) {
        res.status(500).json(['Error logging in'])
    }
}

export const logout = (req, res) => {
    res.cookie('token', "", { expires: new Date(0) })
    return res.sendStatus(200)
}

export const profile = async (req, res) => {
    console.log(req.user)

    const userFound = await User.findById(req.user.id)
    if (!userFound) return res.status(400).json(['User not found'])
    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt
    })
}

export const verifyToken = async (req, res) => {
    const { token } = req.cookies
    if (!token) return res.status(401).json(['Unauthorized'])
    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        if (err) return res.status(401).json(['Unauthorized'])

        const userFound = await User.findById(user.id)
        if (!userFound) return res.status(401).json(['Usuario no encontrado'])
        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            isAdmin: userFound.isAdmin,
        })
    })
}