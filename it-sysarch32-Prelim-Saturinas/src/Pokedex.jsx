import React, { useState, useEffect } from "react";
import Pokemon from "./Pokemon";

const Pokedex = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [language, setLanguage] = useState("English");

  useEffect(() => {
    fetchPokemon(currentPage);
  }, [currentPage]);

  const fetchPokemon = (page) => {
    if (page < 1 || page > totalPages) {
      return;
    }

    fetch(`https://us-central1-it-sysarch32.cloudfunctions.net/pagination?page=${page}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch Pokémon.');
        }
        return response.json();
      })
      .then(data => {
        setPokemonList(data.data);
        setTotalPages(data.totalPages);
      })
      .catch(error => {
        console.error('Error fetching Pokémon:', error);
      });
  };

  const handleLanguageChange = (selectedLanguage) => {
    setLanguage(selectedLanguage);
  };

  const handlePrevPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="pokedex">
      <div className="language-buttons">
        <button onClick={() => handleLanguageChange("English")}>English</button>
        <button onClick={() => handleLanguageChange("Japanese")}>Japanese</button>
        <button onClick={() => handleLanguageChange("Chinese")}>Chinese</button>
        <button onClick={() => handleLanguageChange("French")}>French</button>
      </div>
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>Back</button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index + 1} onClick={() => handlePageChange(index + 1)}>{index + 1}</button>
        ))}
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
      </div>
      <div className="pokemon-list">
        {pokemonList.map(pokemon => (
          <Pokemon key={pokemon.id} pokemon={pokemon} language={language} />
        ))}
      </div>
      <div>Page {currentPage} of {totalPages}</div>
    </div>
  );
};

export default Pokedex;
