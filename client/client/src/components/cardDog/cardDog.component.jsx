import './cardDog.styles.css';

function CardDog({Id, Imagen, Nombre, Temperamentos, Peso}) {
  return (
    <div className='Card'>
        <img src={Imagen} alt={Id}/>
        <h3>Id:{Id}</h3>
        <h1>Raza: {Nombre}</h1>
        <h3>Temperamenos: {Temperamentos}</h3>
        <h3>Peso: {Peso}</h3>       
    </div>
  );
}

export default CardDog;
