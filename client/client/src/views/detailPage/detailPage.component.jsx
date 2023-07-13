import './detailPage.styles.css';
import NavigationBar from '../../components/navigationBar/navigationBar.component';
import { getByDetail} from '../../redux/actions.js';
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from 'react-router-dom';
import dogImage from '../../assets/pngtree-print-of-paw-dog-or-cat-png-image_4887169.png';

function DetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { copyBreeds } = useSelector(state => state)

  useEffect(()=>{
    dispatch(getByDetail(id))
    console.log(dispatch)
  }, [dispatch, id])
  
  return (
    <div>
      <NavigationBar/>
      <img src={copyBreeds.imagen} alt="Imagen no se pudo cargar" className='dogPhoto'/>     
        <div className='textDescription'>
          <h1>{copyBreeds.nombre}</h1>
          <h3>Temperamentos: {copyBreeds.temperamentos}</h3>
          <h3>Id: {copyBreeds.id}</h3>  
          <h3>Altura: {copyBreeds.altura} cms</h3>
          <h3>Peso: {copyBreeds.Peso} Kg</h3>   
          <h3>Años de vida: {copyBreeds.años_de_vida} </h3>
        </div>
        <img src={dogImage} alt="dog" className="dogfeet" />
    </div>
  );
}
export default DetailPage;