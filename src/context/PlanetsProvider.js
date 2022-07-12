import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import fetchPlanets from '../services';

function PlanetsProvider({ children }) {
  const [planetsList, setPlanetsList] = useState([]);

  const filterResidents = (planets) => {
    planets.map((planet) => delete planet.residents);
    return planets;
  };

  useEffect(() => {
    const planetas = async () => {
      const { results } = await fetchPlanets();
      const resultsWithoutResidents = await filterResidents(results);
      setPlanetsList(resultsWithoutResidents);
    };
    planetas();
  }, []);

  return (
    <PlanetsContext.Provider value={ planetsList }>
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default PlanetsProvider;
