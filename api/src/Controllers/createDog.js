const axios = require('axios');
require('../db.js');
const { Dog, Temperament, Dogs_Temperaments } = require('../db.js');

// const createDog = async(req, res) => {
//     try {
//       const {imagen, nombre, altura, peso, anios_de_vida, temperamento} = req.body; 
//       const newDog = await Dog.create({imagen, nombre, altura, peso, anios_de_vida});   
//       const findTemp = await Temperament.findOne({ where: { temperamento: temperamento } });
//       const dogId = newDog.id;
//       const temperamentId = findTemp.id;
//       const newRelation = await Dogs_Temperaments.create({ DogId: dogId, TemperamentId: temperamentId });    
//       res.status(200).send(newDog); 
//     } catch (error) {
//       res.status(400).send(error.message);
//     }
//   };

// module.exports ={
//     createDog,
// } 
const createDog = async (req, res) => {
  try {
    const { imagen, nombre, altura, peso, anios_de_vida, temperamentos } = req.body;

    // Crear el perro sin los temperamentos por ahora
    const newDog = await Dog.create({ imagen, nombre, altura, peso, anios_de_vida });

    // Buscar o crear los temperamentos y obtener sus instancias
    const temperamentInstances = await Promise.all(
      temperamentos.map((temperamento) =>
        Temperament.findOrCreate({ where: { temperamento } })
      )
    );

    // Asociar los temperamentos al perro
    await newDog.addTemperaments(temperamentInstances.map(([temperament]) => temperament));

    res.status(200).send(newDog);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  createDog,
};
