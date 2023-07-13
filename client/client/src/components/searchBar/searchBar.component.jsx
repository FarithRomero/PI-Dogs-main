import './searchBar.styles.css';

function SearchBar() {
  return (
    <div className='SearchBarContainer'>
      <form>
        <input lassName='inputC' placeholder='Buscar raza'/>
        <button lassName='buttonC'>Buscar</button>
      </form>
    </div>
  );
}

export default SearchBar;
