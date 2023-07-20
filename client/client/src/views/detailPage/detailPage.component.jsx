import defaultImage from '../../assets/Dog.jpg';
import './detailPage.styles.css';
import NavigationBar from '../../components/navigationBar/navigationBar.component';
import { getByDetail} from '../../redux/actions.js';
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from 'react-router-dom';

import gitfDetail from '../../assets/200w.gif';

function DetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { copyBreeds } = useSelector(state => state)

  useEffect(()=>{
    dispatch(getByDetail(id))
  }, [dispatch, id])
  
  return (
    <div>
      <NavigationBar className="nav"/>
      
      <img src={gitfDetail} alt="Imagen no se pudo cargar" className='giftDetail'/> 

      { copyBreeds.imagen !== "" ? <img src={copyBreeds.imagen} alt="Imagen no se pudo cargar" className='dogPhoto'/>: 
        <img className='dogPhoto' src={defaultImage} alt={"Ingresar imagen"}/> }          
        <div className='textDescription'>
          <h1>{copyBreeds.nombre}</h1>
          <h3>Temperamentos: {copyBreeds.temperamentos}</h3>
          <h3>Id: {copyBreeds.id}</h3>  
          <h3>Altura: {copyBreeds.altura} cms</h3>
          <h3>Peso: {copyBreeds.peso} Kg</h3>   
          <h3>Años de vida: {copyBreeds.anios_de_vida} </h3>
        </div>
    </div>
  );
}
export default DetailPage;