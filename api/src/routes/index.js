//aqui llegan todas las peticiones 
//importo todos los routers
const { Router } = require('express');

const router = Router();

const getAllBreedsOrByName= require("./getAllBreedsOrByName");
const getBreedById= require("./getBreedById");
const postCreateBreed= require("./postCreateBreed");
const getAllTemper= require("./getAllTemper");


//configuro los routers
//ruta que trae todas las razas o por una raza por nombre
router.use("/", getAllBreedsOrByName);
//ruta que una raza por id
router.use("/", getBreedById);
//ruta que crea una nueva raza
router.use("/", postCreateBreed);
//ruta que trae todos los temperamentos
router.use("/", getAllTemper);

module.exports = router;
