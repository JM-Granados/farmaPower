/**
 * @fileoverview Configuración inicial de la aplicación Express.
 *
 * Este archivo configura la instancia de la aplicación Express, incluyendo la configuración del puerto
 * mediante variables de entorno. Se utilizan las mejores prácticas para manejar configuraciones sensibles
 * y realizar configuraciones iniciales necesarias para el funcionamiento del servidor.
 *
 * Uso:
 * - Este módulo exporta una instancia configurada de Express que será utilizada por otros módulos,
 *   especialmente el servidor principal, para iniciar la aplicación.
 *
 */

// Importa el módulo Express, que es un framework de servidor HTTP para Node.js.
import express from 'express';
// Importa dotenv, una librería para cargar variables de entorno desde un archivo .env.
import dotenv from 'dotenv';
// Importa la configuración desde el archivo `config` que contiene variables de entorno y configuraciones.
import config from './config';
// Importa Morgan para que cada vez que se pida algo lo indique en la consola
import morgan from 'morgan'
// Importa cors para especificar qué servidores piden cosas
import cors from 'cors'

//----------------------------------------------------------------------------------
// Importa las rutas que se utilizarán en el proyecto
import users from './routes/users'
import pharmacyUser from './routes/pharmacyUser'
import states from './routes/states'
import requests from './routes/requests'
import elegibleMedications from './routes/elegiblemedications'
import medications from './routes/medications'
import pharmacies from './routes/pharmacies'
import programs from './routes/programs'
import exchanges from './routes/exchanges'

//----------------------------------------------------------------------------------
// Carga las variables de entorno desde el archivo `.env` al entorno de ejecución.
dotenv.config();

//----------------------------------------------------------------------------------
// Crea una nueva instancia de una aplicación Express.
const app = express();

//----------------------------------------------------------------------------------
//CONFIG
// Establece el puerto de la aplicación basado en la variable de entorno PORT.
// Si no se especifica un puerto en las variables de entorno, usar el puerto por defecto de Express.
app.set('port', config.MONGO_PORT);
// Utiliza morgan para saber explícitamente las url que se visitan
app.use(morgan('dev'));
// Utiliza cors para decirle que cualquier servidor del frontend pude pedir cosas
app.use(cors({
    origin: process.env.FRONTEND_URL
}));
// app.use(cors()); //documentar esto cuando termine pruebas locales

// Utilizada para que se puedan entender las peticiones json como los post que vienen con datos
app.use(express.json());
// Para entender los post
app.use(express.urlencoded({ extended: true }));

//----------------------------------------------------------------------------------
//Crea las rutas
app.use('/api/users',users)
app.use('/api/pharmacyUser',pharmacyUser)
app.use('/api/requests',requests)
app.use('/api/elegiblemedications',elegibleMedications)
app.use('/api/exchanges', exchanges)
app.use('/api/medications', medications)
app.use('/api/pharmacies', pharmacies)
app.use('/api/programs', programs)
app.use('/api/states', states)

// Exporta la instancia de la aplicación para su uso en otros archivos, como el servidor principal.
export default app;
