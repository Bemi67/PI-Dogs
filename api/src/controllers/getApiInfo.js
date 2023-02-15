//no olivdarse de instalar y requerir axios
const axios = require('axios');


const getApiInfo = async () =>{
    const spliter = (data) => {
        if (data) return data.split(", ");
      };
    const apiData = await axios.get("https://api.thedogapi.com/v1/breeds");
//formateo los datos que llegan, el método map() crea un array nuevo
    const apiInfo = await apiData.data.map((breed) =>{
        return{
            id: breed.id,
            name: breed.name,
            life_span: breed.life_span,
            temperament: spliter(breed.temperament),
            image: breed.image.url,
            weight: breed.weight.metric,
            height: breed.height.metric, 
        }
    });

    return apiInfo;
}

module.exports = getApiInfo;