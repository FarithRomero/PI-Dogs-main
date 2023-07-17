import './home.styles.css';
import NavigationBar from '../../components/navigationBar/navigationBar.component.jsx';
import SearchBar from '../../components/searchBar/searchBar.component.jsx';
import CardsDogs from '../../components/cardsDogs/cardsDogs.component.jsx';
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { getByName, getAllBreeds} from '../../redux/actions.js';


function Home() {
  const dispatch = useDispatch();
  const { breeds } = useSelector(state => state)
  const [searchValue, setSearchValue ] = useState("");

  const data = breeds;


  function handlerEvent(event){
    event.preventDefault()
    setSearchValue(event.target.value)
  };

  function handlerSubmit(event){
    event.preventDefault();
    dispatch(getByName(searchValue))
  }

  useEffect(()=>{
    dispatch(getAllBreeds())//AQUÍ ESTÁ PENDIENTE EL DISMOUNT
  }, [dispatch])

  return (
    <div >   
      <div className='SearchB'>
        <SearchBar handlerEvent={handlerEvent} handlerSubmit={handlerSubmit} className='SearchB'/>
      </div>
      <div className='NavContainer'>
        <NavigationBar className='NavB'/>
      </div>
      <div className='CardsContainer'>
        <CardsDogs props={data} className='Cards'/>
      </div>
      <button className='button2'>Temperamentos</button>
      <button className='button3'>Ascendente-Descendente</button>
    </div>
  );
}

export default Home;
