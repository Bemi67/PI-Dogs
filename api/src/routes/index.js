const { Router } = require('express');

const router = Router();

const getAllBreedsOrByName= require("./getAllBreedsOrByName");
const getBreedById= require("./getBreedById");
const postCreateBreed= require("./postCreateBreed");
const getAllTemper= require("./getAllTemper");

router.use("/", getAllBreedsOrByName);
router.use("/", getBreedById);
router.use("/", postCreateBreed);
router.use("/", getAllTemper);

module.exports = router;
