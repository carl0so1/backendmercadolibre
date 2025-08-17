import express from "express";
import Vehiculo from "../models/vehiculo.js";

const router = express.Router();

// Obtener todos los vehículos
router.get("/", async (req, res) => {
    try {
        const vehiculos = await Vehiculo.find({});
        
        // Si no hay vehículos en la base de datos, crear algunos de ejemplo
        if (vehiculos.length === 0) {
            const vehiculosEjemplo = [
                {
                    marca: "Toyota",
                    modelo: "Corolla",
                    anio: 2022,
                    precio: 25000,
                    imagen: "https://www.toyota.com/imgix/content/dam/toyota/jellies/max/2022/corolla/se/1852/040/1.png",
                    rating: 4.5,
                    disponible: true
                },
                {
                    marca: "Honda",
                    modelo: "Civic",
                    anio: 2021,
                    precio: 23000,
                    imagen: "https://www.honda.com/content/dam/honda/jellies/max/2021/civic/sedan/touring/1.png",
                    rating: 4.3,
                    disponible: true
                },
                {
                    marca: "Ford",
                    modelo: "Mustang",
                    anio: 2023,
                    precio: 45000,
                    imagen: "https://www.ford.com/content/dam/ford/jellies/max/2023/mustang/gt/1.png",
                    rating: 4.8,
                    disponible: true
                },
                {
                    marca: "Chevrolet",
                    modelo: "Camaro",
                    anio: 2022,
                    precio: 42000,
                    imagen: "https://www.chevrolet.com/content/dam/chevrolet/jellies/max/2022/camaro/ss/1.png",
                    rating: 4.6,
                    disponible: true
                },
                {
                    marca: "Nissan",
                    modelo: "Sentra",
                    anio: 2021,
                    precio: 21000,
                    imagen: "https://www.nissan.com/content/dam/nissan/jellies/max/2021/sentra/sv/1.png",
                    rating: 4.0,
                    disponible: true
                }
            ];
            
            await Vehiculo.insertMany(vehiculosEjemplo);
            return res.status(200).json(vehiculosEjemplo);
        }
        
        res.status(200).json(vehiculos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obtener un vehículo por ID
router.get("/:id", async (req, res) => {
    try {
        const vehiculo = await Vehiculo.findById(req.params.id);
        if (!vehiculo) {
            return res.status(404).json({ message: "Vehículo no encontrado" });
        }
        res.status(200).json(vehiculo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Crear un nuevo vehículo
router.post("/", async (req, res) => {
    try {
        const vehiculo = new Vehiculo(req.body);
        await vehiculo.save();
        res.status(201).json(vehiculo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Actualizar un vehículo
router.put("/:id", async (req, res) => {
    try {
        const vehiculo = await Vehiculo.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!vehiculo) {
            return res.status(404).json({ message: "Vehículo no encontrado" });
        }
        res.status(200).json(vehiculo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Eliminar un vehículo
router.delete("/:id", async (req, res) => {
    try {
        const vehiculo = await Vehiculo.findByIdAndDelete(req.params.id);
        if (!vehiculo) {
            return res.status(404).json({ message: "Vehículo no encontrado" });
        }
        res.status(200).json({ message: "Vehículo eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;