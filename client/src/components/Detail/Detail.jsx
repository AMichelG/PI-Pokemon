import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { typeImages } from "../../assets/typeImages";

import { useParams, useHistory } from 'react-router-dom';
import { useEffect } from 'react';

import { getDetail, clearDetail } from '../../redux/actions'
import Loading from '../Loading/Loading'

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function pkID(id) {
    if (id.length > 4) {
        return '#' + id;
    } else {
        let num = id.toString()
        switch (num.length) {
            case 1:
                return '#00' + num;
            case 2:
                return '#0' + num;
            case 3:
                return '#' + num;
            default:
                return num;
        }
    }
}


function Detail(props) {
    console.log(props)
    const { id } = useParams();
    console.log(id)


    const dispatch = useDispatch();
    const history = useHistory();
    const detail = useSelector((state) => state.detail);

    useEffect(() => {
        dispatch(getDetail(id));
        return () => dispatch(clearDetail())
    }, [dispatch])

    const handleClick = (e) => {
        e.preventDefault();
        history.push('/home')
    }

    return (
        <><div>
            <div></div>
            {
                detail.name !== undefined ?
                    <div>
                        <span>{pkID(detail.id)}</span>
                        <h2>{capitalize(detail.name)}</h2>
                        <img src={detail.image} alt={detail.name} />

                        <h3>HP: {detail.hp}</h3>

                        <h3>Attack: {detail.attack}</h3>

                        <h3>Special Attack: {detail.specialAttack}</h3>

                        <h3>Defense: {detail.defense}</h3>

                        <h3>Special Defense: {detail.specialDefense}</h3>

                        <h3>Speed: {detail.speed}</h3>

                        <h3>Height: {detail.height}</h3>

                        <h3>Weight: {detail.weight}</h3>

                        <h3>HP: {detail.hp}</h3>

                    </div>
                    : <Loading />
            }
            <button onClick={handleClick}>Back</button>
        </div></>
    );
}

export default Detail;