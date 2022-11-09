import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTypes,
  getPokemon,
  filterBySource,
  filterByType,
  sortByAtt,
  clearFilter,
  clearDetail,
  sortByName,
  filterPokemon,
} from "../../redux/actions";

import Card from "../Card/Card";
import Loading from "../Loading/Loading";
import Pagination from "../Pagination/Pagination";
import Searchbar from "../Searchbar/Searchbar";

import styles from "./Home.module.css";

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function Home() {
  const dispatch = useDispatch();

  //global states
  const pokemon = useSelector((state) => state.pokemon);
  const types = useSelector((state) => state.types);
  const loading = useSelector((state) => state.loading);

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const indexOfLast = itemsPerPage * currentPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = pokemon.slice(indexOfFirst, indexOfLast);
  const page = (pageNum) => {
    setCurrentPage(pageNum);
  };

  const [sorting, setSorting] = useState("");

  useEffect(() => {
    dispatch(getPokemon());
    dispatch(getTypes());
    return dispatch(clearFilter());
    //dispatch(clearDetail());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(clearFilter);
    dispatch(getPokemon());
    setCurrentPage(1);
  }

  function handleFilters(e) {
    e.preventDefault();
    dispatch(filterPokemon(e.target.value));
    setCurrentPage(1);
  }

  function handleFilterByType(e) {
    e.preventDefault();
    dispatch(filterByType(e.target.value));
    setCurrentPage(1);
  }

  function handleFilterBySource(e) {
    e.preventDefault();
    // console.log("aqui:", e);
    dispatch(filterBySource(e.target.value));
    setCurrentPage(1);
  }

  /*function handleSortByStat (e) {
        switch (stat) {
            case 'hp':

        }
    }*/

  function handleSortByName(e) {
    e.preventDefault();
    dispatch(sortByName(e.target.value));
    setCurrentPage(1);
    setSorting(e.target.value);
  }

  function handleSortByAtt(e) {
    e.preventDefault();
    dispatch(sortByAtt(e.target.value));
    setCurrentPage(1);
    setSorting(e.target.value);
  }

  // console.log(pokemon);

  return (
    <>
      <div className={styles.homeBG}>
        <div className={styles.filtersContainer}>
          {/*Ordenamiento alfabetico*/}
          <div>
            <h3 className={styles.filterNames}>Name:</h3>
            <select className={styles.filterSelect} onChange={handleSortByName}>
              <option value="">Sort by Name</option>
              <option value="asc">A - Z</option>
              <option value="desc">Z - A</option>
            </select>
          </div>

          {/*Filtro por tipo*/}
          <div>
            <h3 className={styles.filterNames}>Type:</h3>
            <select
              className={styles.filterSelect}
              // onChange={handleFilterByType}
              onChange={handleFilters}
            >
              <option value="allTypes">Type</option>
              {types?.map((type) => (
                <option key={type.id} value={type.name}>
                  {capitalize(type.name)}
                </option>
              ))}
            </select>
          </div>

          {/*Filtro por lugar de almacenamiento*/}
          <div>
            <h3 className={styles.filterNames}>Storage:</h3>
            <select
              className={styles.filterSelect}
              // onChange={handleFilterBySource}
              onChange={handleFilters}
            >
              <option value="all">All Pokemon</option>
              <option value="db">DB pokemon</option>
              <option value="api">API Pokemon</option>
            </select>
          </div>

          {/*Ordenamiento por ataque*/}
          <div>
            <h3 className={styles.filterNames}>Attack:</h3>
            <select className={styles.filterSelect} onChange={handleSortByAtt}>
              <option value="">Sort by Attack</option>
              <option value="lowest">Lowest Attack</option>
              <option value="highest">Highest Attack</option>
            </select>
          </div>

          <div>
            <h3 className={styles.filterNames}> </h3>
            <br></br>
            <Searchbar page={page} />
          </div>

          <button className={styles.clearBtn} onClick={handleClick}>
            Clear
          </button>
        </div>
        <div className={styles.cardGrid}>
          {loading ? (
            <Loading />
          ) : !pokemon.length ? (
            <div>
              <img
                className={styles.notFoundImg}
                src="https://media.giphy.com/avatars/SalgadoDesign/m8aHEdyGEYNE.gif"
                alt="Pokemon Not Found"
              />
              <h1 className={styles.notFoundText}>Pokemon not found</h1>
            </div>
          ) : (
            currentItems?.map((item) => {
              return (
                <div key={item.id}>
                  <Card
                    name={item.name}
                    image={item.image}
                    types={item.types}
                    PokeID={item.id}
                  />
                </div>
              );
            })
          )}
        </div>
        {loading ? null : (
          <div>
            {pokemon.length >= 12 ? (
              <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={pokemon.length}
                page={page}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            ) : null}
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
