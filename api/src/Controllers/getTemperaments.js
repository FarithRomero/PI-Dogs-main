const axios = require('axios');
require('../db.js');
const { Temperament } = require('../db.js');
const {URL} = process.env;

const getTemperaments = async(req, res) => {
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
  };




module.exports ={
    getTemperaments,
} 

  