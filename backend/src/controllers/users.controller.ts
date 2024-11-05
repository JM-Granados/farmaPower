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
            role: req.body.role,
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

// Define 'recoverPassword' como una función asíncrona que cumple con la firma de 'RequestHandler'.
export const passRecovery: RequestHandler = async (req, res) => {
    const { email, newPassword } = req.body;  // Obtiene el correo electrónico y la nueva contraseña del cuerpo de la solicitud.

    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(200).json({ message: "Email not found." });
        }

        // Actualiza la contraseña del usuario en la base de datos.
        user.password = newPassword;
        await user.save();

        res.status(200).json({ message: "Password updated successfully." });
    } catch (error) {
        const mongoError = error as MongoError;
        if (error instanceof Error) {
            if (error.message == "User validation failed: password: Password is not strong enough.") {
                res.status(200).json({ message: "Update error: Password is not strong enough." });
            } else {
                res.status(400).json({ message: "Update error: ", error: error.message });
            }
        }  else {
            res.status(500).json({ message: "Unknown error occurred" });
        }
    }
}

export const getAllUsers: RequestHandler = async (req, res) => {
    try {
        // Buscar todos los usuarios en la base de datos y seleccionar campos específicos
        const users = await User.find({}).select('firstName firstLastName secondLastName email role status createdAt');
        
        // Enviar la lista de usuarios al frontend
        res.status(200).json(users);
    } catch (error) {
        // Manejar posibles errores de la base de datos
        if (error instanceof Error) {
            res.status(500).json({ message: "Error retrieving users: ", error: error.message });
        } else {
            res.status(500).json({ message: "Unknown error occurred" });
        }
    }
};

export const getUsersSearched: RequestHandler = async (req, res) => {
    try {
        // Obtiene el término de búsqueda del query string y asegura que sea un string
        const search = typeof req.query.search === 'string' ? req.query.search : '';

        // Asegúrate de que search no es solo espacios en blanco o vacío
        if (!search.trim()) {
            return res.status(400).json({ message: "Search query cannot be empty." });
        }

        const query = {
            $or: [
                { firstName: { $regex: `^${search}`, $options: 'i' } },
                { firstLastName: { $regex: `^${search}`, $options: 'i' } },
                { secondLastName: { $regex: `^${search}`, $options: 'i' } },
                { email: { $regex: `^${search}`, $options: 'i' } }
            ]
        };

        const users = await User.find(query).select('firstName firstLastName secondLastName email role status createdAt');

        // Enviar la lista de usuarios al frontend
        res.status(200).json(users);
    } catch (error) {
        // Manejar posibles errores de la base de datos
        if (error instanceof Error) {
            res.status(500).json({ message: "Error retrieving users: ", error: error.message });
        } else {
            res.status(500).json({ message: "Unknown error occurred" });
        }
    }
}

export const modifyUser: RequestHandler = async (req, res) => {
    const { firstName, firstLastName, secondLastName, email, role, status } = req.body;

    console.log(email);

    try {
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(200).json({ message: "User not found." });
        }

        // Actualiza los campos solo si son diferentes a los existentes
        let isChanged = false;
        if (firstName && user.firstName !== firstName) { user.firstName = firstName; isChanged = true; }
        if (firstLastName && user.firstLastName !== firstLastName) { user.firstLastName = firstLastName; isChanged = true; }
        if (secondLastName && user.secondLastName !== secondLastName) { user.secondLastName = secondLastName; isChanged = true; }
        if (email && user.email !== email) { user.email = email; isChanged = true; }
        if (role && user.role !== role) { user.role = role; isChanged = true; }
        if (status && user.status !== status) { user.status = status; isChanged = true; }

        if (isChanged) {
            await user.save();
            res.status(200).json({ message: "User updated successfully", user });
        } else {
            res.status(200).json({ message: "No changes detected" });
        }
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: "Error updating user: ", error: error.message });
        } else {
            res.status(500).json({ message: "Unknown error occurred" });
        }
    }
};
