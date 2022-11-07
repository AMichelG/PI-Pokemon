import React from 'react';
import { typeImages } from '../../assets/typeImages'

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function Card({ name, image, types }) {
    if (!name || !image || !types) {
        throw new Error('faltó algo')
    }
    console.log(types)
    return (<>
        <div>
            <img src={image} alt={name} />
            <h3>{capitalize(name)}</h3>
            <div>
                <img src={typeImages[types[0]].url} alt={types[0]} />
                {types.length === 2
                    ? <img src={typeImages[types[1]].url} alt={types[1]} />
                    : null
                }
            </div>
        </div>
    </>);

}

export default Card;