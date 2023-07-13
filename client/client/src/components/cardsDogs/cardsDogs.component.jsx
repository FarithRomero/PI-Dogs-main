import './cardsDogs.styles.css';
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import CardDog from '../cardDog/cardDog.component.jsx';
import { getAllBreeds } from '../../redux/actions.js';

function CardsDogs() {
  const dispatch = useDispatch();
  const { breeds } = useSelector(state => state)
  
  useEffect(()=>{
    dispatch(getAllBreeds())//AQUÍ ESTÁ PENDIENTE EL DISMOUNT
  }, [dispatch])
    
  return (
    <div className='container'>
      {
        breeds?.map(breed => {
          return <CardDog 
                  key={breed.id} 
                  Id={breed.id} 
                  Imagen={breed.Imagen} 
                  Nombre={breed.Nombre} 
                  Temperamentos={breed.Temperamentos} 
                  Peso={breed.Peso}/>
        })
      }

    </div>
  );
}

export default CardsDogs;
