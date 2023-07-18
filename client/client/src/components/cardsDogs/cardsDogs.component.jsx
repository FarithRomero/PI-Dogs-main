import './cardsDogs.styles.css';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import CardDog from '../cardDog/cardDog.component.jsx';
import { getAllBreeds, orderCards, getAllTemperaments } from '../../redux/actions.js';

function CardsDogs() {
  const dispatch = useDispatch();

  const { breeds } = useSelector(state => state);
  const { orderBreeds } = useSelector(state => state);
  const { temperaments } = useSelector(state => state)
  
  const [showOrderByBreeds, setShowOrderByBreeds] = useState(false);
  const [showOrderByWeight, setShowOrederByWeight] = useState({activate: false, aux: "", });
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedTemperament, setSelectedTemperament] = useState({});
  const itemPerPage = 8;


  useEffect(() => {
    dispatch(getAllBreeds());
    dispatch(getAllTemperaments());
  }, [dispatch]);

  useEffect(() => {
    
   }, [orderBreeds]);

  const startIndex = currentPage * itemPerPage;
  const endIndex = startIndex + itemPerPage;
  let currentBreeds = breeds.slice(startIndex, endIndex);


  const prevHandler = () => {
    if (currentPage <= 0) return;
    setCurrentPage(prevPage => prevPage - 1);
  }

  const nextHandler = () => {
    if (currentPage === breeds.length) return;
    setCurrentPage(prevPage => prevPage + 1);
  }

  const orderHandler = (event) => {
    event.preventDefault();
    dispatch(orderCards(event.target.value));
    
    if(event.target.value === "Ascendente" || event.target.value === "Descendente" ){
      setShowOrderByBreeds(true);
      setShowOrederByWeight({
        ...showOrderByWeight,
        activate: false
      });
      return;
    }
    if(event.target.value === "Peso menor" || event.target.value === "Peso mayor"){
      setShowOrderByBreeds(false);
      setShowOrederByWeight({
        aux: event.target.value,
        activate: true
      });
      return;
    }
  }

  if (showOrderByBreeds === true){
    currentBreeds=orderBreeds.slice(startIndex, endIndex);
  }

  if (showOrderByWeight.activate === true && showOrderByWeight.aux === "Peso menor" ){
    const weightOrdered = breeds.slice().sort((a, b) => {
      const weightA = parseInt(a.Peso.split(" - ")[0]);
      const weightB = parseInt(b.Peso.split(" - ")[0]);
      return weightA - weightB;
    });
    currentBreeds = weightOrdered.slice(startIndex, endIndex);
  }
  if(showOrderByWeight.activate === true && showOrderByWeight.aux === "Peso mayor" ){
    const weightOrdered = breeds.slice().sort((a, b) => {
      const weightA = parseInt(a.Peso.split(" - ")[0]);
      const weightB = parseInt(b.Peso.split(" - ")[0]);
      return weightB - weightA;
    });
    currentBreeds = weightOrdered.slice(startIndex, endIndex);
  }


  function handledTemperaments(event){
    event.preventDefault();
    
    let selection = event.target.value;
    setSelectedTemperament({
    [event.target.name]: event.target.value
    })
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
        <select className='button3' name='ordenar' value="Ordenar Razas" onChange={orderHandler}>
          <option value="Default">Ordenar Razas</option>
          <option value="Ascendente">A - Z</option>
          <option value="Descendente">Z - A</option>
          <option value="Peso menor">Peso menor</option>
          <option value="Peso mayor">Peso mayor</option>
        </select>
        <select className='button2' name='temperamento'  value={selectedTemperament.temperamento} onChange={handledTemperaments}>
              <option value=''>Filtrar temperamento</option>
                { temperaments.map((temperament, index) => (          
                  <option key={index} value={temperament}>{temperament}</option>
                ))}
            </select>
      </div>   
    </div>  
  );
}

export default CardsDogs;

