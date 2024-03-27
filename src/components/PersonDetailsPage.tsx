import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PersonDetails } from '../types';

type Quote = { likes: number; text: string };

export const Quotes = ({ quoteMap }: { quoteMap: PersonDetails['quotes'] }) => {
  const quotes = Object.entries(quoteMap).reduce((acc, [likes, texts]) => {
    texts.forEach((text) => acc.push({ likes: parseInt(likes), text }));

    return acc;
  }, [] as Quote[]);

  return (
    <>
      {quotes.map((quote, i) => (
        <section key={`quote-${quote.text}-${i}`} className="quote">
          <h3 key={quote.text}>"{quote.text}"</h3>
          <p className="text-soft">{`${quote.likes} likes`}</p>
        </section>
      ))}
    </>
  );
};

export const PersonDetailsPage = () => {
  const { id } = useParams();
  const [details, setDetails] = useState<PersonDetails | null>(null);

  useEffect(() => {
    fetch('http://localhost:5000/details/' + id)
      .then((res) => res.json())
      .then(setDetails);
  }, [id]);

  return (
    <main className="details-page page-content">
      <Link to="/">Back to search results</Link>
      {details ? (
        <article>
          <h2>{details.name}</h2>
          <p className="text-soft">{`Favorite color: ${details.favorite_color}`}</p>
          <Quotes quoteMap={details.quotes} />
        </article>
      ) : null}
    </main>
  );
};
