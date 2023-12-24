import React from 'react';
import { pages, routes } from '../../App';
import { Link } from 'react-router-dom';
// import styles from './sitemappage.css';

export function SiteMapPage() {
  return (
    <>
      <h2>Карта сайта</h2>
      <ul>
        {pages.map((page) =>
          page !== 'editClientPage' ? (
            <li>
              <Link to={routes[page].route}>{routes[page].name}</Link>
            </li>
          ) : null
        )}
      </ul>
    </>
  );
}
