import { useEffect, useState } from 'react';
import { Outlet, useMatches } from 'react-router-dom';

export const Header = () => {
  const matches = useMatches();
  const [title, setTitle] = useState('Default Page Title');

  useEffect(() => {
    const match = matches.find((match) => !!match.handle);
    if (typeof match?.handle === 'string') setTitle(match.handle);
  }, [matches]);

  return (
    <header className="page-header">
      <h1>{title}</h1>
    </header>
  );
};

export const Layout = () => (
  <>
    <Header />
    <Outlet />
  </>
);
