import { React, useState } from 'react'

import styles from './Pagination.module.css'

function Pagination({ itemsPerPage, totalItems, page, currentPage, setCurrentPage }) {
    const pages = [];
    const [input, setInput] = useState(currentPage)
    const maxPages = Math.ceil(totalItems / itemsPerPage)

    for (let i = 1; i <= maxPages; i++) {
        pages.push(i)
    }

    function nextPage() {
        setCurrentPage(currentPage + 1);
        setInput(input - 1);
    }

    function prevPage() {
        setCurrentPage(currentPage - 1);
        setInput(input - 1);
    }

    return (
        <nav className={styles.pagContainer}>
            <ul className={styles.pagUlCont}>
                <button className={currentPage === 1 || currentPage < 1 ? styles.disabledBtn : styles.pagBtn} onClick={prevPage} disabled={currentPage === 1 || currentPage < 1}>{'<'}</button>
                {pages && pages.map(number => (
                    <button className={currentPage === number ? styles.disabledBtn : styles.pagBtn} key={number} onClick={() => page(number)} disabled={currentPage === number}>
                        {number}
                    </button>
                ))}
                <button className={currentPage === maxPages || currentPage > maxPages ? styles.disabledBtn : styles.pagBtn} onClick={nextPage} disabled={currentPage === maxPages || currentPage > maxPages}>{'>'}</button>
            </ul>
        </nav>
    )
}

export default Pagination