import './home.styles.css';
import NavigationBar from '../../components/navigationBar/navigationBar.component.jsx';
import SearchBar from '../../components/searchBar/searchBar.component.jsx';
import CardsDogs from '../../components/cardsDogs/cardsDogs.component.jsx';
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { getByName, clearState } from '../../redux/actions.js';
import CardDog from '../../components/cardDog/cardDog.component.jsx';

function Home() {
  const dispatch = useDispatch();
  const copyBreeds = useSelector(state => state.copyBreeds);

  const [searchValue, setSearchValue ] = useState("");
  const [showCard, setShowCard] = useState(false);
  

  useEffect(()=>{
    setShowCard(false);
    return () => {
      dispatch(clearState())
    }
  }, [dispatch])

   function handlerEvent(event){
    event.preventDefault()
    setSearchValue(event.target.value)
  };

  function handlerSubmit(event){
    event.preventDefault();
    dispatch(getByName(searchValue));    
    setShowCard(true)
  }

  function handleGoBack() {
    setShowCard(false);
  }

  return (
    <div >   
      <div className='SearchB'>
        <SearchBar handlerEvent={handlerEvent} handlerSubmit={handlerSubmit} className='SearchB'/>
      </div>
      <div className='NavContainer'>
        <NavigationBar className='NavB'/>
      </div>
      {showCard === true ?(
        <div className='container2' >
         {copyBreeds.map(breed => (
          <CardDog className='cardName'
            key={breed.id} 
            Id={breed.id} 
            Imagen={breed.imagen} 
            Nombre={breed.nombre} 
            Temperamentos={breed.temperamentos} 
            Peso={breed.peso}
          />
        ))}
          <button className='buttonBack' onClick={handleGoBack}>Volver</button>
        </div>
      ) : (
        <div className='CardsContainer'><CardsDogs/></div>
      )} 

    </div>
  );
}

export default Home;