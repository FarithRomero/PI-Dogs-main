import './navigationBar.styles.css';

import { NavLink } from 'react-router-dom';

function NavigationBar() {
  return (
    <div className='nav'>
      <NavLink to="/">
        <button className='button'>Inicio</button>
      </NavLink>
      <NavLink to="/home">
       <button className='button'>Home</button>
      </NavLink>
      <NavLink to="/home/:id">
        <button className='button'>Detalle</button>
      </NavLink>
      <NavLink to="/createDog">
        <button className='button'>Crear raza</button>
      </NavLink>
    </div>
  );
};

export default NavigationBar;
  


