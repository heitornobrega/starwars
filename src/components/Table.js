import React, { useContext, useEffect, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';
// import response from '../mocks/response';

function Table() {
  const initaColomuns = ['population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
  const data = useContext(PlanetsContext);
  const { planetsList, dataState, setDataState } = useContext(PlanetsContext);
  const [inputValue, setInputValue] = useState();
  const [column, setColumn] = useState('population');
  const [comparasion, setCompar] = useState('maior que');
  const [value, setValue] = useState(0);
  // const [numericFilter, setNumericFilter] = useState();

  const [columnFilterOpt, setColumnFilterOpt] = useState(initaColomuns);
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);
  const filterCallback = (textFilter, planetName, planet) => {
    if (!textFilter) {
      return planet;
    } if (planetName.includes(inputValue)) {
      return planet;
    }
  };
  const clearAllFilters = () => {
    setDataState(planetsList);
    setColumnFilterOpt(initaColomuns);
    setFilterByNumericValues([]);
    setColumn(columnFilterOpt[0]);
  };
  // useEffect(() => {
  //   setNumericFilter({
  //     column,
  //     comparasion,
  //     value,
  //   });
  // }, [column, comparasion, value, filterByNumericValues]);
  useEffect(() => {
    console.log(dataState);
    let newData = [...planetsList];
    console.log(newData);
    filterByNumericValues.forEach((plan) => {
      switch (plan.comparasion) {
      case 'maior que':
        console.log('maior que');
        newData = newData
          .filter((element) => Number(element[plan.column]) > Number(plan.value));
        break;
      case 'menor que':
        newData = newData
          .filter((element) => Number(element[plan.column]) < Number(plan.value));
        break;
      default:
        console.log('igual');
        newData = newData
          .filter((element) => Number(element[plan.column]) === Number(plan.value));
      }
      // if (dataState.length === 0) {
      //   console.log(dataState);
      //   setDataState(planetsList);
      // }
    });
    setDataState(newData);
  }, [filterByNumericValues]);

  // useEffect(() => {
  //   setDataState(data);
  // }, [data]);

  const applyFilter = () => {
    console.log('entrou no apply');
    // if (!arg) {
    console.log('entrou no arg');
    setFilterByNumericValues([...filterByNumericValues, { column, comparasion, value }]);
    setColumnFilterOpt(columnFilterOpt.filter((ele) => column !== ele));
    // }
    console.log(filterByNumericValues);
    // switch (plan.comparasion) {
    // case 'maior que':
    //   console.log('maior que');
    //   setDataState(newData
    //     .filter((element) => Number(element[plan.column]) > Number(plan.value)));
    //   break;
    // case 'menor que':
    //   setDataState(newData
    //     .filter((element) => Number(element[plan.column]) < Number(plan.value)));
    //   break;
    // default:
    //   console.log('igual');
    //   setDataState(newData
    //     .filter((element) => Number(element[plan.column]) === Number(plan.value)));
    // }
    // setColumnFilterOpt(columnFilterOpt.filter((ele) => column !== ele));
    setColumn(columnFilterOpt[0]);
  };
  const testFun = (variavel) => {
    setFilterByNumericValues(filterByNumericValues
      .filter((curr) => curr.column !== variavel.column));
    setColumnFilterOpt([...columnFilterOpt, variavel.column]);
    setColumn(columnFilterOpt[0]);
    console.log(data);
    // const newData = data;
    // dataState(newData);
    console.log(data);
    // filterByNumericValues.forEach((plan) => {
    //   setColumn(plan.column);
    //   setCompar(plan.comparasion);
    //   setValue(plan.value);
    //   // applyFilter(true, newData, plan);
    // });
  };
  // const dataToFIlter = () => {
  //   if (dataState.length !== 0) {
  //     return dataState;
  //   }
  //   return data;
  // };
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
          {columnFilterOpt.map((opt) => (<option key={ opt }>{ opt }</option>))}
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
        <button
          type="button"
          data-testid="button-remove-filters"
          onClick={ clearAllFilters }
        >
          REMOVER FILTROS
        </button>
      </form>
      {filterByNumericValues && (
        filterByNumericValues
          .map((el) => (
            <span key={ el.name } data-testid="filter">
              {`${el.column} ${el.comparasion} ${el.value}`}
              <button
                type="button"
                onClick={ () => testFun(el) }
              >
                X
              </button>
            </span>
          )))}
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
          {dataState.length !== 0 && dataState.filter((planet) => (
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
