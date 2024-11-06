import { Request, Response } from 'express';
import { cloudinary } from '../cloudinaryConfig';
import fs from 'fs';

// Controlador para subir solo la imagen a Cloudinary
export const uploadImageController = async (req: Request, res: Response) => {
    if (!req.file) return res.status(400).send("No se ha proporcionado una imagen.");

    try {
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'elegibleMedications-images',
        });

        fs.unlinkSync(req.file.path);  // Elimina el archivo temporal
        res.json({ url: result.secure_url });
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        res.status(500).send("Failed to upload image.");
    }
};