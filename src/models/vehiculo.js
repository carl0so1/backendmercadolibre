import mongoose from "mongoose";

const vehiculoSchema = new mongoose.Schema({
    marca: {
        type: String,
        required: true,
        trim: true
    },
    modelo: {
        type: String,
        required: true,
        trim: true
    },
    anio: {
        type: Number,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    imagen: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    disponible: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const Vehiculo = mongoose.model("Vehiculo", vehiculoSchema);

export default Vehiculo;