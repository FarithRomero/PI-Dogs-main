import './navigationBar.styles.css';

import { NavLink } from 'react-router-dom';

function NavigationBar() {
  return (
    <div className='navContainer'>
    <div className='nav'>
      <NavLink to="/home">
       <button className='button'>Home</button>
      </NavLink>
      <NavLink to="/createDog">
        <button className='button'>Crear raza</button>
      </NavLink>
    </div>
    </div>
  );
};

export default NavigationBar;
  


