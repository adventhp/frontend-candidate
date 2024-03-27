import { PersonSearch } from './components/PersonSearchPage';
import { render } from '@testing-library/react';

// mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve('mock response'),
  })
) as jest.Mock;

describe('main', () => {
  it('jest should be available', () => {
    expect(true).toBe(true);
  });

  it('react-testing-library should be available to render components', () => {
    render(<PersonSearch />);
  });
});
