const axios = require('axios');
require('../db.js');
const { Op } = require('sequelize');
const { Dog, Temperament, Dogs_Temperaments } = require('../db.js');
const { URL } = process.env;
const { capitalizeString, getTemperamentsByDog, searchDogsApi } = require('../utils/validations.js');

const getDogsAndQuery = async (req, res) => {
  const name = req.query.name;

  if (name !== undefined) {
    const dogWanted = (capitalizeString(name)).trim();
    try {
      const { data } = await axios(URL);
      const findDb = await Dog.findOne({ where: { nombre: { [Op.like]: `%${dogWanted}%` } } });
      const findApi = searchDogsApi(dogWanted, data);

      if (findDb === null || !findDb) {
        if (findApi[0] === undefined) {
          return res.status(400).send("La raza no existe en la base de datos ni en la API");
        } else {
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
        }
      };

      if (findDb) {
        console.log("El perro se encuentra en la DataBase")
        let filterTemperaments = (await Dogs_Temperaments.findAll({ where: { DogId: findDb.id } })).map((t) => t.TemperamentId);
      
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
      };

    } catch (error) {
      res.status(400).send("El perro no existe");
    };
  };

  if (name === undefined) {
    let razas = [];
    try {
      const { data } = await axios(URL);
      data.forEach(dog => {
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

      const getDBDogs = await Dog.findAll();

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
      res.status(200).send(razas);
    } catch (error) {
      res.status(400).send("No existe esta raza en la base de datos");
    };
  };
};

module.exports = {
  getDogsAndQuery,
}
