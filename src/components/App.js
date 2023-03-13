/* SECCIÓN DE IMPORT */
// - De React
// - Nuestros
// - Sass
// - Imágenes
import '../styles/App.scss';
import phrases from '../data/phrases.json';
import { useState } from 'react';


/* SECCIÓN DEL COMPONENTE */
function App() {
  /* VARIABLES ESTADO (DATOS) */
  const [data, setData] = useState(phrases);
  const [filterPhrase, setFilterPhrase] = useState('');
  const [filterCharacter, setFilterCharacter] = useState('');
  const [newPhrase, setNewPhrase] = useState('');
  const [newCharacter, setNewCharacter] = useState('');

  /* EFECTOS (día 5) */

  const renderList = () => {
    return data
    .filter((eachPhrase)=> {
      return eachPhrase.quote.toLowerCase().includes(filterPhrase.toLowerCase());
    })
    .filter ((eachPhrase)=>{
      return eachPhrase.character.includes(filterCharacter);
    })
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
    event.prevent.default();
    setData([...data,newPhrase])
    setNewPhrase();
  }

  /* FUNCIONES Y VARIABLES AUXILIARES PARA PINTAR EL HTML */

  /* HTML */
  return (
  <div className="App">
    <header className="header">
      <h1 className="header__title">Frases de friends</h1>
      <form className="form">
        <label>
          Filtrar por frase: 
          <input
            className="filter-name"
            autoComplete="off"
            type="search"
            name="filter"
            placeholder="Filtrar por frase"
            onInput={handlerFilter}
            value={filterPhrase}
          />
          </label>
          <label>
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

      <form className='new'>
        <h2 className='new-title'>Añade una frase nueva</h2>
        <label>
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
        <label>
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
