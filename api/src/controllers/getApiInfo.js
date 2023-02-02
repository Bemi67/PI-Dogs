const axios = require('axios');

const getApiInfo = async () =>{
    const conv = (data) => {
        if (data) return data.split(", ");
      };
    const apiData = await axios.get("https://api.thedogapi.com/v1/breeds");
    const apiInfo = await apiData.data.map((breed) =>{
        return{
            id: breed.id,
            name: breed.name,
            life_span: breed.life_span,
            temperament: conv(breed.temperament),
            image: breed.image.url,
            weight: breed.weight.metric,
            height: breed.height.metric, 
        }
    });

    return apiInfo;
}

module.exports = getApiInfo;