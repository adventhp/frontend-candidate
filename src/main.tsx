import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ErrorBoundary } from './components/ErrorBoundary';
import { PersonSearchPage } from './components/PersonSearchPage';
import { PersonDetailsPage } from './components/PersonDetailsPage';
import './index.scss';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <PersonSearchPage />,
        handle: 'Person Search',
      },
      {
        path: '/person/:id',
        element: <PersonDetailsPage />,
        handle: 'Person Details',
        errorElement: <ErrorBoundary />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
