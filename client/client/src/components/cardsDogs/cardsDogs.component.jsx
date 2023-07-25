import './cardsDogs.styles.css';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import CardDog from '../cardDog/cardDog.component.jsx';
import { clearState } from '../../redux/actions.js';
import { getAllBreeds, getAllTemperaments, filterCards } from '../../redux/actions.js';

const selectBreeds = state => state.breeds;
const selectTemperaments = state => state.temperaments;
const selectTemperamentsFilter = state => state.temperamentsFilter;
const selectOriginFilter = state => state.originFilter;

function CardsDogs() {
  const dispatch = useDispatch();

  // Obtenemos los estados del store de Redux que necesitamos
  const breeds = useSelector(selectBreeds);
  const temperaments = useSelector(selectTemperaments);
  const temperamentsFilter = useSelector(selectTemperamentsFilter);
  const originFilter = useSelector(selectOriginFilter);

  // Definimos los estados locales del componente
  const [currentPage, setCurrentPage] = useState(0);
  const [orderSelected, setOrderSelected] = useState("");
  const [cardsToDisplay, setCardsToDisplay] = useState([])
  const [dogsToShow, setdogsToShow] = useState([]);
  const [filterSelected, setFilterSelected] = useState({ filterType: "", value: "" });

  const itemsPerPage = 8;
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  useEffect(() => {
    dispatch(getAllBreeds());
    dispatch(getAllTemperaments());
    return () => {
      dispatch(clearState())
    }
  }, [dispatch]);
  
  // Función para realizar el ordenamiento de los perros
  function orderData(orderType, array) {
    let response;
    switch (orderType) {
      case "Ascendente":
        response = array.slice().sort((a, b) => a.Nombre.localeCompare(b.Nombre));
        break;
      case "Descendente":
        response = array.slice().sort((a, b) => b.Nombre.localeCompare(a.Nombre));
        break;
      case "Peso menor":
        response = array.slice().sort((a, b) => {
          const pesoA = parseInt(a.Peso.split(" - ")[0]);
          const pesoB = parseInt(b.Peso.split(" - ")[0]);
          return pesoA - pesoB;
        });
        break;
      case "Peso mayor":
        response = array.slice().sort((a, b) => {
          const pesoA = parseInt(a.Peso.split(" - ")[0]);
          const pesoB = parseInt(b.Peso.split(" - ")[0]);
          return pesoB - pesoA;
        });
        break;
      default:
        alert("Tipo de orden inválido.");
        break;
    }

    return response;
  }

  useEffect(() => {
    const filtered = filterSelected.filterType === "temperamento" ? temperamentsFilter: filterSelected.filterType === "origen" ? originFilter : breeds;
    setCardsToDisplay(filtered);
    setdogsToShow(filtered.slice(startIndex, endIndex));
  }, [breeds,  temperamentsFilter, originFilter, filterSelected.filterType, startIndex, endIndex]);

  useEffect(() => {
    if (orderSelected) {
      const ordered = orderData(orderSelected, cardsToDisplay);
      setdogsToShow(ordered.slice(startIndex, endIndex));   
    };
  }, [orderSelected, startIndex, endIndex]);

  
  const nextHandler = () => {
    if(cardsToDisplay.length >= itemsPerPage){ 
      const lastPage = Math.trunc(cardsToDisplay.length / itemsPerPage);
      if (currentPage >= lastPage -1) setCurrentPage(-1);
      setCurrentPage(prevPage => prevPage + 1);
    };
  };
  
  const prevHandler = () => {
    const lastPage = Math.trunc(cardsToDisplay.length / itemsPerPage);
    if (currentPage <= 0) setCurrentPage(lastPage);
    setCurrentPage(prevPage => prevPage - 1);
  };

  const orderHandler = (event) => {
    event.preventDefault();
    setOrderSelected(event.target.value);
    setCurrentPage(0);
  };

  const filterHandler = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setFilterSelected({ filterType: name, value });
    dispatch(filterCards(name, value));
    setCurrentPage(0);
  };

  const handlerReload = () => {
    window.location.reload();
    setCurrentPage(0);
  };

  return (
    <div>
      <div className='container'>
        {dogsToShow.map(breed => (
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
        <h4 className='PWraper'>Pagina: {currentPage + 1}</h4>
        <button onClick={prevHandler} className='button4'>Anterior</button>
        <button onClick={nextHandler} className='button1'>Siguiente</button>
        <select className='button3' name='ordenar' value={orderSelected} onChange={orderHandler}>
          <option value="Default">Ordenar</option>
          <option value="Ascendente">Por orden alfabético A - Z</option>
          <option value="Descendente">Por orden alfabético Z - A</option>
          <option value="Peso menor">Por peso menor</option>
          <option value="Peso mayor">Por peso mayor</option>
        </select>
        <select className='button2' name='temperamento' value={filterSelected.value} onChange={filterHandler}>
          <option value=''>Filtrar temperamento</option>
          {temperaments.map((temperament, index) => (
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
