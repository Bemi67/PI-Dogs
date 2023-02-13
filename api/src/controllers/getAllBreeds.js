const getApiInfo = require('./getApiInfo');
const getDbInfo = require('./getDbInfo');

const getAllBreeds = async () =>{
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    // combino los dos resultados
    const apiAndDbInfoCombined = [...dbInfo, ...apiInfo]
    return apiAndDbInfoCombined;
}

module.exports = getAllBreeds;