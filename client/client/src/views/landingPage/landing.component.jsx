import './landing.styles.css';
import dogImage from '../../assets/pngtree-print-of-paw-dog-or-cat-png-image_4887169.png';
import dogGif from '../../assets/74731f76965389.5c7945b0cfcc3.gif';
import linkedinLogo from '../../assets/linkedin-logo.png'
import githubLogo from '../../assets/github-logo.jpg'
import { NavLink } from 'react-router-dom';

function LandingPage() {
  return (
    <div >
        <h1 className='title'>
           Dog & Dogs
        </h1>
        <h4 className='subtitle'>Este es mi proyecto individual creado con amor por Farith Romero</h4>
        <NavLink to="/home">
          <button className='btn'>Inicio</button>
        </NavLink>
        <img src={dogImage} alt="dog" className="image" />
        <img src={dogGif} alt="dog" className="gif" />
        <h5 className='contact'>Contactame en: </h5>
        <a href="https://www.linkedin.com/in/farith-romero-cano-7b80a5126" target="_blank" rel="noopener noreferrer">
           <img src={linkedinLogo} className='logoLinkedin' alt="LinkedIn" />
        </a>
        <a href="https://github.com/Ruperto1990" target="_blank" rel="noopener noreferrer">
           <img src={githubLogo} className='githubLogo' alt="LinkedIn" />
        </a>
    </div>
  );
}

export default LandingPage;
