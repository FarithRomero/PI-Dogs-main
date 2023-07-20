const axios = require('axios');
require('../db.js');
const { Dog, Temperament, Dogs_Temperaments  } = require('../db.js');
const {URL} = process.env;
const { getTemperamentsByDog } = require('../utils/validations.js');


const getDogById = async(req, res) => {
    const {idRaza} = req.params; //destructuring del id recibido por params
    try {
      const {data} = await axios(URL);  //llamo a la api
      const apiDog = data.find( perro => perro.id.toString() === idRaza ); //busco el perro en la api
      
      if(apiDog === undefined){ //si no está en la api
        const dog = await Dog.findOne({ where: { id: idRaza } });//busquelo en la db
        if(dog.id === idRaza ){
          const temperamentos = await getTemperamentsByDog(dog.dataValues.id, Dogs_Temperaments, Temperament);
          return res.status(200).send(
            {
              id: dog.dataValues.id,
              imagen: "",
              nombre: dog.dataValues.nombre,
              altura: dog.dataValues.altura,
              peso: dog.dataValues.peso, 
              temperamentos: temperamentos,
              anios_de_vida: dog.dataValues.anios_de_vida,
            });// si es encontrado retorne el perro
        }
        if(dog.id !== idRaza ){
          return res.status(400).send("Perro no encontrado en la API ni en la DataBase"); // si no fue encontrado envíe el mensaje
        };
      }else{ //si está en la API retornelo
        return res.status(200).send({
            id: apiDog.id,
            imagen: apiDog.image.url,
            nombre: apiDog.name,
            altura: apiDog.height.metric,
            peso: apiDog.weight.imperial, 
            temperamentos: apiDog.temperament,
            anios_de_vida: apiDog.life_span,
        });
      };
    } catch (error) {
      res.status(400).send("El perro no fue encontrado, pruebe con otro id");
    };
  };
  
    
module.exports ={
    getDogById,
} 
