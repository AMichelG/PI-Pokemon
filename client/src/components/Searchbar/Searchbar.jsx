import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getByName, clearFilter } from "../../redux/actions";

import styles from "./Searchbar.module.css";

function Searchbar({ page }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    page(1);
    dispatch(clearFilter());
    dispatch(getByName(name));
    setName("");
  }

  return (
    <>
      <input
        className={styles.nameInput}
        type="text"
        value={name}
        placeholder="Ex. Pikachu"
        onChange={(e) => handleChange(e)}
      />
      <button
        className={styles.btn}
        type="submit"
        onClick={(e) => handleSubmit(e)}
      >
        Search
      </button>
    </>
  );
}

export default Searchbar;
