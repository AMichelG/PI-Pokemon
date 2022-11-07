import React from 'react';
import { Link } from 'react-router-dom';


function Nav() {
    return (
        <>
            <Link to='/home'><p>Home</p></Link>
            <Link to='/create'><p>Create your own Pokemon</p></Link>

        </>
    );
}

export default Nav;