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
// El objeto Set le permite almacenar valores únicos de cualquier tipo, ya sea valores primitivos o referencias a objetos
//El método flat() crea una nueva matriz con todos los elementos de sub-array concatenados recursivamente hasta la profundidad especificada
      const mySet = [...new Set(everyTemperament.flat())]; 
      let temperamentsToDB = mySet.forEach((t) => {
        if (t) {
          Temperament.findOrCreate({
            where: { name: t },
          });
        }
      });
//The Sequelize findAll() method is used to query data from your SQL table to your JavaScript application. 
//The method will return your table rows as an array of objects.
// The findAll() method can be called from a Model that represents the table in your database.
      temperamentsToDB = await Temperament.findAll();
      res.status(200).json(temperamentsToDB);
    } catch (error) {
      res.status(404).send("No temperaments found");
    }
  });


module.exports = router;