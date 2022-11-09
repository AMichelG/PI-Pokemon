import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTypes,
  newPokemon,
  getPokemon,
  clearFilter,
} from "../../redux/actions";
import { typeImages } from "../../assets/typeImages";
import { useHistory } from "react-router-dom";

import styles from "./Creation.module.css";

function Create() {
  const dispatch = useDispatch();

  const types = useSelector((state) => state.types);
  const pokemon = useSelector((state) => state.allPokemon);

  const history = useHistory();

  useEffect(() => {
    dispatch(getPokemon());
    dispatch(getTypes());
    dispatch(clearFilter());
  }, [dispatch]);

  const [formState, setFormState] = useState({
    name: "",
    hp: 1,
    attack: 1,
    specialAttack: 1,
    defense: 1,
    specialDefense: 1,
    speed: 1,
    height: 1,
    weight: 1,
    image: "",
    types: [],
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const prop = e.target.name;
    const value = e.target.value;
    setFormState({
      ...formState,
      [prop]: value,
    });
    setErrors(
      validate({
        ...formState,
        [prop]: value,
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //funcion validadora
    dispatch(newPokemon(formState));
    dispatch(clearFilter());
    history.push("/home");
  };

  const handleDelete = (el) => {
    setFormState({
      ...formState,
      types: formState.types.filter((type) => type !== el),
    });
  };

  const handleSelect = (e) => {
    const value = e.target.value;

    setErrors(
      validate({
        ...formState,
        types: [...formState.types, value],
      })
    );

    if (e.target.value === formState.types[0] && formState.types.length < 2) {
      alert("Type already selected");
    } else if (formState.types.length < 2) {
      setFormState({
        ...formState,
        types: [...formState.types, value],
      });
    } else {
      alert("Cannot choose more than two types");
    }
  };

  function validate(formState) {
    let errors = {};

    if (
      pokemon.find(
        (el) => el.name.toLowerCase() === formState.name.toLowerCase()
      )
    ) {
      errors.name = "This Pokemon already exists";
    } else if (!formState.name) {
      errors.name = "Name is required";
    } else if (formState.name.length < 3 || formState.name.length > 15) {
      errors.name = "Name must be between 3 a 12 characters long";
    }

    if (!formState.hp) {
      errors.hp = "Must add a value between 1 - 255";
    } else if (formState.hp < 1 || formState.hp > 255) {
      errors.hp = "Must add a value between 1 - 255";
    }

    if (!formState.attack) {
      errors.attack = "Must add a value between 1 - 180";
    } else if (formState.attack < 1 || formState.attack > 180) {
      errors.attack = "Must add a value between 1 - 180";
    }

    if (!formState.specialAttack) {
      errors.specialAttack = "Must add a value between 1 - 180";
    } else if (formState.specialAttack < 1 || formState.specialAttack > 180) {
      errors.specialAttack = "Must add a value between 1 - 180";
    }

    if (!formState.defense) {
      errors.defense = "Must add a value between 1 - 230";
    } else if (formState.defense < 1 || formState.defense > 230) {
      errors.defense = "Must add a value between 1 - 230";
    }

    if (!formState.specialDefense) {
      errors.specialDefense = "Must add a value between 1 - 230";
    } else if (formState.specialDefense < 1 || formState.specialDefense > 230) {
      errors.specialDefense = "Must add a value between 1 - 230";
    }

    if (!formState.speed) {
      errors.speed = "Must add a value between 1 - 180";
    } else if (formState.speed < 1 || formState.speed > 180) {
      errors.speed = "Must add a value between 1 - 180";
    }

    if (!formState.height) {
      errors.height = "Must add a value between 1 - 200";
    } else if (formState.height < 1 || formState.height > 200) {
      errors.height = "Must add a value between 1 - 200";
    }

    if (!formState.weight) {
      errors.weight = "Must add a value between 1 - 9999";
    } else if (formState.weight < 1 || formState.weight > 9999) {
      errors.weight = "Must add a value between 1 - 9999";
    }

    if (
      formState.image.length > 0 &&
      !formState.image.match(/([^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/gi)
    ) {
      errors.image = "Must be a valid URL";
    }

    if (formState.types.length === 0 || formState.types === undefined) {
      errors.type = "Choose at least one type";
    }

    return errors;
  }

  return (
    <div className={styles.createBG}>
      <p className={styles.createTitle}>Create a new Pokemon</p>
      <form onSubmit={handleSubmit}>
        <div className={styles.mainContainer}>
          <div className={styles.inputsContainer}>
            <div className={styles.flexStart}>
              <label className={styles.createStat} htmlFor="name">
                Name:{" "}
              </label>
              <input
                className={styles.inputStyle}
                type="text"
                id="name"
                name="name"
                onChange={handleChange}
                value={formState.name}
                placeholder="Type a name..."
              />
              <br />
              {errors.name ? (
                <p className={styles.errors}>{errors.name}</p>
              ) : (
                <p className={styles.errors}>&nbsp;</p>
              )}
              <label className={styles.createStat} htmlFor="hp">
                Hitpoints:{" "}
              </label>
              <input
                className={styles.inputStyle}
                type="number"
                id="hp"
                name="hp"
                onChange={handleChange}
                value={formState.hp}
              />
              <br />
              {errors.hp ? (
                <p className={styles.errors}>{errors.hp}</p>
              ) : (
                <p className={styles.errors}>&nbsp;</p>
              )}
              <label className={styles.createStat} htmlFor="attack">
                Attack:{" "}
              </label>
              <input
                className={styles.inputStyle}
                type="number"
                id="attack"
                name="attack"
                onChange={handleChange}
                value={formState.attack}
              />
              <br />
              {errors.attack ? (
                <p className={styles.errors}>{errors.attack}</p>
              ) : (
                <p className={styles.errors}>&nbsp;</p>
              )}
              <label className={styles.createStat} htmlFor="specialAttack">
                Special Attack:{" "}
              </label>
              <input
                className={styles.inputStyle}
                type="number"
                id="specialAttack"
                name="specialAttack"
                onChange={handleChange}
                value={formState.specialAttack}
              />
              <br />
              {errors.specialAttack ? (
                <p className={styles.errors}>{errors.specialAttack}</p>
              ) : (
                <p className={styles.errors}>&nbsp;</p>
              )}
              <label className={styles.createStat} htmlFor="defense">
                Defense:{" "}
              </label>
              <input
                className={styles.inputStyle}
                type="number"
                id="defense"
                name="defense"
                onChange={handleChange}
                value={formState.defense}
              />
              <br />
              {errors.defense ? (
                <p className={styles.errors}>{errors.defense}</p>
              ) : (
                <p className={styles.errors}>&nbsp;</p>
              )}
              <label className={styles.createStat} htmlFor="specialDefense">
                Special Defense:{" "}
              </label>
              <input
                className={styles.inputStyle}
                type="number"
                id="specialDefense"
                name="specialDefense"
                onChange={handleChange}
                value={formState.specialDefense}
              />
              <br />
              {errors.specialDefense ? (
                <p className={styles.errors}>{errors.specialDefense}</p>
              ) : (
                <p className={styles.errors}>&nbsp;</p>
              )}
              <label className={styles.createStat} htmlFor="speed">
                Speed:{" "}
              </label>
              <input
                className={styles.inputStyle}
                type="number"
                id="speed"
                name="speed"
                onChange={handleChange}
                value={formState.speed}
              />
              <br />
              {errors.speed ? (
                <p className={styles.errors}>{errors.speed}</p>
              ) : (
                <p className={styles.errors}>&nbsp;</p>
              )}{" "}
            </div>
            <div className={styles.flexStart}>
              <label className={styles.createStat} htmlFor="height">
                Height:{" "}
              </label>
              <input
                className={styles.inputStyle}
                type="number"
                id="height"
                name="height"
                onChange={handleChange}
                value={formState.height}
              />
              <br />
              {errors.height ? (
                <p className={styles.errors}>{errors.height}</p>
              ) : (
                <p className={styles.errors}>&nbsp;</p>
              )}
              <label className={styles.createStat} htmlFor="weight">
                Weight:{" "}
              </label>
              <input
                className={styles.inputStyle}
                type="number"
                id="weight"
                name="weight"
                onChange={handleChange}
                value={formState.weight}
              />
              <br />
              {errors.weight ? (
                <p className={styles.errors}>{errors.weight}</p>
              ) : (
                <p className={styles.errors}>&nbsp;</p>
              )}{" "}
              <label className={styles.createStat} htmlFor="image">
                Image:{" "}
              </label>
              <input
                className={styles.inputStyle}
                type="text"
                id="image"
                name="image"
                onChange={handleChange}
                value={formState.image}
                placeholder={"Add an URL for your Pokemon's image"}
              />
              <br />
              {errors.image ? (
                <p className={styles.errors}>{errors.image}</p>
              ) : (
                <p className={styles.errors}>&nbsp;</p>
              )}{" "}
              <label className={styles.createStat}>Type(s):</label>
              <select
                className={styles.inputStyle}
                onChange={(e) => handleSelect(e)}
                value="disabled"
              >
                <option className={styles.inputOption} value="">
                  Select
                </option>
                {types.map((t) => (
                  <option
                    className={styles.inputOption}
                    key={t.name}
                    value={t.name}
                  >
                    {t.name}
                  </option>
                ))}
              </select>
              {errors.types && <p>{errors.types}</p>}
              <div className={styles.types}>
                <div className={styles.typesContainer}>
                  {formState.types.map((el) => (
                    <div className={styles.eachType} key={el}>
                      <button
                        className={styles.typeBtn}
                        key={el}
                        onClick={() => handleDelete(el)}
                      >
                        X
                      </button>
                      <img
                        className={styles.typeImg}
                        src={typeImages[el].url}
                        alt=""
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className={styles.btn + " " + styles.createBtn}
            disabled={
              Object.keys(validate(formState)).length > 0 ? true : false
            }
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
}

export default Create;
