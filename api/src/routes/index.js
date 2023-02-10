const { Router } = require('express');
const axios = require ("axios")
const { Dog, Temperament } = require ("../db")
const getAllBreeds = require('../controllers/getAllBreeds');
// no olvidarse de requerir axios y instalarlo

const router = Router();


router.get("/dogs", async (req, res) =>{
    const {name} = req.query;
    let AllBreeds = await  getAllBreeds();
    if(name){
        let breedName = await AllBreeds.filter(el =>
        el.name.toLowerCase().includes(name.toLowerCase()));
        breedName.length ?
        res.status(200).send(breedName) :
        res.status(404).send(`The breed ${name} doesn't exists`);
    }else{
        res.status(200).send(AllBreeds);
    }
});

// get all y por nombre funciona


router.get('/dogs/:id', async (req, res) => {
    const { id } = req.params
    const allBreeds = await getAllBreeds()
    try {
            const breedSelected = allBreeds.filter((breed) => breed.id == id)
            if (breedSelected.length){
                return res.status(200).send(breedSelected)
            } 
    } catch (error) {
        return res.status(404).send({error: `The breed with the id ${id} doesn't exist`})
    }
});

//breed by id andando


// router.post("/create", async (req, res) =>{

//     let { name, life_span, temperament, image, weight, height } = req.body;
    
//     if (!name || !life_span || !temperament || !image ||!weight || !height)

//     res.status(400).json({msg: "Please enter all fields"})

//     const breedCheck= await Dog.findOne({

//         where: { name: name }
//     })

//     if(breedCheck) {

//         return res.status(404).send('Breed already exists')

//     } else {
//         let newBreed = await Dog.create({
//             name,
//             life_span,
//             image, 
//             weight,
//             height,
//              })
     
//     //dejo de funcionar?    
//     temperament.forEach(async (t) => {
//     const temp = await Temperament.create({
//         name: t 
//         })
//     newBreed.addTemperaments(temp)
//      }
//     )
//             return res.status(200).send("New breed created")
//     }
// })

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
