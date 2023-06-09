import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import fetchPlanets from '../services';

function PlanetsProvider({ children }) {
  const [planetsList, setPlanetsList] = useState([]);
  const [dataState, setDataState] = useState([]);
  const filterResidents = (planets) => {
    planets.map((planet) => delete planet.residents);
    return planets;
  };
  const umNeg = -1;
  useEffect(() => {
    const planetas = async () => {
      const { results } = await fetchPlanets();
      const resultsWithoutResidents = filterResidents(results);
      setPlanetsList(resultsWithoutResidents);
      setDataState(resultsWithoutResidents.sort((a, b) => (a.name > b.name ? 1 : umNeg)));
    };
    planetas();
  }, []);
  // console.log(planetsList);
  return (
    <PlanetsContext.Provider value={ { planetsList, dataState, setDataState } }>
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default PlanetsProvider;
