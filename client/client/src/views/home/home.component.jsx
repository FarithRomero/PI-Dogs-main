import './home.styles.css';
import NavigationBar from '../../components/navigationBar/navigationBar.component.jsx';
import SearchBar from '../../components/searchBar/searchBar.component.jsx';
import CardsDogs from '../../components/cardsDogs/cardsDogs.component.jsx';

function Home() {
  return (
    <div >   
      <div className='SearchB'>
        <SearchBar className='SearchB'/>
      </div>
      <div className='NavContainer'>
        <NavigationBar className='NavB'/>
      </div>
      <div className='CardsContainer'>
        <CardsDogs className='Cards'/>
      </div>
    </div>
  );
}

export default Home;
