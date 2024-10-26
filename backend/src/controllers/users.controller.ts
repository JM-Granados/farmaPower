// Importa 'RequestHandler' desde 'express'. 
// 'RequestHandler' es un tipo que define la firma de una función middleware en Express, la cual recibe los objetos 'req', 'res' y 'next'.
import { RequestHandler } from 'express';

// Define 'loginUser' como una función asíncrona que cumple con la firma de 'RequestHandler'.
// Esta función está diseñada para manejar solicitudes HTTP para la ruta de login.
export const loginUser: RequestHandler = async (req, res) => {
    res.json('getting user')
}