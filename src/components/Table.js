import React, { useContext, useEffect, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Table() {
  const initaColomuns = ['population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
  const { planetsList, dataState, setDataState } = useContext(PlanetsContext);
  const [inputValue, setInputValue] = useState();
  const [column, setColumn] = useState('population');
  const [comparasion, setCompar] = useState('maior que');
  const [value, setValue] = useState(0);
  const [columnFilterOpt, setColumnFilterOpt] = useState(initaColomuns);
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);
  const [order, setOrder] = useState({ column: 'population', sort: 'ASC' });
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
  useEffect(() => {
    // console.log(dataState);
    let newData = [...planetsList];
    // console.log(newData);
    filterByNumericValues.forEach((plan) => {
      switch (plan.comparasion) {
      case 'maior que':
        newData = newData
          .filter((element) => Number(element[plan.column]) > Number(plan.value));
        break;
      case 'menor que':
        newData = newData
          .filter((element) => Number(element[plan.column]) < Number(plan.value));
        break;
      default:
        newData = newData
          .filter((element) => Number(element[plan.column]) === Number(plan.value));
      }
    });
    setDataState(newData);
  }, [filterByNumericValues]);
  const applyFilter = () => {
    setFilterByNumericValues([...filterByNumericValues, { column, comparasion, value }]);
    setColumnFilterOpt(columnFilterOpt.filter((ele) => column !== ele));
    setColumn(columnFilterOpt[0]);
  };
  const testFun = (variavel) => {
    setFilterByNumericValues(filterByNumericValues
      .filter((curr) => curr.column !== variavel.column));
    setColumnFilterOpt([...columnFilterOpt, variavel.column]);
    setColumn(columnFilterOpt[0]);
  };
  const sortData = () => {
    const sortedList = [...planetsList];
    if (order.sort === 'ASC') {
      sortedList.sort((a, b) => ((Number(a[order.column]) || Infinity)
      - (Number(b[order.column]) || Infinity)));
      setDataState(sortedList);
    } else {
      sortedList.sort((a, b) => ((Number(b[order.column]) || 0)
      - (Number(a[order.column]) || 0)));
      setDataState(sortedList);
    }
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
        <label htmlFor="columnFilter">
          Column
          <select
            id="columnFilter"
            data-testid="column-filter"
            onChange={ (e) => setColumn(e.target.value) }
          >
            {columnFilterOpt.map((opt) => (<option key={ opt }>{ opt }</option>))}
          </select>
        </label>
        <label htmlFor="comparisonFilter">
          Condition
          <select
            id="comparisonFilter"
            data-testid="comparison-filter"
            onChange={ (e) => setCompar(e.target.value) }
          >
            <option defaultChecked>maior que</option>
            <option>menor que</option>
            <option>igual a</option>
          </select>
        </label>
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
        <form>
          <label htmlFor="sort">
            Sort
            <select
              data-testid="column-sort"
              name="sort"
              id="sort"
              onChange={ (e) => setOrder({ ...order, column: e.target.value }) }
            >
              {initaColomuns.map((opt) => <option key={ opt }>{opt}</option>)}
            </select>
          </label>
          <label htmlFor="upward">
            <input
              type="radio"
              name="radioMenu"
              id="upward"
              value="ASC"
              data-testid="column-sort-input-asc"
              onChange={ () => setOrder({ ...order, sort: 'ASC' }) }
            />
            Upward
          </label>
          <label htmlFor="downward">
            <input
              type="radio"
              name="radioMenu"
              id="downward"
              value="DESC"
              data-testid="column-sort-input-desc"
              onChange={ () => setOrder({ ...order, sort: 'DESC' }) }
            />
            Downward
          </label>
          <button
            type="button"
            onClick={ () => sortData() }
            data-testid="column-sort-button"
          >
            Sort
          </button>
        </form>
      </form>
      {filterByNumericValues && (
        filterByNumericValues
          .map((el) => (
            <div key={ el.name } data-testid="filter">
              {`${el.column} ${el.comparasion} ${el.value}`}
              <button
                type="button"
                onClick={ () => testFun(el) }
                data-testid="delte-filter"
              >
                X
              </button>
            </div>
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
                <td data-testid="planet-name">{name}</td>
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
