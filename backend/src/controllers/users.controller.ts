// Importa 'RequestHandler' desde 'express'. 
// 'RequestHandler' es un tipo que define la firma de una función middleware en Express, la cual recibe los objetos 'req', 'res' y 'next'.
import { RequestHandler } from 'express';
import User from '../models/User'
import bcrypt from 'bcrypt'


interface MongoError extends Error {
    code?: number;  // Opcional porque no todos los errores tienen un código
}

// Define 'loginUser' como una función asíncrona que cumple con la firma de 'RequestHandler'.
// Esta función está diseñada para manejar solicitudes HTTP para la ruta de login.
export const loginUser: RequestHandler = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Buscar al usuario por email
        const user = await User.findOne({ email: email });
        
        if (!user) {
            return res.status(200).json({ message: "Invalid credentials." });
        }
        
        // Comprobar si la contraseña proporcionada es correcta
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {

            return res.status(200).json({ message: "Invalid credentials." });
        }

        const returnUser = await User.findOne({ email: email }).select('-password');  // Excluye la contraseña en la consulta misma

        res.status(200).json({
            message: "User logged in successfully",
            user: returnUser  // Devuelve el usuario sin la contraseña
        });
    } catch (error) {
        // Manejar errores de manera más segura
        if (error instanceof Error) {
            res.status(500).json({ message: "Login error: ", error: error.message });
        } else {
            res.status(500).json({ message: "Unknown error occurred" });
        }
    }
}

export const signupUser: RequestHandler = async (req, res) => {
    try {
        const newUser = new User({
            firstName: req.body.firstName,
            firstLastName: req.body.firstLastName,
            secondLastName: req.body.secondLastName,
            email: req.body.email,
            password: req.body.password,
        });
        
        const savedUser = await newUser.save();
        res.status(200).json({
            message: "User registered successfully",
            userId: savedUser._id
        });
    } catch (error) {
        // Manejar errores como duplicación de email, errores de validación, etc.
        // Manejar errores de manera más segura
        const mongoError = error as MongoError;
        if (mongoError.code === 11000) {
            res.status(200).json({ message: "Registration error: Email already exists." });
        } else if (error instanceof Error) {
            if (error.message == "User validation failed: password: Password is not strong enough.") {
                res.status(200).json({ message: "Registration error: Password is not strong enough." });
            } else {
                res.status(400).json({ message: "Registration error: ", error: error.message });
            }
        }  else {
            res.status(500).json({ message: "Unknown error occurred" });
        }
    }
}