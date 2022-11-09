import React from "react";
import { typeImages } from "../../assets/typeImages";
import { Link } from "react-router-dom";

import styles from "./Card.module.css";

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function pkID(id) {
  if (id.length > 4) {
    return "#" + id;
  } else {
    let num = id.toString();
    switch (num.length) {
      case 1:
        return "#00" + num;
      case 2:
        return "#0" + num;
      case 3:
        return "#" + num;
      default:
        return num;
    }
  }
}

function Card({ name, image, types, PokeID }) {
  if (!name || !image || !types) {
    throw new Error("Some info is missing");
  }

  // console.log(PokeID)

  const color = typeImages[types[0].color];

  // console.log(types)
  return (
    <>
      <Link to={`/home/${PokeID}`}>
        <div className={styles.cardContainer}>
          <div className={styles.card + " " + styles["type" + color]}>
            <h3 className={styles.cardName}>{capitalize(name)}</h3>
            {PokeID.toString().length < 5 ? (
              <h3 className={styles.cardId}>{pkID(PokeID)}</h3>
            ) : null}

            <img src={image} alt={name} className={styles.cardImg} />

            <div>
              <div className={styles.typesContainer}>
                <img
                  src={typeImages[types[0]].url}
                  alt={types[0]}
                  className={styles.logoTypes}
                />
                {types.length === 2 ? (
                  <img
                    src={typeImages[types[1]].url}
                    alt={types[1]}
                    className={styles.logoTypes}
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}

export default Card;
