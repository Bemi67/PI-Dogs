//recordar desesctructurar
const {Dog, Temperament} = require('../db.js');

const getDbInfo = async () => {
//creo un array con todos los datos de la tabla DOG
    let breedsDB = await Dog.findAll({
//paraa que funcione vinculación y asignación   
      include: Temperament, 
    });
//convierto en una cadena de texto JSON
    breedsDB  = JSON.stringify(breedsDB);
//analiza una cadena de texto como JSON, transformando opcionalmente el valor producido por el análisis
    breedsDB  = JSON.parse(breedsDB); 
//itero sobre todos los registros de razas para poder asingarle a c/u su temperamento correpondiente
// con el reduce, concat y map saco del arreglo de temperamentos el nombre de c/u 
  breedsDB  = breedsDB.reduce(
      (acc, el) =>
        acc.concat({
          ...el,
//me quedo con el name de cada temperamento
          temperament: el.temperaments.map((t) => t.name), 
        }),
      []
    ); 
    return breedsDB;
  };
module.exports = getDbInfo;