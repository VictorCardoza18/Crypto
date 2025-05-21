import { createAccessToken } from '../libs/jwt.js';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

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

// Nuevo controlador para solicitar recuperación de contraseña
export const requestPasswordReset = async (req, res) => {
    const { email } = req.body;

    // Validar que el correo sea de Gmail
    if (!email.endsWith('@gmail.com')) {
        return res.status(400).json(['Solo se permiten correos de Gmail para recuperación de contraseña']);
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json(['No existe ninguna cuenta con este correo electrónico']);
        }

        // Generar token de restablecimiento
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpiry = Date.now() + 3600000; // Token válido por 1 hora

        // Guardar token en la base de datos
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = resetTokenExpiry;
        await user.save();

        // Configurar transporte de correo electrónico
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'victorcardozaescom@gmail.com', // Configurar en variables de entorno
                pass: 'aimg gpzv zlhr nvkb', // Configurar en variables de entorno
            },
        });

        // URL para restablecer contraseña
        const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password/${resetToken}`;

        // Opciones del correo
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Recuperación de contraseña para Crypto App',
            html: `
                <h1>Recuperación de contraseña</h1>
                <p>Has solicitado restablecer tu contraseña.</p>
                <p>Haz clic en el siguiente enlace para establecer una nueva contraseña:</p>
                <a href="${resetUrl}">Restablecer contraseña</a>
                <p>Este enlace expirará en 1 hora.</p>
                <p>Si no solicitaste este cambio, puedes ignorar este correo.</p>
            `,
        };

        // Enviar correo
        await transporter.sendMail(mailOptions);

        res.status(200).json(['Se ha enviado un enlace de recuperación a tu correo electrónico']);
    } catch (error) {
        console.error('Error al solicitar restablecimiento de contraseña:', error);
        res.status(500).json(['Error al procesar la solicitud de recuperación de contraseña']);
    }
};

// Controlador para restablecer la contraseña
export const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        // Buscar usuario con el token válido
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json(['El token de recuperación es inválido o ha expirado']);
        }

        // Actualizar contraseña
        const passwordHash = await bcrypt.hash(newPassword, 10);
        user.password = passwordHash;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.status(200).json(['Contraseña actualizada correctamente']);
    } catch (error) {
        console.error('Error al restablecer contraseña:', error);
        res.status(500).json(['Error al restablecer la contraseña']);
    }
};