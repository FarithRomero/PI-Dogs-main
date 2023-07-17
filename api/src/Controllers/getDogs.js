const axios = require('axios');
require('../db.js');
const { Dog } = require('../db.js');
const {URL} = process.env;
const capitalizeString = require('../utils/validations.js');

const getDogsAndQuery = async(req, res) => { 
    const name = req.query.name;

    if(name !== undefined){//si recibe un perro por query
      const breedApi = capitalizeString(name);//transformelo a un formato valido
      console.log(breedApi);
      try { 
        const {data} = await axios(URL);  // haga un llamado a la API
        const findApi = data.find( perro => perro.name.toString() == breedApi );// busque el perro corregido en la api
        if(findApi === undefined){  //si el perro NO está en la API
        console.log("el perro no se encuentra en la API")
          const findDb = await Dog.findOne({ where: { nombre: name } });//busquelo en la base de datos
          if(findDb){
           console.log("el perro se encuentra en la db") 
           return res.status(200).send(findDb);
          }else{
            return res.status(400).send("El perro no se encuentra en la base de datos");
          };
        }else{ //si el perro está en la API traigalo
            console.log("el perro está en la API");
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
              data.forEach(dog => { // cree a todas larazas dentro de un array
                let obj = {
                  id: dog.id,
                  Imagen: dog.image.url,
                  Nombre: dog.name,
                  Temperamentos: dog.temperament,
                  Peso: dog.weight.imperial
                }
                razas.push(obj)
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

  