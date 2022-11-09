import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { typeImages } from "../../assets/typeImages";

import { useParams, useHistory } from "react-router-dom";
import { useEffect } from "react";

import { getDetail, clearDetail } from "../../redux/actions";
import Loading from "../Loading/Loading";

import styles from "./Detail.module.css";

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

function Detail(props) {
  // console.log(props);
  const { id } = useParams();
  // console.log(id);

  const dispatch = useDispatch();
  const history = useHistory();
  const detail = useSelector((state) => state.detail);

  useEffect(() => {
    dispatch(getDetail(id));
    return () => dispatch(clearDetail());
  }, [dispatch]);

  const handleClick = (e) => {
    e.preventDefault();
    history.push("/home");
  };

  return (
    <>
      <div className={styles.detailBG}>
        <div></div>
        {detail.name !== undefined ? (
          <div>
            <div className={styles.elemId}>
              <p>{pkID(detail.id)}</p>
              <p>{capitalize(detail.name)}</p>
            </div>
            <img
              className={styles.detailImg}
              src={detail.image}
              alt={detail.name}
            />
            <div className={styles.statsContainer}>
              <div className={styles.statsColumn}>
                <p className={styles.stat}>HP: {detail.hp}</p>
                <p className={styles.stat}>Attack: {detail.attack}</p>
                <p className={styles.stat}>
                  Special Attack: {detail.specialAttack}
                </p>
                <p className={styles.stat}>Defense: {detail.defense}</p>
                <p className={styles.stat}>
                  Special Defense: {detail.specialDefense}
                </p>
                <p className={styles.stat}>Speed: {detail.speed}</p>
              </div>
              <div>
                <p className={styles.stat}>Height: {detail.height}</p>

                <p className={styles.stat}>Weight: {detail.weight}</p>

                <div className={styles.typesContainer}>
                  <img
                    src={typeImages[detail.types[0]].url}
                    alt={detail.types[0]}
                  />
                  {detail.types.length === 2 ? (
                    <img
                      src={typeImages[detail.types[1]].url}
                      alt={detail.types[1]}
                    />
                  ) : null}
                </div>
              </div>{" "}
            </div>
          </div>
        ) : (
          <Loading />
        )}
        <button className={styles.btn} onClick={handleClick}>
          Back
        </button>
      </div>
    </>
  );
}

export default Detail;
