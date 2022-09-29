import React from 'react';
import './styles.scss';

function PageNotFound() {
  return (
    <div>
      <div className="not-found-container">
        <h1>404</h1>
        <p>Page Not Found</p>
        <span>Woops. Looks like this page doesn't exist.</span>
        <div className="boxShadow"></div>
      </div>
    </div>
  )
}
export default PageNotFound;