// Importa 'RequestHandler' desde 'express'. 
// 'RequestHandler' es un tipo que define la firma de una función middleware en Express, la cual recibe los objetos 'req', 'res' y 'next'.
import { RequestHandler } from 'express';
import PharmacyUser from '../models/PharmacyUser'
import dotenv from 'dotenv';
dotenv.config();
import { cloudinary } from '../cloudinaryConfig';
import fs from 'fs';


interface MongoError extends Error {
    code?: number;  // Opcional porque no todos los errores tienen un código
}

export const signupUser: RequestHandler = async (req, res) => {
    try {
        const { pharmacy, ...userData } = req.body;
        console.log(req.body);

        let imageUrl = process.env.DEFAULT_USER_IMAGE_URL;
        let principalImage = false;

        if (req.file) {
            try {
                const result = await cloudinary.uploader.upload(req.file.path, {
                    folder: 'PharmacyUsers-images', // Asegúrate de que este folder está configurado en Cloudinary
                });
                imageUrl = result.secure_url;
                fs.unlinkSync(req.file.path);
                principalImage = true;
            } catch (cloudError) {
                const error = cloudError as Error;
                console.error("Cloudinary error:", error.message);
                return res.status(500).json({ message: "Failed to upload image to Cloudinary.", error: error.message });
            }
        }

        const newPharmacyUser = new PharmacyUser({
            ...userData,
            imageUrl,
            principalImage,
            pharmacy: pharmacy
        });

        const savedPharmacyUser = await newPharmacyUser.save();
        res.status(201).json({
            message: "User registered successfully",
            userId: savedPharmacyUser._id
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
};

export const modifyUser: RequestHandler = async (req, res) => {
    const { userId, pharmacyId, ...updateData } = req.body;
    try {
        const pharmacyUser = await PharmacyUser.findById(userId);
        if (!pharmacyUser) {
            return res.status(404).json({ message: "Pharmacy user not found." });
        }
        Object.assign(pharmacyUser, updateData, { pharmacy: pharmacyId });
        await pharmacyUser.save();
        res.status(200).json({
            message: "Pharmacy user updated successfully",
            user: pharmacyUser
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: "Error updating user", error: error.message });
        } else {
            res.status(500).json({ message: "Unknown error occurred" });
        }    
    }
};

