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

// Carga las variables de entorno desde el archivo `.env` al entorno de ejecución.
dotenv.config();

// Crea una nueva instancia de una aplicación Express.
const app = express();

// Establece el puerto de la aplicación basado en la variable de entorno PORT.
// Si no se especifica un puerto en las variables de entorno, usar el puerto por defecto de Express.
app.set('port', process.env.PORT || 3000);

// Exporta la instancia de la aplicación para su uso en otros archivos, como el servidor principal.
export default app;
