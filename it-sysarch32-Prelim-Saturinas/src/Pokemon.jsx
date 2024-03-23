const typeColors = {
    'Grass': '#78c850',
    'Fire': '#f08030',
    'Water': '#6890f0',
    'Bug': '#a8b820',
    'Normal': '#a8a878',
    'Poison': '#a040a0',
    'Flying': '#a890f0',
    'Electric': '#f8d030',
    'Ground': '#e0c068',
    'Fairy': '#ee99ac',
    'Fighting': '#c03028',
    'Psychic': '#f85888',
    'Rock': '#b8a038',
    'Steel': '#b8b8d0',
    'Ice': '#98d8d8',
    'Ghost': '#705898',
    'Dragon': '#7038f8',
  };
  function Pokemon ({ pokemon, language }) {
      
      const { id, name, type, base, image } = pokemon;
  
      const getNameByLanguage = () => {
          switch (language) {
            case 'english':
              return name.english;
            case 'japanese':
              return name.japanese;
            case 'chinese':
              return name.chinese;
            case 'french':
              return name.french;
            default:
              return name.english;
          }
        };
  
      return (
          <div className="pokemon">
              <img className="image" src={image}/>
              <h1 className="title">{id} {getNameByLanguage()}</h1>
              <div className="type">
              {pokemon.type.map((type, index) => (
            <span key={index} className="type" style={{ backgroundColor: typeColors[type] }}>{type}</span>
          ))}
              </div>
              <div className="base">
              <ul>
                  <li>HP: {base.HP}</li>
                  <li>Speed: {base.Speed}</li>
                  <li>Attk: {base.Attack}</li>
                  <li>Sp. Attk: {base['Sp. Attack']}</li>
                  <li>Def: {base.Defense}</li>
                  <li>Sp. Def: {base['Sp. Defense']}</li>
              </ul>
              </div>
          </div>
      )
  }
  
  export default Pokemon;   