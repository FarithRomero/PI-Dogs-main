import './cardDog.styles.css';
import { NavLink } from 'react-router-dom';

function CardDog({Id, Imagen, Nombre, Temperamentos, Peso}) {
  return (
    <div className='Card'>
        <img src={Imagen} alt={Id}/>
        <h3>Id:{Id}</h3>   
      <NavLink to="/home/:id" className='link'>
       <h1>{Nombre}</h1>
      </NavLink>
        <h3>{Temperamentos}</h3>
        <h3>Peso: {Peso} Kl</h3>       
    </div>
  );
}

export default CardDog;
