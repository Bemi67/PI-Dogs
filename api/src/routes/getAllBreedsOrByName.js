const { Router } = require('express');
const getAllBreeds = require('../controllers/getAllBreeds');
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

module.exports = router;