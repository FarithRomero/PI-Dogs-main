
// import './cardsDogs.styles.css';
// import { useSelector, useDispatch } from "react-redux";
// import { useEffect, useState } from "react";
// import CardDog from '../cardDog/cardDog.component.jsx';
// import { getAllBreeds, orderCards } from '../../redux/actions.js';

// function CardsDogs() {
//   const dispatch = useDispatch();
//   const { breeds } = useSelector(state => state);
//   const { orderBreeds } = useSelector(state => state);
//   const [currentPage, setCurrentPage] = useState(0);
//   const itemPerPage = 8;

//   useEffect(() => {
//     dispatch(getAllBreeds());
//   }, [dispatch]);

//   const startIndex = currentPage * itemPerPage;
//   const endIndex = startIndex + itemPerPage;
//   const currentBreeds = breeds.slice(startIndex, endIndex);

//   const prevHandler = () => {
//     if (currentPage <= 0) return;
//     setCurrentPage(prevPage => prevPage - 1);
//   }

//   const nextHandler = () => {
//     if (currentPage === breeds.length) return;
//     setCurrentPage(prevPage => prevPage + 1);
//   }

//   const orderHandler = (event) => {
//     dispatch(orderCards(event.target.value));
//     console.log(orderCards(event.target.value));  
//   console.log(orderBreeds[0]);
//   }


//   return (
//     <div>
//       <div className='container'>
//         {currentBreeds.map(breed => (
//           <CardDog 
//             key={breed.id} 
//             Id={breed.id} 
//             Imagen={breed.Imagen} 
//             Nombre={breed.Nombre} 
//             Temperamentos={breed.Temperamentos} 
//             Peso={breed.Peso}
//           />
//         ))}
//       </div>
//       <div>
//         <h4 className='PWraper'>Pagina: {currentPage}</h4>
//         <button onClick={prevHandler} className='button4'>Prev</button>
//         <button onClick={nextHandler} className='button1'>Next</button>
//         <select  className='button3'  name='ordenar'  value="Ordenar Razas" onChange={orderHandler}>
//             <option value="Default">Ordenar Razas</option>
//             <option value="Ascendente">Ascendente</option>
//             <option value="Descendente">Desendente</option>
//         </select>
//         <button className='button2'>Ordenar temperamentos</button>
//       </div>   
//     </div>  
//   );
// }

// export default CardsDogs;


// const dogs = [
//   { name: 'Edward' },
//   { name: 'Sharpe' },
//   { name: 'And' },
//   { name: 'The',},
//   { name: 'Magnetic',  },
//   { name: 'Zeros', }
// ];
// const rta = paddockType.sort(function(a, b){
//   if(a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
//   if(a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
//   return 0;
// })


// console.log(rta);

import './cardsDogs.styles.css';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import CardDog from '../cardDog/cardDog.component.jsx';
import { getAllBreeds, orderCards } from '../../redux/actions.js';

function CardsDogs() {
  const dispatch = useDispatch();
  const { breeds } = useSelector(state => state);
  const { orderBreeds } = useSelector(state => state);
  const [showOrderBreeds, setShowOrderBreeds] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const itemPerPage = 8;

  useEffect(() => {
    dispatch(getAllBreeds());
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
    dispatch(orderCards(event.target.value));
    setShowOrderBreeds(true)
  }
  if (showOrderBreeds === true){
    currentBreeds=orderBreeds.slice(startIndex, endIndex);

  }else{
    currentBreeds = breeds.slice(startIndex, endIndex);

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
          <option value="Ascendente">Ascendente</option>
          <option value="Descendente">Desendente</option>
        </select>
        <button className='button2'>Ordenar temperamentos</button>
      </div>   
    </div>  
  );
}

export default CardsDogs;
