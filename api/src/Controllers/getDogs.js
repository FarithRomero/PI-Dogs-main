const axios = require('axios');
require('../db.js');
const { Dog } = require('../db.js');
const {URL} = process.env;
const capitalizeString = require('../utils/validations.js');

const getDogsAndQuery = async(req, res) => { 
    const name = req.query.name;

    if(name !== undefined){//si recibe un perro por query
      const dogWanted = capitalizeString(name);//transformelo a un formato valido

      try { 
        const {data} = await axios(URL);  // haga un llamado a la API
        const findApi = data.find( perro => perro.name.toString() == dogWanted );// busque el perro  en la api
        if(findApi === undefined){  //si el perro NO está en la API
        console.log("El perro no se encuentra en la API")
          const findDb = await Dog.findOne({ where: { nombre: dogWanted } });//busquelo en la base de datos
          if(findDb){
           console.log("El perro se encuentra en la DataBase") 
           console.log(findDb.id)
           return res.status(200).send(
            {
              id: findDb.id,
              imagen: findDb.imagen,
              nombre: findDb.nombre,
              altura: findDb.altura, 
              peso: findDb.peso,
              // temperamentos: findDb.temperament,
              años_de_vida: findDb.anios_de_vida,
          });
          }else{
            return res.status(400).send("El perro no se encuentra en la base de datos");
          };
        }else{ //si el perro está en la API traigalo
            console.log("El perro está en la API");
          return res.status(200).send({
              id: findApi.id,
              imagen: findApi.image.url,
              nombre: findApi.name,
              altura: findApi.height.metric, 
              peso: findApi.weight.imperial,
              temperamentos: findApi.temperament,
              años_de_vida: findApi.life_span,
          });
        };
        } catch (error) {
          res.status(400).send(error.message);
        }; 
      };  
      if(name === undefined){  //si no se hizo un llamado por query
        try {
          await axios(URL) //llame a la API
          .then(response => {
              const data = response.data;
              let razas = [];
              data.forEach(dog => { // cree a todas las razas dentro de un array
                let objApi = {
                  id: dog.id,
                  Imagen: dog.image.url,
                  Nombre: dog.name,
                  Temperamentos: dog.temperament,
                  Peso: dog.weight.imperial,
                  Origen: "Api"
                }
                razas.push(objApi)
              });  
          res.status(200).send(razas);// retorne las razas
          });  
        } catch (error) {
          res.status(400).send(error.message);
        };
      };
  };
  
  
module.exports ={
    getDogsAndQuery,
} 

  