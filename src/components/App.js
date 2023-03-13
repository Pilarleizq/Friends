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

  const handlerCharacter = (event) => {
    setFilterCharacter(event.target.value);
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
            <select onInput={handlerCharacter} value={filterCharacter} className="filter-character" name="personaje" id="personaje">
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
    </main>
  </div>
  );
}

/* PROP-TYPES */

/* EXPORT DEL COMPONENTE */
export default App;
