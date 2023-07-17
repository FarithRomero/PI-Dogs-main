import './landing.styles.css';
import dogImage from '../../assets/pngtree-print-of-paw-dog-or-cat-png-image_4887169.png';
import { NavLink } from 'react-router-dom';

function LandingPage() {
  return (
    <div>
        <h1 className='title'>
           Dog & Dogs
        </h1>
        <h4 className='subtitle'>Creado por Farith Romero</h4>
        <NavLink to="/home">
          <button className='btn'>Inicio</button>
        </NavLink>
        <img src={dogImage} alt="dog" className="image" />
    </div>
  );
}

export default LandingPage;
