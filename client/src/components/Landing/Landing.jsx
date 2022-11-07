import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Landing.module.css'



const Landing = () => {
    return (
        <div className={styles.landingImg}>
            <Link to='/home'>
                <button>ENTER</button>
            </Link>
        </div>
    );
}

export default Landing;