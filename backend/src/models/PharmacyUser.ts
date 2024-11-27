import mongoose from 'mongoose';
import User from './User';  // Asegúrate de que el modelo User está correctamente importado

const pharmacyUserSchema = new mongoose.Schema({
    pharmacy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pharmacy',
        required: true
    },
}, {
    versionKey: false,    // Desactiva la propiedad __v que Mongoose usa internamente para seguir la versión del documento.
    timestamps: true  // Mantiene las marcas de tiempo para la creación/modificación
});

// Herencia de métodos del modelo User
pharmacyUserSchema.methods = User.schema.methods;

// Crear un modelo de Mongoose
const PharmacyUser = User.discriminator('PharmacyUser', pharmacyUserSchema);

export default PharmacyUser;
