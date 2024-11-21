/**
 * @fileoverview Modelo de usuario para MongoDB utilizando Mongoose.
 *
 * Este archivo define la estructura del modelo de usuario que se utiliza para interactuar
 * con la colección de usuarios en la base de datos MongoDB a través de Mongoose. 
 * El esquema define campos esenciales como nombres, email, contraseña, rol y estado,
 * con validaciones específicas para asegurar la integridad y la unicidad de los datos.
 *
 * Detalles del esquema:
 * - `firstName`, `firstLastName`, `secondLastName`: Campos para el nombre y apellidos del usuario,
 *   requeridos y configurados para eliminar espacios extra al principio y final.
 * - `email`: Campo para el correo electrónico del usuario, debe ser único y también se eliminan
 *   espacios extra.
 * - `password`: Campo para la contraseña, requerido y con eliminación de espacios extra.
 * - `role`: Define el rol del usuario dentro de la aplicación con valores posibles 'user' o 'admin',
 *   siendo 'user' el valor predeterminado.
 * - `status`: Indica el estado del usuario en la aplicación, con valores 'active' o 'inactive',
 *   siendo 'active' el valor predeterminado.
 *
 * Configuraciones adicionales:
 * - `versionKey` está desactivado para evitar la creación del campo __v que Mongoose utiliza
 *   para la versión del documento.
 * - `timestamps`: Habilita la creación automática de los campos `createdAt` y `updatedAt`
 *   para rastrear cuándo se crean o modifican los documentos.
 *
 * Este modelo es esencial para la gestión de usuarios en la aplicación, permitiendo realizar
 * operaciones CRUD básicas y proporcionando una base para la autenticación y gestión de roles.
 */


// Importa 'Schema' y 'model' desde el paquete 'mongoose'.
// 'Schema' es utilizado para definir la estructura de los documentos dentro de una colección.
// 'model' es utilizado para proporcionar una interfaz a la base de datos para crear, consultar, actualizar, eliminar registros, etc.
import { Schema, model } from 'mongoose';
const Pharmacy = require('./Pharmacy'); 
import bcrypt from 'bcrypt'

// considerando la posibilidad de manejar estos valores de manera más dinámica, especialmente si se espera que la lista de roles pueda 
// crecer o cambiar en el futuro. 
const roles = ['Pharmacy'];
const userStatuses = ['Activated', 'Deactivated'];

// Define 'userSchema' como una nueva instancia de Schema para modelar los datos de usuario.
const pharmacyUserSchema = new Schema({
    firstName: {
        type: String,       // Especifica el tipo de dato como String.
        required: true,     // Hace este campo obligatorio.
        trim: true,          // Aplica la función trim para eliminar espacios en blanco al inicio y al final antes de guardar el dato.
    },
    firstLastName: {
        type: String,       // Especifica el tipo de dato como String.
        required: true,     // Hace este campo obligatorio.
        trim: true          // Elimina espacios en blanco al inicio y al final.
    },
    secondLastName: {
        type: String,       // Especifica el tipo de dato como String.
        required: true,     // Hace este campo obligatorio.
        trim: true          // Elimina espacios en blanco al inicio y al final.
    },
    email: {
        type: String,       // Especifica el tipo de dato como String.
        required: true,     // Hace este campo obligatorio.
        unique: true,       // Asegura que cada email en la base de datos sea único.
        trim: true,         // Elimina espacios en blanco al inicio y al final.
        lowercase: true,    // Convertir el email a minúsculas antes de guardarlo
        validate: {
            validator: function (email) {
                const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email);
            },
            message: 'Please provide a valid email address'
        }
    },
    password: {
        type: String,       // Especifica el tipo de dato como String.
        required: true,     // Hace este campo obligatorio.
        trim: true,          // Elimina espacios en blanco al inicio y al final.
        validate: {
            validator: function(v) {
                return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z\d\s:]).{8,}$/.test(v);
            },
            message: 'Password is not strong enough.'
        }
    },
    role: {
        type: String,
        enum: roles,
        default: 'Client'
    },
    status: {
        type: String,
        enum: userStatuses,
        default: 'Activated'
    },
    imageUrl: {
        type: String,
        required: false,  // No es requerido para que el usuario pueda ser creado sin una imagen inicialmente.
    },
    principalImage: {
        type: Boolean,
        required: false,  // No es requerido para que el usuario pueda ser creado sin una imagen inicialmente.
    },
    pharmacy: {
        type: Schema.Types.ObjectId,
        ref: 'Pharmacy',
        required: true
    }
}, {
    versionKey: false,    // Desactiva la propiedad __v que Mongoose usa internamente para seguir la versión del documento.
    timestamps: true      // Habilita la creación automática de dos campos: createdAt y updatedAt en cada documento.
});

// Pre-save hook para hashear la contraseña antes de guardar el usuario
pharmacyUserSchema.pre('save', async function (next) {
    // Si la contraseña no ha sido modificada (en caso de actualización), no hacer nada
    if (!this.isModified('password')) return next();

    // Generar un salt y hashear la contraseña
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    // Continuar al siguiente middleware
    next();
});

// Exporta el modelo 'User', que utiliza 'userSchema' para interactuar con la colección 'users' en la base de datos.
// Mongoose automáticamente busca una colección con el nombre plural del modelo, en este caso 'users'.
export default model('pharmacyUser', pharmacyUserSchema, 'pharmacyUsers');
