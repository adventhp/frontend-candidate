import { Link, useRouteError } from 'react-router-dom';

export const ErrorBoundary = () => {
  const error = useRouteError();
  console.error(error);
  return (
    <main className="page-content">
      <p className="error">Sorry! Something went wrong :(</p>
      <Link to="/">Return to homepage</Link>
    </main>
  );
};
