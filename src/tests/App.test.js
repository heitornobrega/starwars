import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import mockFetch from '../../cypress/mocks/fetch';
import testData from '../../cypress/mocks/testData';
import PlanetsProvider from '../context/PlanetsProvider';

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
    jest.spyOn(global, 'fetch').mockImplementation(mockFetch)
  })
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Testa se é feita uma chamda para a API', () => {
    render(<App />);
    expect(fetch).toHaveBeenCalled();
  })
})
