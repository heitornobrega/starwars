import React, { useContext, useEffect, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Table() {
  const data = useContext(PlanetsContext);
  const [inputValue, setInputValue] = useState();
  const [column, setColumn] = useState('population');
  const [comparasion, setCompar] = useState('maior que');
  const [value, setValue] = useState(0);
  const [numericFilter, setNumericFilter] = useState();
  const [dataState, setDataState] = useState(useContext(PlanetsContext));

  const filterCallback = (textFilter, planetName, planet) => {
    if (!textFilter) {
      return planet;
    } if (planetName.includes(inputValue)) {
      return planet;
    }
  };
  useEffect(() => {
    setNumericFilter({
      column,
      comparasion,
      value,
    });
  }, [column, comparasion, value]);

  const applyFilter = () => {
    switch (comparasion) {
    case 'maior que':
      setDataState(data
        .filter((element) => Number(element[numericFilter.column]) > Number(value)));
      break;
    case 'menor que':
      setDataState(data
        .filter((element) => Number(element[numericFilter.column]) < Number(value)));
      break;
    case 'igual a':
      setDataState(data
        .filter((element) => Number(element[numericFilter.column]) === Number(value)));
      break;
    default:
      return setDataState(data);
    }
  };
  const dataToFIlter = () => {
    if (dataState.length !== 0) {
      return dataState;
    }
    return data;
  };
  return (
    <div>
      <input
        name="name"
        data-testid="name-filter"
        id="name-filter"
        type="text"
        onChange={ (e) => setInputValue(e.target.value) }
      />
      <form>
        <select
          data-testid="column-filter"
          onChange={ (e) => setColumn(e.target.value) }
        >
          <option defaultChecked>population</option>
          <option>orbital_period</option>
          <option>diameter</option>
          <option>rotation_period</option>
          <option>surface_water</option>
        </select>
        <select
          data-testid="comparison-filter"
          onChange={ (e) => setCompar(e.target.value) }
        >
          <option defaultChecked>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>
        <input
          defaultValue={ 0 }
          type="number"
          data-testid="value-filter"
          onChange={ (e) => setValue(e.target.value) }
        />
        <button
          data-testid="button-filter"
          type="button"
          onClick={ () => applyFilter() }
        >
          Filtrar

        </button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {dataToFIlter().filter((planet) => (
            filterCallback(inputValue, planet.name, planet)))
            .map(({
              name,
              rotation_period: rotationPeriod,
              orbital_period: orbitalPeriod,
              diameter,
              climate,
              gravity,
              terrain,
              surface_water: surfaceWater,
              population,
              films,
              created,
              edited,
              url,

            }) => (
              <tr key={ name }>
                <td>{name}</td>
                <td>{rotationPeriod}</td>
                <td>{orbitalPeriod}</td>
                <td>{diameter}</td>
                <td>{climate}</td>
                <td>{gravity}</td>
                <td>{terrain}</td>
                <td>{surfaceWater}</td>
                <td>{population}</td>
                <td>{films}</td>
                <td>{created}</td>
                <td>{edited}</td>
                <td>{url}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
