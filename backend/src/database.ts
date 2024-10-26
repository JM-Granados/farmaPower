/**
 * @fileoverview Script de conexión a la base de datos MongoDB utilizando Mongoose.
 *
 * Este archivo realiza la conexión a una base de datos MongoDB especificada en las variables de entorno.
 * Utiliza la biblioteca Mongoose, un ODM (Object Data Modeling) popular para MongoDB y Node.js,
 * que facilita la definición de esquemas y la interacción con la base de datos.
 *
 * Este script es generalmente invocado al inicio de la aplicación para asegurar que la base de datos
 * esté conectada y disponible antes de que el servidor comience a aceptar solicitudes.
 *
 * Uso:
 * - Importado y ejecutado por archivos principales del servidor que requieren conexión a la base de datos.
 *
 */

// Importa Mongoose para interactuar con MongoDB.
import mongoose from 'mongoose';
// Importa la configuración desde el archivo `config` que contiene variables de entorno y configuraciones.
import config from './config';

// Función autoejecutable para realizar la conexión a la base de datos.
(async () => {
    try {
        // Intenta conectar a MongoDB usando la URL provista en la configuración.
        await mongoose.connect(config.MONGO_DB as string);
        // Mensaje de éxito que se muestra si la conexión es exitosa.
        console.log('Connection successful, sending ping...');
        // Asegura que db está definido antes de enviar el ping
        if (mongoose.connection.db) {
            const pingResult = await mongoose.connection.db.admin().command({ ping: 1 });
            console.log('Ping response:', pingResult);
        } else {
            console.log('Database object not available');
        }
        
    } catch (error) {
        // Captura y muestra en consola cualquier error que ocurra durante la conexión.
        console.log(error);
    }
})();
