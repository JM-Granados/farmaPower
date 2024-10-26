/**
 * @fileoverview Configuración centralizada para la aplicación.
 *
 * Este archivo gestiona la configuración de la aplicación, incluyendo la conexión a la base de datos.
 * Utiliza dotenv para cargar las variables de entorno desde un archivo `.env` ubicado en el directorio raíz
 * del proyecto, lo que facilita la configuración de parámetros importantes de forma segura y eficiente.
 *
 * Las configuraciones exportadas desde este archivo incluyen cadenas de conexión a bases de datos
 * y otras opciones de configuración que pueden ser requeridas por varios componentes de la aplicación.
 *
 * Uso:
 * - Importado por otros archivos del proyecto donde se necesitan acceso a las variables configuradas,
 *   como los scripts de conexión a la base de datos.
 *
 */

// Importa dotenv, una biblioteca para manejar variables de entorno.
import dotenv from 'dotenv';
// Carga y hace disponibles las variables de entorno definidas en el archivo .env en el proceso de Node.js.
dotenv.config();

// Exporta un objeto con configuraciones usadas a través de la aplicación.
export default {
    // MONGO_DB: Guarda la cadena de conexión de MongoDB obtenida de las variables de entorno.
    // Utiliza `process.env.MONGO_URI`, que debería ser definida en el archivo `.env`.
    MONGO_DB: process.env.MONGO_URI,
    MONGO_PORT: process.env.PORT
}
