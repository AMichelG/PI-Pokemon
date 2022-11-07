import { React, useState } from 'react'

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
        <nav>
            <ul>
                <button onClick={prevPage} disabled={currentPage === 1 || currentPage < 1}>{'<'}</button>
                {pages && pages.map(number => (
                    <button /*className={currentPage === number ? styles.activeNumber : styles.desactiveNumber}*/ key={number} onClick={() => page(number)} >
                        {number}
                    </button>
                ))}
                <button onClick={nextPage} disabled={currentPage === maxPages || currentPage > maxPages}>{'>'}</button>
            </ul>
        </nav>
    )
}

export default Pagination