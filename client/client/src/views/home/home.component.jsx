import './home.styles.css';
import NavigationBar from '../../components/navigationBar/navigationBar.component.jsx';
import SearchBar from '../../components/searchBar/searchBar.component.jsx';
import CardsDogs from '../../components/cardsDogs/cardsDogs.component.jsx';
import ButtonCustomized from '../../components/buttons/button.component.jsx';

function Home() {
  return (
    <div>
        <p>
          Home del Pi 
        </p>
        <NavigationBar />
        <SearchBar />
        <CardsDogs />
        <ButtonCustomized />
    </div>
  );
}

export default Home;
