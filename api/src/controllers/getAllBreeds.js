const getApiInfo = require('./getApiInfo');
const getDbInfo = require('./getDbInfo');

const getAllBreeds = async () =>{
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const apiAndDbInfoCombined = apiInfo.concat(dbInfo);
    return apiAndDbInfoCombined;
}

module.exports = getAllBreeds;