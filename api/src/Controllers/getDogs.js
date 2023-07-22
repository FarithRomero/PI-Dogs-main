

const axios = require('axios');
require('../db.js');
const { Dog, Temperament, Dogs_Temperaments } = require('../db.js');
const {URL} = process.env;
const {capitalizeString, getTemperamentsByDog, searchDogsApi } = require('../utils/validations.js');

const getDogsAndQuery = async(req, res) => { 
  const name = req.query.name;

  if(name !== undefined){//si recibe un perro por query
    const dogWanted = (capitalizeString(name)).trim();//transformelo a un formato valido
    try { 
      const {data} = await axios(URL);  
      const findDb = await Dog.findOne({ where: { nombre: dogWanted } });//busquelo en la base de datos
      const findApi = searchDogsApi(dogWanted, data);
    
      if(findDb){
        console.log("El perro se encuentra en la DataBase") 
        let filterTemperaments = (await Dogs_Temperaments.findAll({ where: { DogId: findDb.id } })).map((t) => t.TemperamentId);;
        let temperamentOne = (await Temperament.findAll({ where: { id: filterTemperaments[0] } })).map((t) => t.temperamento);
        let temperamentTwo = (await Temperament.findAll({ where: { id: filterTemperaments[1] } })).map((t) => t.temperamento);
        let temperamentos = (temperamentOne.concat(temperamentTwo)).join(", ");  
        return res.status(200).send([{
          id: findDb.id,
          imagen: findDb.imagen,
          nombre: findDb.nombre,       
          peso: findDb.peso,
          temperamentos: temperamentos,
          Origen: "DataBase",
        }]);     
      }
      if(findApi){ //si el perro está en la API traigalo
        console.log("El perro está en la API");
        return res.status(200).send(findApi.map((perro) => ({
          id: perro.id,
          imagen: perro.image.url,
          nombre: perro.name,
          altura: perro.height.metric,
          peso: perro.weight.imperial,
          temperamentos: perro.temperament,
          años_de_vida: perro.life_span,
          Origen: "Api",
        })));
      };
    } catch (error) {
      res.status(400).send("El perro no existe");
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
      res.status(400).send("No existe esta raza en la base de datos");
    };
  };
};

  
module.exports ={
    getDogsAndQuery,
}


