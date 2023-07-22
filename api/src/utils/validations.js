const capitalizeString = (str) => {
  let string = str.toString();
    return str.split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

 
  async function getTemperamentsByDog(perroId, Dogs_Temperaments, Temperament) {
    const temperamentosIds = (await Dogs_Temperaments.findAll({ where: { DogId: perroId } })).map((t) => t.TemperamentId);
    const temperamentos = await Temperament.findAll({ where: { id: temperamentosIds } });
    return temperamentos.map((t) => t.temperamento).join(", ");
  }   

  function searchDogsApi(raza, arrayrazas) {
    raza = raza.toLowerCase().trim();
    return arrayrazas.filter((perro) =>
      perro.name.toLowerCase().startsWith(raza) ||
      perro.name.toLowerCase().endsWith(raza)
    );
  };
  
  
  module.exports = {
    capitalizeString,
    getTemperamentsByDog,
    searchDogsApi
  }