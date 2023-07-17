import './cardsDogs.styles.css';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import CardDog from '../cardDog/cardDog.component.jsx';
import { getAllBreeds } from '../../redux/actions.js';

function CardsDogs() {
  const dispatch = useDispatch();
  const { breeds } = useSelector(state => state)
  const [currentPage, setCurrentPage] = useState(1)

  const input = breeds;
  let razas = input.splice(0, 8)
  const itemPerPage = 8;

 
  useEffect(()=>{
    dispatch(getAllBreeds())//AQUÍ ESTÁ PENDIENTE EL DISMOUNT
  }, [dispatch])
    

  const prevHandler = () => {
    console.log("previous")
  }

 
  const nextHandler = () => {
    const totalBreeds = input.length;
    const nextPage = currentPage + 1;
    const indexOne = nextPage * itemPerPage;
    if(indexOne === totalBreeds) return;
    razas = input.splice(indexOne,8)
    setCurrentPage(nextPage)
  }
 

  return (
    <div>
    <div className='container'>
      {
        razas?.map(breed => {
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
    <div>
       <h4 className='PWraper'>Pagina: {currentPage}</h4>
       <button onClick={prevHandler}className='button4'>Prev</button>
       <button onClick={nextHandler}className='button1'>Next</button>
    </div>   
    </div>  
  );
}

export default CardsDogs;
