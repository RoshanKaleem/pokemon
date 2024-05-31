import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import PokemonDetails from '../components/PokemonDetails';

jest.mock('react-router-dom', () => ({
  useParams: jest.fn().mockReturnValue({ id: '1' }),
}));

jest.mock('../services/pokemonApi', () => ({
  useGetPokemonDetailsQuery: jest.fn().mockReturnValue({
    data: {
      name: 'Pikachu',
      height: 40,
      weight: 60,
      types: [{ type: { name: 'Electric' } }],
      sprites: { front_default: 'pikachu.png' },
    },
    error: null,
    isLoading: false,
  }),
}));

test('renders Pokemon details', () => {
  render(<PokemonDetails />);

  expect(screen.getAllByText(/Pikachu/i).length).toBeGreaterThan(0);
  expect(screen.getByText(/Height/i)).toBeInTheDocument();
  expect(screen.getByText(/40/i)).toBeInTheDocument();
  expect(screen.getByText(/Weight/i)).toBeInTheDocument();
  expect(screen.getByText(/60/i)).toBeInTheDocument();
  expect(screen.getByText(/Electric/i)).toBeInTheDocument();
});
