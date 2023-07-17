import './cardDog.styles.css';
import { NavLink } from 'react-router-dom';

function CardDog({Id, Imagen, Nombre, Temperamentos, Peso}) {
  return (
    <div className='Card'>
        <img className='dogImage' src={Imagen} alt={Id}/>
   
      <NavLink to={`/home/${Id}`} className='link'>
       <h1>{Nombre}</h1>
      </NavLink>
      <div className='textContainer'>
        <h3>Id:{Id}</h3>   
        <h3>{Temperamentos}</h3>
        <h3>Peso: {Peso} Kg</h3>  
      </div>     
    </div>
  );
}

export default CardDog;
