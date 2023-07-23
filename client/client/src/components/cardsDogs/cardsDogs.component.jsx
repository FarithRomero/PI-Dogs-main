import './cardsDogs.styles.css';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import CardDog from '../cardDog/cardDog.component.jsx';
import { getAllBreeds, orderCards, getAllTemperaments, filterCards } from '../../redux/actions.js';

function CardsDogs() {
  const dispatch = useDispatch();

  const { breeds } = useSelector(state => state);
  const { alphabeticOrder } = useSelector(state => state);
  const { weightOrder} = useSelector(state => state);
  const { temperaments } = useSelector(state => state);
  const { temperamentsFilter } = useSelector(state => state);
  const { originFilter } = useSelector(state => state);

  const [currentPage, setCurrentPage] = useState(0);
  const [orderSelected, setOrderSelected] = useState("");
  const [currentBreeds, setCurrentBreeds] = useState([]);
  const [filterSelected, setFilterSelected] = useState({filterType: "", value: ""});
  const [totalBreeds, setTotalBreeds] = useState(0);

  const itemsPerPage = 8;
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

    
  useEffect(() => {
    dispatch(getAllBreeds());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllTemperaments());
  }, [dispatch, alphabeticOrder]);

  useEffect(() => {
    if (orderSelected === "Ascendente" || orderSelected === "Descendente") {
      setCurrentBreeds(alphabeticOrder.slice(startIndex, endIndex));
      setTotalBreeds(alphabeticOrder.length);
    } 
    else if (orderSelected === "Peso menor" || orderSelected === "Peso mayor") {
      setCurrentBreeds(weightOrder.slice(startIndex, endIndex));
      setTotalBreeds(weightOrder.length);
    }
    else if(filterSelected.filterType === "temperamento") {
      setCurrentBreeds(temperamentsFilter.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage));
      setTotalBreeds(temperamentsFilter.length);
    } 
    else if(filterSelected.filterType === "origen") {
      setCurrentBreeds(originFilter.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage));
      setTotalBreeds(originFilter.length);
    } 
    else{
      setCurrentBreeds(breeds.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage));
      setTotalBreeds(breeds.length);
    }
  }, [orderSelected, alphabeticOrder, breeds, currentPage, weightOrder, temperamentsFilter, originFilter]);


  const prevHandler = () => {
    if (currentPage <= 0) return;
    setCurrentPage(prevPage => prevPage - 1);
  }

  const nextHandler = () => {   
    let lastPage = Math.trunc(totalBreeds/itemsPerPage)
     if (currentPage >= lastPage) return;
    setCurrentPage(prevPage => prevPage + 1);
  }

  const orderHandler = (event) => {
    event.preventDefault();   
    setOrderSelected(event.target.value);
    dispatch(orderCards(event.target.value));
  };

  const filterHandler = (event) => {
    event.preventDefault();  
    setFilterSelected({filterType: event.target.name, value: event.target.value});
    dispatch(filterCards(event.target.name, event.target.value));
  };
  
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
        <select className='button3' name='ordenar' value={currentBreeds} onChange={orderHandler}>
          <option value="Default">Ordenar Razas</option>
          <option value="Ascendente">A - Z</option>
          <option value="Descendente">Z - A</option>
          <option value="Peso menor">Peso menor</option>
          <option value="Peso mayor">Peso mayor</option>
        </select>
        <select className='button2' name='temperamento'  value={filterSelected.value} onChange={filterHandler}>
          <option value=''>Filtrar temperamento</option>
            { temperaments.map((temperament, index) => (          
              <option key={index} value={temperament}>{temperament}</option>
            ))}
        </select>
        <select className='button5' name='origen' value={filterSelected.value} onChange={filterHandler}>
          <option value="Default">Origen</option>
          <option value="Api">Api</option>
          <option value="DataBase">DataBase</option>
        </select>
      </div>   
    </div>  
  );
}

export default CardsDogs;



