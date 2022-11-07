import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTypes, getPokemon, filterBySource, filterByType, sortByAtt, clearFilter, clearDetail, sortByName } from '../../redux/actions'

import Card from '../Card/Card'
import Loading from '../Loading/Loading'
import Nav from '../Nav/Nav'
import Pagination from '../Pagination/Pagination'
import Searchbar from '../Searchbar/Searchbar';

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function Home() {

    const dispatch = useDispatch();

    //global states
    const pokemon = useSelector(state => state.pokemon)
    const types = useSelector(state => state.types)
    const loading = useSelector(state => state.loading)

    //pagination
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 12
    const indexOfLast = itemsPerPage * currentPage
    const indexOfFirst = indexOfLast - itemsPerPage
    const currentItems = pokemon.slice(indexOfFirst, indexOfLast)
    const page = (pageNum) => {
        setCurrentPage(pageNum)
    }

    const [sorting, setSorting] = useState('')

    useEffect(() => {
        dispatch(getPokemon());
        dispatch(getTypes());
        return dispatch(clearFilter());
        //dispatch(clearDetail());
    }, [dispatch])

    function handleClick(e) {
        e.preventDefault()
        dispatch(clearFilter)
        dispatch(getPokemon())
        setCurrentPage(1)
    }

    /*function handleFilters (e) {
        e.preventDefault
        switch (filter) {
            case 'byType':
                dispatch(filterByType(e.target.value))

        }
    }*/

    function handleFilterByType(e) {
        e.preventDefault()
        dispatch(filterByType(e.target.value))
        setCurrentPage(1)
    }

    function handleFilterBySource(e) {
        e.preventDefault()
        dispatch(filterBySource(e.target.value))
        setCurrentPage(1)
    }

    /*function handleSortByStat (e) {
        switch (stat) {
            case 'hp':

        }
    }*/

    function handleSortByName(e) {
        e.preventDefault()
        dispatch(sortByName(e.target.value))
        setCurrentPage(1)
        setSorting(e.target.value)
    }

    function handleSortByAtt(e) {
        e.preventDefault()
        dispatch(sortByAtt(e.target.value))
        setCurrentPage(1)
        setSorting(e.target.value)
    }

    console.log(pokemon)

    return (<>
        <div>
            <h2>Filters</h2>

            {/*Ordenamiento alfabetico*/}
            <select onChange={handleSortByName}>
                <option value=''>Sort by Name</option>
                <option value='asc'>A - Z</option>
                <option value='desc'>Z - A</option>
            </select>

            {/*Filtro por tipo*/}
            <select onChange={handleFilterByType}>
                <option value='all'>Type</option>
                {types?.map(type => (
                    <option key={type.id} value={type.name}>{capitalize(type.name)}</option>
                ))}
            </select>

            {/*Filtro por lugar de almacenamiento*/}
            <select onChange={handleFilterBySource}>
                <option value='all'>All Pokemon</option>
                <option value='db'>DB pokemon</option>
                <option value='api'>API Pokemon</option>
            </select>

            {/*Ordenamiento por ataque*/}
            <select onChange={handleSortByAtt}>
                <option value=''>Sort by Attack</option>
                <option value='lowest'>Lowest Attack</option>
                <option value='highest'>Highest Attack</option>
            </select>

            <Searchbar />

            <button onClick={handleClick}>Clear</button>
        </div>
        <div>
            {
                loading ? (<Loading />)
                    : !pokemon.length ? (<h2>Not Found</h2>)
                        : currentItems?.map(item => {
                            return (
                                <div key={item.id}>
                                    <Link to={`/home/${item.id}`}>
                                        <Card name={item.name} image={item.image} types={item.types} PokeID={item.id} />
                                    </Link>
                                </div>
                            )
                        })
            }
        </div>
        {
            loading ? (<Loading />)
                : <div>
                    {
                        pokemon.length >= 12 ?
                            <Pagination itemsPerPage={itemsPerPage} totalItems={pokemon.length} page={page} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                            : null
                    }
                </div>
        }
    </>);
}

export default Home;