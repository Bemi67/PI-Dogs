const {Dog, Temperament} = require('../db.js');

const getDbInfo = async () => {
    let breedsDB = await Dog.findAll({
     
      include: Temperament, 
    });
  
    breedsDB  = JSON.stringify(breedsDB );
    breedsDB  = JSON.parse(breedsDB ); 
    breedsDB  = breedsDB.reduce(
      (acc, el) =>
        acc.concat({
          ...el,
          temperament: el.temperaments.map((t) => t.name), 
        }),
      []
    ); //
    return breedsDB;
  };
module.exports = getDbInfo;