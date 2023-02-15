const { Router } = require('express');
const { Dog } = require ("../db");

const router = Router();

//recibir los datos y separarlos (validar datos opcional)
//agregar el objeto a mi base de datos (llamado asincronico)
//hacer la relacion con el modelo -> agrego los temperamentos de la raza
//responder que se creo(tmb se puede validar)

router.post("/create", async (req, res) => {
    let { name, weight, height, life_span, image, temperament } = req.body;

    if (!name || !weight || !height || !life_span || !image || !temperament)
    res.status(400).json({ msg: "Missing data" });

    try {
//Busca una entrada en la tabla o la crea cuando no existe, devuelve una array
      const newBreed = await Dog.findOrCreate({
        
        where: {
          name: name,
          weight,
          height,
          life_span,
          image: image,
        },
      });
//relaciono el ID del temperamento con la raza creada
      await newBreed[0].setTemperaments(temperament); 
      
      res.status(200).json(newBreed);
    } catch (err) {
      res.status(404).send("Couldn't create breed");
    }
  });
  
  // post andando
  module.exports = router;
