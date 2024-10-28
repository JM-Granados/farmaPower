/**
 * @fileoverview Archivo principal del servidor para una aplicación Node.js utilizando Express y TypeScript.
 *
 * Este archivo configura el servidor web y establece conexiones iniciales a la base de datos.
 * Utiliza la biblioteca dotenv para manejar las variables de entorno, asegurando que la configuración
 * sensible no se almacene directamente en el código. Inicializa el servidor Express definido en './app'
 * y se conecta a una base de datos configurada en './database'.
 *
 * El servidor escucha en un puerto definido en las variables de entorno y responde a la ruta base
 * con un simple mensaje "Hello World with TypeScript!" para confirmar su operatividad.
 *
 * Uso:
 * - Este script se ejecuta para iniciar el servidor que escucha en el puerto especificado.
 * - Principalmente usado en un entorno de producción o desarrollo para servir la aplicación.
 *
 */

// Importa la biblioteca dotenv para manejar variables de entorno de manera segura.
import dotenv from 'dotenv';
// Carga las variables de entorno desde el archivo `.env` al proceso actual.
dotenv.config();

// Importa la configuración de la aplicación Express desde el archivo `app`.
import app from './app';
// Importa la configuración inicial de la base de datos.
import './database'

// Define una ruta base '/' y envía un mensaje de 'Hello World' como respuesta HTTP.
app.get('/', (req, res) => res.send('Hello World with TypeScript! :D'));

// Inicia el servidor para escuchar en el puerto especificado en las variables de entorno.
app.listen(app.get('port'), () => {
  // Imprime un mensaje en la consola indicando en qué puerto está corriendo el servidor.
  console.log(`Server is running at`, app.get('port'));
});
