import './landing.styles.css';
import ButtonCustomized from '../../components/buttons/button.component.jsx';

function LandingPage() {
  return (
    <div>
        <p className='title'>
           Dog & Dogs
        </p>
        <ButtonCustomized className='btn'/>
    </div>
  );
}

export default LandingPage;
