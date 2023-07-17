
import './cardsDogs.styles.css';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import CardDog from '../cardDog/cardDog.component.jsx';
import { getAllBreeds } from '../../redux/actions.js';

function CardsDogs() {
  const dispatch = useDispatch();
  const { breeds } = useSelector(state => state);
  const [currentPage, setCurrentPage] = useState(0);
  const itemPerPage = 8;

  useEffect(() => {
    dispatch(getAllBreeds());
  }, [dispatch]);

  const startIndex = currentPage * itemPerPage;
  const endIndex = startIndex + itemPerPage;
  const currentBreeds = breeds.slice(startIndex, endIndex);

  const prevHandler = () => {
    if (currentPage <= 0) return;
    setCurrentPage(prevPage => prevPage - 1);
  }

  const nextHandler = () => {
    if (currentPage === breeds.length) return;
    setCurrentPage(prevPage => prevPage + 1);
  }

  return (
    <div>
      <div className='container'>
        {currentBreeds.map(breed => (
          <CardDog 
            key={breed.id} 
            Id={breed.id} 
            Imagen={breed.Imagen} 
            Nombre={breed.Nombre} 
            Temperamentos={breed.Temperamentos} 
            Peso={breed.Peso}
          />
        ))}
      </div>
      <div>
        <h4 className='PWraper'>Pagina: {currentPage}</h4>
        <button onClick={prevHandler} className='button4'>Prev</button>
        <button onClick={nextHandler} className='button1'>Next</button>
      </div>   
    </div>  
  );
}

export default CardsDogs;
