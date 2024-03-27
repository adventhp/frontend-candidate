import { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { PersonMatch } from '../types';
import { Link } from 'react-router-dom';

export const PersonForm = ({
  onResults,
  onError,
}: {
  onResults: (matches: PersonMatch[]) => void;
  onError: (error: string | null) => void;
}) => {
  const [term, setTerm] = useState('');
  const [color, setColor] = useState('');

  const handleSubmit = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();

      const params = new URLSearchParams();
      if (term) params.append('term', term);
      if (color) params.append('color', color);

      const requestMatches = async () => {
        try {
          const res = await fetch(`http://localhost:5000/search?` + params);
          const data = await res.json();

          if (!res.ok) {
            throw new Error(data.error);
          }

          onResults(data.matches);
        } catch (e) {
          if (e instanceof Error) {
            onError(e.message);
          } else onError('Unknown error.');
        }
      };

      requestMatches();
    },
    [color, onResults, onError, term]
  );

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <label className="search-form__label">
        <span>Person's name:</span>
        <input
          placeholder="Person"
          className="search-form__input"
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
      </label>
      <label className="search-form__label">
        <span>Favorite color:</span>
        <select value={color} onChange={(e) => setColor(e.target.value)}>
          <option value="">Select a color</option>
          <option value="red">Red</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
        </select>
      </label>
      <button className="search-form__button" type="submit">
        Search
      </button>
    </form>
  );
};

export const PersonCards = ({ cards }: { cards: PersonMatch[] }) => {
  return (
    <>
      {cards?.length ? (
        <section className="card-grid">
          <h2>Search Results</h2>
          {cards.map((person) => (
            <Link key={`card-${person.id}`} className="card-grid__card" to={`/person/${person.id}`}>
              <span>{person.name}</span>
            </Link>
          ))}
        </section>
      ) : (
        <p>Search for people</p>
      )}
    </>
  );
};

export const PersonSearchPage = () => {
  const [results, setResults] = useState<PersonMatch[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError(null);
  }, [results]);

  return (
    <main className="search-page page-content">
      <PersonForm onResults={setResults} onError={setError} />
      {error ? <p className="error">Error: {error}</p> : <PersonCards cards={results} />}
    </main>
  );
};
