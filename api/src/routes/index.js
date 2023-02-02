const { Router, application } = require('express');
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


router.get('/dogs/:idRaza', async (req, res) => {
    const { idRaza } = req.params
    const allDogs = await getAllBreeds()
    try {
            const dogSelected = allDogs.filter((dog) => dog.id == idRaza)
            if (dogSelected.length){
                return res.status(200).send(dogSelected)
            } 
    } catch (error) {
        return res.status(404).send({error: `The breed with the id ${idRaza} doesn't exist`})
    }
});



router.post("/create", async (req, res) =>{

    let { name, life_span, temperament, image, weight, height } = req.body;
    
    if (!name || !life_span || !temperament || !image ||!weight || !height)

    res.status(400).json({msg: "Please enter all fields"})

    const breedCheck= await Dog.findOne({

        where: { name: name }
    })

    if(breedCheck) {

        return res.status(404).send('Breed already exists')

    } else {
        let newBreed = await Dog.create({
            name,
            life_span: life_span + ' years', 
            image, 
            weight, 
            height 
            
        })
        
    const temp = await Temperament.findAll({
        where: { name: temperament }
    })
    newBreed.addTemperaments(temp)
       
        return res.status(200).send("New breed created")
    }
})

// post funciona pero no muestra el temperamento


router.get('/temperaments', async (req,res) => {
    try {
           const api = await axios.get('https://api.thedogapi.com/v1/breeds')
           const breeds = await api.data.map (el => el.temperament)
           let breedsSplit = await breeds.join().split(',')
           let breedsTrim = await breedsSplit.map(temper => temper.trim())
           await breedsTrim.forEach( async (temper) => {
               if(temper.length > 0){
                   await Temperament.findOrCreate({
                       where : {name : temper}
                   })
               }
           })
           const allTemperament = await Temperament.findAll()
          
           return res.status(200).json(allTemperament)
       }catch (error){
            res.status(404).send({error: 'There are not temperaments'})
        }
   })

   //temperaments andando

 

   router.delete('delete/:id', async(req, res) => {
    try{
        const { id } = req.params

        const dogDelete = await Dog.findByPk(id)

        if(!dogDelete){
            res.status(404).send('Id not found')
        }

        await dogDelete.destroy()

        res.send('Breed eliminated')
    }
    catch(error){
        console.log(error)
    }
})

module.exports = router;

module.exports = router;
