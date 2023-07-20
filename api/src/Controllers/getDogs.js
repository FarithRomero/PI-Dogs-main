const axios = require('axios');
require('../db.js');
const { Dog, Temperament, Dogs_Temperaments } = require('../db.js');
const {URL} = process.env;
const {capitalizeString, getTemperamentsByDog } = require('../utils/validations.js');

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
        let filterTemperaments = (await Dogs_Temperaments.findAll({ where: { DogId: findDb.id } })).map((t) => t.TemperamentId);;
        let temperamentOne = (await Temperament.findAll({ where: { id: filterTemperaments[0] } })).map((t) => t.temperamento);
        let temperamentTwo = (await Temperament.findAll({ where: { id: filterTemperaments[1] } })).map((t) => t.temperamento);
        let temperamentos = (temperamentOne.concat(temperamentTwo)).join(", ");

        if(findDb){
          console.log("El perro se encuentra en la DataBase") 
          return res.status(200).send({
            id: findDb.id,
            imagen: findDb.imagen,
            nombre: findDb.nombre,       
            peso: findDb.peso,
            temperamentos: temperamentos,
            Origen: "DataBase",
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
          Origen: "Api"
        });
      };
    } catch (error) {
      res.status(400).send(error.message);
    }; 
  };  
    
  if(name === undefined){  //si no se hizo un llamado por query
    let razas = [];
   
    try {
      const {data} = await axios(URL);  //traer todos los perrros de la API
      data.forEach(dog => { //Empuje cada perro al array de razas
        let objApi = {
          id: dog.id,
          Imagen: dog.image.url,
          Nombre: dog.name,
          Temperamentos: dog.temperament,
          Peso: dog.weight.imperial,
          Origen: "Api"
        };
      razas.push(objApi);
      });  

      const getDBDogs = await Dog.findAll();//encontrar perro en la base de datos
      
      await Promise.all(
        getDBDogs.map(async (dog) => {
          const temperamentos = await getTemperamentsByDog(dog.dataValues.id, Dogs_Temperaments, Temperament);
          let objDB = {
            id: dog.dataValues.id,
            Imagen: "",
            Nombre: dog.dataValues.nombre,
            Peso: dog.dataValues.peso,
            Temperamentos: temperamentos,
            Origen: "DataBase",
          };
          razas.push(objDB);
        })
      );
      res.status(200).send(razas);// retorne las razas
    } catch (error) {
      res.status(400).send(error.message);
    };
  };
};

  
module.exports ={
    getDogsAndQuery,
} 