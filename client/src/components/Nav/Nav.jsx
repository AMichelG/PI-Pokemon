import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Nav.module.css'

function Nav() {
    return (
        <nav className={styles.navbar}>
            <Link to='/home' className={styles.navLinks} ><p>Home</p></Link>
            <Link to='/create' className={styles.navLinks} ><p>New Pokemon</p></Link>
        </nav>
    );
}

export default Nav;