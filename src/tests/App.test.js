import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import mockFetch from '../../cypress/mocks/fetch';
import testData from '../../cypress/mocks/testData';
import PlanetsProvider from '../context/PlanetsProvider';
import userEvent from '@testing-library/user-event';

describe('Testa a preseça dos componentes na página', () => {
  test('Testa a presença de uma caixa de input do tipo texto', () => {
    render(<App />)
    const inputText = screen.getByRole('textbox');
    expect(inputText).toBeInTheDocument();
  })
  test('Testa a presença do select de filtro númerico para coluna', () => {
    render(<App />)
    const select = screen.getByTestId('column-filter');
    expect(select).toBeInTheDocument();
  })
  test('Testa a presença de um select de lfiltro numerico para a comparação', () => {
    render(<App />)
    const select = screen.getByTestId('comparison-filter');
    expect(select).toBeInTheDocument();
  })
  test('Testa a presença de uma caixa de input do tipo númerico', () => {
    render(<App />)
    const inputNumber = screen.getByRole('spinbutton');
    expect(inputNumber).toBeInTheDocument();
  })
  test('Testa a presença de um botão para o filtro numérico', () => {
    render(<App />)
    const filterButton = screen.getByRole('button', {  name: /filtrar/i})
    expect(filterButton).toBeInTheDocument();
  })
  test('Testa a presença de uma tabela', () => {
    render(<App />)
    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
  })
})

describe('Testa se ocorre uma requisição a API', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
  })
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Testa se é feita uma chamda para a API', () => {
    render(<App />);
    expect(fetch).toHaveBeenCalled();
  })
  test('Testa se todas al linhas são renderizadas', async () => {
    render(<App />);
    const filterButton = await screen.findByRole('button', { name: /filtrar/i }, {timeout: 5000})
    const input = document.getElementsByTagName('tr');
    expect(input).toHaveLength(11);
  }, 7000)

  test('Testa se o filtro por nome está funcionando', async () => {
    render(<App />);
    const filterButton = await screen.findByRole('button', { name: /filtrar/i }, {timeout: 5000})
    const tableRows = document.getElementsByTagName('tr');
    userEvent.click(filterButton);
    expect(tableRows).toHaveLength(9);
  })
  test('Testa o input de texto', async () => {
    render(<App />);
    const tableRows = document.getElementsByTagName('tr');
    const inputText = await screen.findByRole('textbox',{}, {timeout: 5000} );
    userEvent.type(inputText, "t");
    expect(tableRows).toHaveLength(4);
  })
  test('Testa o filtro menor que', async () => {
    render(<App />);
    let filterBtn = screen.getByRole('button', { name: /filtrar/i });
    let inputNumber = await screen.findByRole('spinbutton', {}, { timeout: 5000 });
    userEvent.type(inputNumber, '200000');
    userEvent.click(filterBtn);
    const columnInput = await screen.findByRole('combobox', { name: /Column/i }, { timeout: 5000 })
    const conditionInput = await screen.findByRole('combobox', { name: /Condition/i }, { timeout: 5000 })
    filterBtn = await screen.findByRole('button', { name: /filtrar/i }, { timeout: 5000 });
    inputNumber = await screen.findByRole('spinbutton', {}, { timeout: 5000 });
    userEvent.selectOptions(columnInput, 'diameter')
    userEvent.selectOptions(conditionInput, 'menor que')
    userEvent.clear(inputNumber);
    userEvent.type(inputNumber, '10000');
    userEvent.click(filterBtn);
    await waitFor(() => {
      const tableRows = document.getElementsByTagName('tr');
      expect(tableRows).toHaveLength(2);
    }, 15000)

  })
  test('Testa o filtro maior que', async () => {
    render(<App />);
    let filterBtn = screen.getByRole('button', { name: /filtrar/i });
    let inputNumber = await screen.findByRole('spinbutton', {}, { timeout: 5000 });
    userEvent.type(inputNumber, '200000');
    userEvent.click(filterBtn);
    const columnInput = await screen.findByRole('combobox', { name: /Column/i }, { timeout: 5000 })
    const conditionInput = await screen.findByRole('combobox', { name: /Condition/i }, { timeout: 5000 })
    filterBtn = await screen.findByRole('button', { name: /filtrar/i }, { timeout: 5000 });
    inputNumber = await screen.findByRole('spinbutton', {}, { timeout: 5000 });
    userEvent.selectOptions(columnInput, 'surface_water')
    userEvent.selectOptions(conditionInput, 'maior que')
    userEvent.clear(inputNumber);
    userEvent.type(inputNumber, '8');
    userEvent.click(filterBtn);
    await waitFor(() => {
      const tableRows = document.getElementsByTagName('tr');
      expect(tableRows).toHaveLength(4);
    }, 15000)
    

  })
  test('Testa o filtro igual', async () => {
    render(<App />);
    let filterBtn = screen.getByRole('button', { name: /filtrar/i });
    let inputNumber = await screen.findByRole('spinbutton', {}, { timeout: 5000 });
    userEvent.type(inputNumber, '200000');
    userEvent.click(filterBtn);
    const columnInput = await screen.findByRole('combobox', { name: /Column/i }, { timeout: 5000 })
    const conditionInput = await screen.findByRole('combobox', { name: /Condition/i }, { timeout: 5000 })
    filterBtn = await screen.findByRole('button', { name: /filtrar/i }, { timeout: 5000 });
    inputNumber = await screen.findByRole('spinbutton', {}, { timeout: 5000 });
    userEvent.selectOptions(columnInput, 'surface_water')
    userEvent.selectOptions(conditionInput, 'igual a')
    userEvent.clear(inputNumber);
    userEvent.type(inputNumber, '40');
    userEvent.click(filterBtn);
    await waitFor(() => {
      const tableRows = document.getElementsByTagName('tr');
      expect(tableRows).toHaveLength(2);
    }, 15000)
    

  })  






  test('testa o botão que limpa todos os filtros', async () => {
    render(<App />);
    const clearAllFiltersBtn = screen.getByRole('button', { name: /remover filtros/i });
    const filterBtn = screen.getByRole('button', { name: /filtrar/i });
    const inputNumber = screen.getByRole('spinbutton');
    const columnInput = screen.getByRole('combobox', {name: /Column/i})
    userEvent.type(inputNumber, '200000');
    userEvent.click(filterBtn);
    userEvent.selectOptions(columnInput, 'diameter')
    userEvent.type(inputNumber, '12500');
    userEvent.click(clearAllFiltersBtn);
    await waitFor(() => {
      const tableRows = document.getElementsByTagName('tr');
      expect(tableRows).toHaveLength(11);
    }, 5000)   
  })
})
