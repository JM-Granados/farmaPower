// Importa 'RequestHandler' desde 'express'. 
// 'RequestHandler' es un tipo que define la firma de una función middleware en Express, la cual recibe los objetos 'req', 'res' y 'next'.
import { RequestHandler } from 'express';
import PharmacyUser from '../models/PharmacyUser'
import bcrypt from 'bcrypt'
import { cloudinary } from '../cloudinaryConfig';
import dotenv from 'dotenv';
dotenv.config();
import fs from 'fs';


interface MongoError extends Error {
    code?: number;  // Opcional porque no todos los errores tienen un código
}

export const signupUser: RequestHandler = async (req, res) => {
    try {

        let imageUrl = process.env.DEFAULT_USER_IMAGE_URL;
        let principalImage = false;

        if (req.file) {
            try {
                const result = await cloudinary.uploader.upload(req.file.path, {
                    folder: 'Users-images',
                });
                imageUrl = result.secure_url;  // Actualiza si el usuario ha subido una imagen
                fs.unlinkSync(req.file.path);
                principalImage = true;
            } catch (cloudError: unknown) {
                const error = cloudError as Error;  // Aserción de tipo a `Error`
                console.error("Cloudinary error:", error.message);
                return res.status(500).json({ message: "Failed to upload image to Cloudinary.", error: error.message });
            }
        }

        const newUser = new PharmacyUser({
            firstName: req.body.firstName,
            firstLastName: req.body.firstLastName,
            secondLastName: req.body.secondLastName,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role,
            imageUrl,
            principalImage,
            pharmacy: req.body.pharmacy
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
        } else {
            res.status(500).json({ message: "Unknown error occurred" });
        }
    }
}

export const modifyUser: RequestHandler = async (req, res) => {
    const { firstName, firstLastName, secondLastName, email, role, status } = req.body;
    console.log(req.body);

    try {
        // Encuentra al usuario por su email
        const user = await PharmacyUser.findOne({ email: email });

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Actualiza los campos de texto solo si son diferentes a los existentes
        let isChanged = false;
        if (firstName && user.firstName !== firstName) { user.firstName = firstName; isChanged = true; }
        if (firstLastName && user.firstLastName !== firstLastName) { user.firstLastName = firstLastName; isChanged = true; }
        if (secondLastName && user.secondLastName !== secondLastName) { user.secondLastName = secondLastName; isChanged = true; }
        if (email && user.email !== email) { user.email = email; isChanged = true; }
        if (role && user.role !== role) { user.role = role; isChanged = true; }
        if (status && user.status !== status) { user.status = status; isChanged = true; }

        // Procesa la nueva imagen si fue subida en el frontend
        if (req.file) { 
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'Users-images',
            });
            user.imageUrl = result.secure_url;  // Actualiza la URL de la imagen
            isChanged = true;
            
            // Cambia principalImage a true si es necesario
            if (!user.principalImage) {
                user.principalImage = true;
            }
        }

        // Guarda los cambios solo si se detectaron
        if (isChanged) {
            await user.save();
            res.status(200).json({ message: "User updated successfully", user });
        } else {
            res.status(200).json({ message: "No changes detected" });
        }
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: "Error updating user", error: error.message });
        } else {
            res.status(500).json({ message: "Unknown error occurred" });
        }
    }
};
