/* SECCIÓN DE IMPORT */
// - De React
// - Nuestros
// - Sass
// - Imágenes
import '../styles/App.scss';
// import phrases from '../data/phrases.json';
import { useEffect, useState } from 'react';
import getPhraseFromApi from '../services/api';


/* SECCIÓN DEL COMPONENTE */
function App() {
  /* VARIABLES ESTADO (DATOS) */
  const [data, setData] = useState([]);
  const [filterPhrase, setFilterPhrase] = useState('');
  const [filterCharacter, setFilterCharacter] = useState('Todos');
  const [newPhrase, setNewPhrase] = useState('');
  const [newCharacter, setNewCharacter] = useState('');
  const [error, setError] = useState('');

  /* EFECTOS (día 5) */

  useEffect(() => {
    getPhraseFromApi()
    .then((data) => {
      setData(data);
    });
  }, []);

  const renderList = () => {
    return data
    .filter((eachPhrase)=> {
      return eachPhrase.quote.toLowerCase().includes(filterPhrase.toLowerCase());
    })
    .filter ((eachPhrase)=>{
      if (filterCharacter === 'Todos'){
        return true;
      } else {
      return eachPhrase.character === filterCharacter;
    }})
    .map((eachPhrase, i) => (
      <li className="list__item" key={i}>
        <p>{eachPhrase.quote} </p><p className="character">- {eachPhrase.character}</p>
      </li>
    ));
  };

  /* FUNCIONES HANDLER */
  const handlerFilter = (event) => {
    setFilterPhrase(event.target.value);
  }

  const handleCharacter = (event) => {
    setFilterCharacter(event.target.value);
  }

  const handleNewPhrase = (event) => {
    setNewPhrase(event.target.value);
  }

  const handleNewCharacter = (event) => {
    setNewCharacter(event.target.value);
  }

  const handleClick = (event) => {
    event.preventDefault();
    if (newPhrase !== '' && newCharacter !== '') {
    setData([...data,{
      quote:newPhrase,
      character:newCharacter,
    }]) 
    setNewPhrase('');
    setNewCharacter('');
  } else {
    setError('¡Rellena los campos, armadillo navideño!')
  }
  }

  /* FUNCIONES Y VARIABLES AUXILIARES PARA PINTAR EL HTML */

  /* HTML */
  return (
  <div className="App">
    <header className="header">
      <h1 className="header__title">Frases de friends</h1>
      <form className="form">
        <label htmlFor='filter'>
          Filtrar por frase: 
          <input
            className="filter-name"
            autoComplete="off"
            type="search"
            id="filter"
            name="filter"
            placeholder="Filtrar por frase"
            onInput={handlerFilter}
            value={filterPhrase}
          />
          </label>
          <label htmlFor="personaje">
            Filtrar por personaje:
            <select onInput={handleCharacter} value={filterCharacter} className="filter-character" name="personaje" id="personaje">
              <option value="Todos">Todos</option>
              <option value="Ross">Ross</option>
              <option value="Chandler">Chandler</option>
              <option value="Joey">Joey</option>
              <option value="Rachel">Rachel</option>
              <option value="Phoebe">Phoebe</option>
              <option value="Mónica">Mónica</option>
            </select>
          </label>
        </form>
    </header>
    <main className="phrases">

      <ul className="list">
      {renderList()}
      </ul>
      <p className='error'>{error}</p>
      <form className='new'>
        <h2 className='new-title'>Añade una frase nueva</h2>
        <label htmlFor="phrase">
          Nueva frase:
        <input
        className="new-phrase"
        type="text"
        name="phrase"
        id="phrase"
        placeholder='Nueva frase'
        onInput={handleNewPhrase}
        value={newPhrase}
        />
        </label>
        <label htmlFor="character">
          Nuevo personaje: 
        <input
        className='new-character'
        type="text"
        name="character"
        id="character"
        placeholder='Nuevo personaje'
        onInput={handleNewCharacter}
        value={newCharacter}
        />
        </label>
        <input onClick={handleClick} className="new-phrase__btn" type="submit" value="Añadir nueva frase" />
      
      </form>
    </main>
  </div>
  );
}

/* PROP-TYPES */

/* EXPORT DEL COMPONENTE */
export default App;
