const { Router } = require('express');
const axios = require ("axios");
const {Temperament } = require ("../db");
// no olvidarse de requerir axios y instalarlo
const router = Router();


router.get("/temperaments", async (req, res) => {
    try {
      const temperamentsFromDB = await Temperament.findAll();
      if (temperamentsFromDB >= 1) res.json(temperamentsFromDB);
  
      const apiInfo = await axios.get('https://api.thedogapi.com/v1/breeds');
      let everyTemperament = apiInfo.data
        ?.map((breed) => (breed.temperament ? breed.temperament : null))
        .map((breed) => breed && breed.split(", ")); 
// Set es un objeto que contiene valores únicos
      const mySet = [...new Set(everyTemperament.flat())]; 
      let temperamentsToDB = mySet.forEach((t) => {
        if (t) {
          Temperament.findOrCreate({
            where: { name: t },
          });
        }
      });
      temperamentsToDB = await Temperament.findAll();
      res.status(200).json(temperamentsToDB);
    } catch (error) {
      res.status(404).send("No temperaments found");
    }
  });


module.exports = router;