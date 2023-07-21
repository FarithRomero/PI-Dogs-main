function validate(input) {
    const errors = {};
  
    if (!/^[a-zA-Z ]+$/.test(input.nombre) || !input.nombre.trim()) {
      errors.nombre = "Nombre inválido";
    }
  
    const alturaMax = parseInt(input.alturaMax);
    const alturaMin = parseInt(input.alturaMin);
  
    if (isNaN(alturaMax) || isNaN(alturaMin) || alturaMax <= alturaMin) {
      errors.alturaMax = "Altura máxima debe ser mayor que altura mínima";
      errors.alturaMin = "Altura mínima debe ser menor que altura máxima";
    }
  
    const pesoMax = parseInt(input.pesoMax);
    const pesoMin = parseInt(input.pesoMin);
  
    if (isNaN(pesoMax) || isNaN(pesoMin) || pesoMax <= pesoMin) {
      errors.pesoMax = "Peso máximo debe ser mayor que peso mínimo";
      errors.pesoMin = "Peso mínimo debe ser menor que peso máximo";
    }
  
    if (!/^\d+(\.\d+)?$/.test(input.anios_de_vida)) {
      errors.anios_de_vida = "Años inválidos";
    }
  
    return errors;
  }
  
  export default validate;
  