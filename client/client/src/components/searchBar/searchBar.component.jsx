import './searchBar.styles.css';

function SearchBar({handlerEvent, handlerSubmit}) {
  return (
    <div className='SearchBarContainer'>
      <form onChange={handlerEvent}>
        <input className='inputC' placeholder='Buscar raza' type='search'/>
        <button className='buttonSearch' type='submit' onCLick={handlerSubmit}>Buscar</button>
      </form>
    </div>
  );
}

export default SearchBar;
