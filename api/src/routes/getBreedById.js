const { Router } = require('express');
const getAllBreeds = require('../controllers/getAllBreeds');

const router = Router();

router.get('/dogs/:id', async (req, res) => {
    const { id } = req.params
    const allBreeds = await getAllBreeds()
    try {
            const breedSelected = allBreeds.filter((breed) => breed.id == id)
            if (breedSelected.length){
                return res.status(200).send(breedSelected)
            } 
    } catch (error) {
      res.status(404).send({error: `The breed with the id ${id} doesn't exist`})
    }
});

//breed by id andando

module.exports = router;