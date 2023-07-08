const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const { Dog, Temperament, Dogs_Temperaments } = require('./db.js');
const { conn } = require('./db.js');
const axios = require('axios');
const { API_KEY, URL} = process.env;
require('./db.js');
const capitalizeString = require('./utils/validations.js');

const server = express();

server.name = 'API';

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use('/', routes);
server.use(express.json());


server.get("/dogs", async(req, res) => { 
  const name = req.query.name;

  if(name !== undefined){
    const breedApi = capitalizeString(name);
    try {
      const {data} = await axios(URL);  
      const findApi = data.find( perro => perro.name.toString() == breedApi );
      if(findApi === undefined){  
        const findDb = await Dog.findOne({ where: { nombre: name } });
        return res.status(200).send(findDb);
      }else{
        return res.status(200).send({
            id: findApi.id,
            imagen: findApi.image.url,
            nombre: findApi.name,
            altura: findApi.height.metric, 
            temperamentos: findApi.temperament,
            años_de_vida: findApi.life_span,
        });
      };
      } catch (error) {
        res.status(400).send(error.message);
      }; 
    };  

    if(name == undefined){  
      try {
        await axios(URL)
        .then(response => {
            const data = response.data;
            let razas = [];
            data.forEach(dog => {
              let obj = {
                id: dog.id,
                Imagen: dog.image.url,
                Nombre: dog.name,
                Temperamentos: dog.temperament,
                Peso: dog.weight.imperial
              }
              razas.push(obj)
            });  
        res.status(200).send(razas);
        });  
      } catch (error) {
        res.status(400).send(error.message);
      };
    };
});


server.get("/dogs/:idRaza", async(req, res) => {
  const {idRaza} = req.params; 
  try {
    const {data} = await axios(URL);  
    const apiDog = data.find( perro => perro.id.toString() === idRaza );
    
    if(apiDog === undefined){
      const dog = await Dog.findOne({ where: { id: idRaza } });
      if(dog.id === idRaza ){
        return res.status(200).send(dog);
      }
      if(dog.id !== idRaza ){
        return res.status(400).send("DOG NOT FOUND");
      };
    }else{
      return res.status(200).send({
          id: apiDog.id,
          imagen: apiDog.image.url,
          nombre: apiDog.name,
          altura: apiDog.height.metric, 
          temperamentos: apiDog.temperament,
          años_de_vida: apiDog.life_span,
      });
    };
  } catch (error) {
    res.status(400).send("DOG NOT FOUND");
  };
});


server.post("/dogs", async(req, res) => {
  try {
    const {imagen, nombre, altura, peso, anios_de_vida, temperamento} = req.body; 
    const newDog = await Dog.create({imagen, nombre, altura, peso, anios_de_vida});   
    const findTemp = await Temperament.findOne({ where: { temperamento: temperamento } });
    const dogId = newDog.id;
    const temperamentId = findTemp.id;
    const newRelation = await Dogs_Temperaments.create({ DogId: dogId, TemperamentId: temperamentId });    
    res.status(200).send(newDog); 
  } catch (error) {
    res.status(400).send(error.message);
  }
});


server.get("/temperaments", async(req, res) => {
  const {data} = await axios(URL);  
  const apiTemperaments = data.filter(e => e.temperament !== undefined);
   const temperamentCount = await Temperament.count();
  try {
    const result= [];
    apiTemperaments.forEach(dog => {
      result.push(dog.temperament);
    }); 
    for(let i=0; i<result.length; i++){
      result[i] = result[i].split(", ");
    };
    const concatenatedArray = [].concat(...result);
    const temperamentsArray = concatenatedArray.filter((value, index, self) => {
      return self.indexOf(value) === index;
    });
    if(temperamentCount===0){
      temperamentsArray.forEach(temperament => {
        let newTemperament = Temperament.create({temperamento: temperament});   
      });       
    }else{
      res.status(200).send(temperamentsArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  };
});

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
