function orderData(orderType, array) {
    let response;
  
    switch (orderType) {
      case "Ascendente":
        response = array.slice().sort((a, b) => a.nombre.localeCompare(b.nombre));
        break;
      case "Descendente":
        response = array.slice().sort((a, b) => b.nombre.localeCompare(a.nombre));
        break;
      case "Peso menor":
        response = array.slice().sort((a, b) => {
          const pesoA = parseInt(a.peso.split(" - ")[0]);
          const pesoB = parseInt(b.peso.split(" - ")[0]);
          return pesoA - pesoB;
        });
        break;
      case "Peso mayor":
        response = array.slice().sort((a, b) => {
          const pesoA = parseInt(a.peso.split(" - ")[0]);
          const pesoB = parseInt(b.peso.split(" - ")[0]);
          return pesoB - pesoA;
        }); 
        break;
      default:
        alert("Tipo de orden inválido.");
        break;
    }
  
    return response;
  }
  
 module.exports={
  orderData
 };
  