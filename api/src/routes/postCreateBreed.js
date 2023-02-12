const { Router } = require('express');
const { Dog } = require ("../db");

const router = Router();

router.post("/create", async (req, res) => {
    let { name, life_span, weight, height, image, temperament } = req.body;
    try {
      const newBreed = await Dog.findOrCreate({
        
        where: {
          name: name,
          weight,
          height,
          life_span,
          image: image,
        },
      });
      await newBreed[0].setTemperaments(temperament); 
      
      res.status(200).json(newBreed);
    } catch (err) {
      res.status(404).send("Couldn't create breed");
    }
  });
  
  // post andando
  module.exports = router;
