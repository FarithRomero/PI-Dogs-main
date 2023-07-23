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
    setCurrentBreeds(breeds.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage));
    setTotalBreeds(breeds.length);  
    
    if(filterSelected.filterType){
      if(filterSelected.filterType === "temperamento") {
       setCurrentBreeds(temperamentsFilter.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage));
       setTotalBreeds(temperamentsFilter.length);
      } 
      else if(filterSelected.filterType === "origen") {
       setCurrentBreeds(originFilter.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage));
       setTotalBreeds(originFilter.length);
      } else{
       setCurrentBreeds(breeds.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage));
       setTotalBreeds(breeds.length);  
     }
    } 
  }, [ breeds, currentPage, temperamentsFilter, originFilter, filterSelected.filterType ]);

  useEffect(() => {
    if(orderSelected){
      if (orderSelected === "Ascendente" || orderSelected === "Descendente") {
        setCurrentBreeds(alphabeticOrder.slice(startIndex, endIndex));
        setTotalBreeds(alphabeticOrder.length);
      } 
      else if (orderSelected === "Peso menor" || orderSelected === "Peso mayor") {
        setCurrentBreeds(weightOrder.slice(startIndex, endIndex));
        setTotalBreeds(weightOrder.length);
      } else{
        setCurrentBreeds(breeds.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage));
        setTotalBreeds(breeds.length); 
      }
    }
  }, [orderSelected, alphabeticOrder, breeds, currentPage, weightOrder,startIndex, endIndex ]);

  const prevHandler = () => {
    if (currentPage <= 0) return;
    setCurrentPage(prevPage => prevPage - 1);   
  }

  const nextHandler = () => {   
    let lastPage = Math.trunc(totalBreeds/itemsPerPage);
     if (currentPage >= lastPage)
     {
      setCurrentPage(-1);
     } 
    setCurrentPage(prevPage => prevPage + 1);
  }

  const orderHandler = (event) => {
    event.preventDefault();      
    setOrderSelected(event.target.value);
    dispatch(orderCards(event.target.value));
    setCurrentPage(0);
  };

  const filterHandler = (event) => {
    event.preventDefault();  
    setFilterSelected({filterType: event.target.name, value: event.target.value});
    dispatch(filterCards(event.target.name, event.target.value));
    setCurrentPage(0);
  };

  const handlerReload = () =>{
    window.location.reload();
    setCurrentPage(0);
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
        <h4 className='PWraper'>Pagina: {currentPage +1 }</h4>
          <button onClick={prevHandler} className='button4'>Anterior</button>
          <button onClick={nextHandler} className='button1'>Siguiente</button>
        <select className='button3' name='ordenar' value={currentBreeds} onChange={orderHandler}>
          <option value="Default">Ordenar</option>
          <option value="Ascendente">Por orden alfabetico A - Z</option>
          <option value="Descendente">Por orden alfabetico Z - A</option>
          <option value="Peso menor">Por peso menor</option>
          <option value="Peso mayor">Por peso mayor</option>
        </select>
        <select className='button2' name='temperamento'  value={filterSelected.value} onChange={filterHandler}>
            <option value=''>Filtrar temperamento</option>
              { temperaments.map((temperament, index) => (          
                <option key={index} value={temperament}>{temperament}</option>
              ))}           
          </select>
          <select className='button5' name='origen' value={filterSelected.value} onChange={filterHandler}>
            <option value="Default">Filtrar origen</option>
            <option value="Api">Base de datos</option>
            <option value="DataBase">Creado por usuario</option>
          </select>
          <button onClick={handlerReload} className='button6'>Limpiar filtros</button>
      </div>   
    </div>  
  );
}

export default CardsDogs;



// const resetPagination = () => {
//   setCurrentPage(1);
// };

// const handleClick = (event) => {
//   //? Cargar perros de nuevo
//   event.preventDefault();
//   resetPagination();
//   dispatch(getDogs());
//   window.location.reload()
// };
