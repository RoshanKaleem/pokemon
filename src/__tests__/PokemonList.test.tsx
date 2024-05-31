import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import PokemonList from '../components/PokemonList';
import { useGetPokemonListQuery } from '../services/pokemonApi';

jest.mock('../services/pokemonApi', () => ({
  useGetPokemonListQuery: jest.fn(),
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('PokemonList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state initially', () => {
    (useGetPokemonListQuery as jest.Mock).mockReturnValue({
      data: null,
      error: null,
      isLoading: true,
    });

    render(
      <Router>
        <PokemonList />
      </Router>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders error state', () => {
    (useGetPokemonListQuery as jest.Mock).mockReturnValue({
      data: null,
      error: true,
      isLoading: false,
    });

    render(
      <Router>
        <PokemonList />
      </Router>
    );

    expect(screen.getByText('Error loading data')).toBeInTheDocument();
  });

  test('renders pokemon list and navigates on click', () => {
    (useGetPokemonListQuery as jest.Mock).mockReturnValue({
      data: {
        results: [
          { name: 'bulbasaur' },
          { name: 'ivysaur' },
          { name: 'venusaur' },
        ],
      },
      error: null,
      isLoading: false,
    });

    render(
      <Router>
        <PokemonList />
      </Router>
    );

    const pokemonItems = screen.getAllByRole('listitem');
    expect(pokemonItems).toHaveLength(3);

    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('ivysaur')).toBeInTheDocument();
    expect(screen.getByText('venusaur')).toBeInTheDocument();

    // Simulate click on the first pokemon
    fireEvent.click(pokemonItems[0]);
    expect(mockNavigate).toHaveBeenCalledWith('/pokemon/1');
  });
});
