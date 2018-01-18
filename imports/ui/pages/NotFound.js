import React from 'react';
import {IndexLink, Link} from 'react-router';

const NotFound = () => (
    <div>
        <h3>404 - Not Found <IndexLink to="/" activeClassName="active">Go to home</IndexLink></h3>
    </div>
);

export default NotFound;