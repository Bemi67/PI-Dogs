// En estas tablas se va a almacenar toda la información
const { DataTypes, UUIDV4 } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
// defino el modelo
  sequelize.define('dog', {
    id:{
// + importante xq permite identificar individualmente, es único para cada dato ingresado
// UUID valor alfanumérico "43we-23as-df65-bm67"
      type:DataTypes.UUID,
//allowNull ->indica si el dato puede estar vacío o no en la tabla
      allowNull: false,
//primaryKey -> esta es la columna por la cual esta tabla va ser reconocida por las otras tablas en la bd y  permite hacer las relaciones
      primaryKey: true,
//defaultValue -> Hace que se autogenere un valor      
      defaultValue: DataTypes.UUIDV4,
         },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
    life_span: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    weight: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },{
    timestamps: false,
  });
};

