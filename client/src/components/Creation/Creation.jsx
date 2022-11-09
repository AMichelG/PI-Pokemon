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
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <label htmlFor="name">Name: </label>
            <br />
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleChange}
              value={formState.name}
              placeholder="Type a name..."
            />
            <br />
            {errors.name && <p className="errors">{errors.name}</p>}
            <br />
            <label htmlFor="hp">Hitpoints: </label>
            <br />
            <input
              type="number"
              id="hp"
              name="hp"
              onChange={handleChange}
              value={formState.hp}
            />
            <br />
            {errors.hp && <p className="errors">{errors.hp}</p>}
            <br />
            <label htmlFor="attack">Attack: </label>
            <br />
            <input
              type="number"
              id="attack"
              name="attack"
              onChange={handleChange}
              value={formState.attack}
            />
            <br />
            {errors.attack && <p className="errors">{errors.attack}</p>}
            <br />
            <label htmlFor="specialAttack">Special Attack: </label>
            <br />
            <input
              type="number"
              id="specialAttack"
              name="specialAttack"
              onChange={handleChange}
              value={formState.specialAttack}
            />
            <br />
            {errors.specialAttack && (
              <p className="errors">{errors.specialAttack}</p>
            )}
            <br />
            <label htmlFor="defense">Defense: </label>
            <br />
            <input
              type="number"
              id="defense"
              name="defense"
              onChange={handleChange}
              value={formState.defense}
            />
            <br />
            {errors.defense && <p className="errors">{errors.defense}</p>}
            <br />
            <label htmlFor="specialDefense">Special Defense: </label>
            <br />
            <input
              type="number"
              id="specialDefense"
              name="specialDefense"
              onChange={handleChange}
              value={formState.specialDefense}
            />
            <br />
            {errors.specialDefense && (
              <p className="errors">{errors.specialDefense}</p>
            )}
            <br />
            <label htmlFor="speed">Speed: </label>
            <br />
            <input
              type="number"
              id="speed"
              name="speed"
              onChange={handleChange}
              value={formState.speed}
            />
            <br />
            {errors.speed && <p className="errors">{errors.speed}</p>}
            <br />
            <label htmlFor="height">Height: </label>
            <br />
            <input
              type="number"
              id="height"
              name="height"
              onChange={handleChange}
              value={formState.height}
            />
            <br />
            {errors.height && <p className="errors">{errors.height}</p>}
            <br />
            <label htmlFor="weight">Weight: </label>
            <br />
            <input
              type="number"
              id="weight"
              name="weight"
              onChange={handleChange}
              value={formState.weight}
            />
            <br />
            {errors.weight && <p className="errors">{errors.weight}</p>}
            <br />
            <label htmlFor="image">Image: </label>
            <br />
            <input
              type="text"
              id="image"
              name="image"
              onChange={handleChange}
              value={formState.image}
            />
            <br />
            {errors.image && <p className="errors">{errors.image}</p>}
          </div>

          <div>
            <label>Type(s):</label>
            <select onChange={(e) => handleSelect(e)} value="disabled">
              <option value="">Select</option>
              {types.map((t) => (
                <option key={t.name} value={t.name}>
                  {t.name}
                </option>
              ))}
            </select>
            {errors.types && <p>{errors.types}</p>}

            <div>
              {formState.types.map((el) => (
                <div key={el}>
                  <div>
                    <img src={typeImages[el].url} alt="" />
                    <p>{el}</p>
                    <button key={el} onClick={() => handleDelete(el)}>
                      x
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <button
          type="submit"
          disabled={Object.keys(validate(formState)).length > 0 ? true : false}
        >
          Create
        </button>
      </form>
    </>
  );
}

export default Create;
