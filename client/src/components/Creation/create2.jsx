import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getTypes, postPokemon, cleanPokemons, cleanDetail, getPokemons } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import styles from './PokemonCreate.module.css'
// import FileBase from 'react-file-base64';

import bug from '../../images/logos/bug.png'
import dark from '../../images/logos/dark.png'
import dragon from '../../images/logos/dragon.png'
import electric from '../../images/logos/electric.png'
import fairy from '../../images/logos/fairy.png'
import fighting from '../../images/logos/fighting.png'
import fire from '../../images/logos/fire.png'
import flying from '../../images/logos/flying.png'
import ghost from '../../images/logos/ghost.png'
import grass from '../../images/logos/grass.png'
import ground from '../../images/logos/ground.png'
import ice from '../../images/logos/ice.png'
import normal from '../../images/logos/normal.png'
import psychic from '../../images/logos/psychic.png'
import poison from '../../images/logos/poison.png'
import rock from '../../images/logos/rock.png'
import steel from '../../images/logos/steel.png'
import water from '../../images/logos/water.png'
import unknown from '../../images/logos/unknown.png'
import shadow from '../../images/logos/shadow.jpg'

function getLogoType(type) {
    switch (type) {
        case 'bug':
            return bug;
        case 'dark':
            return dark;
        case 'dragon':
            return dragon
        case 'electric':
            return electric;
        case 'fairy':
            return fairy;
        case 'fighting':
            return fighting
        case 'fire':
            return fire;
        case 'flying':
            return flying;
        case 'ghost':
            return ghost
        case 'grass':
            return grass;
        case 'ground':
            return ground;
        case 'ice':
            return ice;
        case 'normal':
            return normal;
        case 'psychic':
            return psychic;
        case 'poison':
            return poison
        case 'rock':
            return rock;
        case 'steel':
            return steel;
        case 'water':
            return water
        case 'shadow':
            return shadow;
        case 'unknown':
            return unknown;
        default:
            break
    }
}


function PokemonCreate() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const types = useSelector((state) => state.types);
    const [errors, setErrors] = useState({});
    const allPokemonsCheck = useSelector((state) => state.allPokemons);

    const [input, setInput] = useState({
        name: '',
        hp: '',
        attack: '',
        defense: '',
        speed: '',
        height: '',
        weight: '',
        img: '',
        types: []
    })

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }));
    }

    function handleSelect(e) {
        setErrors(validate({
            ...input,
            types: [...input.types, e.target.value]
        }));
        if (e.target.value === input.types[0] && input.types.length < 2) {
            alert("You can't select the same type 2 times")
        }
        else if (input.types.length < 2) {
            setInput({
                ...input,
                types: [...input.types, e.target.value]
            })
        } else {
            alert("Max 2 types")
        }
    }

    const myPassowrd = "frichieri create";

    function handleSubmit(e) {
        if (window.prompt('Password:') === myPassowrd) {
            e.preventDefault();
            dispatch(postPokemon(input))
            alert('Pokemon created successfully.')
            setInput({
                name: '',
                hp: '',
                attack: '',
                defense: '',
                speed: '',
                height: '',
                weight: '',
                img: '',
                types: []
            })
            dispatch(cleanPokemons());
            dispatch(cleanDetail());
            navigate('/home');
        } else alert('Password incorrect.');
    }

    function handleDelete(el) {
        setErrors(validate({
            ...input,
            types: input.types.filter((e) => e !== el)
        }));
        setInput({
            ...input,
            types: input.types.filter(type => type !== el),
        })
    }

    useEffect(() => {
        dispatch(getPokemons());
        dispatch(getTypes());
        dispatch(cleanPokemons());
    }, [dispatch]);

    function validate(input) {
        let errors = {};
        let existent = false;
        allPokemonsCheck.map(p => p.name === input.name ? existent = true : null);
        if (existent) {
            errors.name = 'That pokemon already exists.'
        } if (!/^[A-Z]/.test(input.name)) {
            errors.name = 'First letter must be uppercase';
        } if (!/^[a-zA-Z]+$/.test(input.name)) {
            errors.name = 'Only letters are accepted';
        } if (input.name.length > 12) {
            errors.name = 'Max 12 characters';
        } if (!input.name) {
            errors.name = 'Name required';
        } if (!input.hp || !/^0*([0-9]|[1-8][0-9]|9[0-9]|1[0-9]{2}|2[0-4][0-9]|250)$/.test(input.hp)) {
            errors.hp = '250 max';
        } if (!input.hp) {
            errors.hp = 'Hp required';
        } if (!input.attack || !/^0*([0-9]|[1-8][0-9]|9[0-9]|1[0-9]{2}|2[0-4][0-9]|250)$/.test(input.attack)) {
            errors.attack = '250 max';
        } if (!input.attack) {
            errors.attack = 'Attack required';
        } if (!input.defense || !/^0*([0-9]|[1-8][0-9]|9[0-9]|1[0-9]{2}|2[0-4][0-9]|250)$/.test(input.defense)) {
            errors.defense = '250 max';
        } if (!input.defense) {
            errors.defense = 'Defense required';
        } if (!input.speed || !/^0*([0-9]|[1-8][0-9]|9[0-9]|1[0-9]{2}|2[0-4][0-9]|250)$/.test(input.speed)) {
            errors.speed = '250 max';
        } if (!input.speed) {
            errors.speed = 'Speed required';
        } if (!input.height || !/^0*([0-9]|[1-8][0-9]|9[0-9]|1[0-9]{2}|2[0-4][0-9]|250)$/.test(input.height)) {
            errors.height = '250 max';
        } if (!input.height) {
            errors.height = 'Height required';
        } if (!input.weight || !/^0*([0-9]|[1-8][0-9]|9[0-9]|1[0-9]{2}|2[0-4][0-9]|250)$/.test(input.weight)) {
            errors.weight = '250 max';
        } if (!input.weight) {
            errors.weight = 'Weight required';
        } if (!input.img.length) {
            errors.img = 'Link image required';
        } if (!/([^\s(["<,>/]*)(\/)[^\s[",><]*(.png|.jpg|jpeg|avatars|png|svg|.jpeg|jpg|encrypted)(\?[^\s[",><]*)?/g.test(input.img)) {
            errors.img = 'Try with other link';
        } if (!input.img) {
            errors.img = 'Image required'
        } if (input.types.length === 0 || input.types === undefined) {
            errors.types = 'Type required';
        }
        return errors;
    }

    return (
        <div className={styles.pokemonCreatePage}>
            <nav className={styles.exitSearchAndCreateNav}>
                <div className={styles.backContainer}>
                    <Link to="/home"><h1 className={styles.back}>Home</h1></Link>
                </div>
            </nav>

            <div className={styles.pokemonCreateContainer}>
                <div className={styles.pokemonCreate}>
                    <h1>Create a new pokemon</h1>
                    <form onSubmit={(e) => handleSubmit(e)} autoComplete="off">
                        <div className={styles.inputContainer}>
                            <label>Name: </label>
                            <input type='text' value={input.name} name='name' placeholder='Name' onChange={handleChange} className={styles.inputName} required />
                            <span>{errors.name && (<p className='error'>{errors.name}</p>)}</span>
                        </div>
                        <div className={styles.inputContainer}>
                            <label>Hp: </label>
                            <input type='number' value={input.hp} name='hp' placeholder='Hp' max="250" min="0" onChange={handleChange} required />
                            <progress max="250" value={input.hp}></progress>
                            <span>{errors.hp && (<p className='error'>{errors.hp}</p>)}</span>
                        </div>
                        <div className={styles.inputContainer}>
                            <label>Attack: </label>
                            <input type='number' value={input.attack} name='attack' placeholder='Attack' max="250" min="0" onChange={handleChange} required />
                            <progress max="250" value={input.attack}></progress>
                            <span>{errors.attack && (<p className='error'>{errors.attack}</p>)}</span>
                        </div>
                        <div className={styles.inputContainer}>
                            <label>Defense: </label>
                            <input type='number' value={input.defense} name='defense' placeholder='Defense' max="250" min="0" onChange={handleChange} required />
                            <progress max="250" value={input.defense} ></progress>
                            <span>{errors.defense && (<p className='error'>{errors.defense}</p>)}</span>
                        </div>
                        <div className={styles.inputContainer}>
                            <label>Speed: </label>
                            <input type='number' value={input.speed} name='speed' placeholder='Speed' max="250" min="0" onChange={handleChange} required />
                            <progress max="250" value={input.speed}></progress>
                            <span>{errors.speed && (<p className='error'>{errors.speed}</p>)}</span>
                        </div>
                        <div className={styles.inputContainer}>
                            <label>Height: </label>
                            <input type='number' value={input.height} name='height' placeholder='Height' max="250" min="0" onChange={handleChange} required />
                            <progress max="250" value={input.height}></progress>
                            <span>{errors.height && (<p className='error'>{errors.height}</p>)}</span>
                        </div>
                        <div className={styles.inputContainer}>
                            <label>Weight: </label>
                            <input type='number' value={input.weight} name='weight' placeholder='Weight' max="250" min="0" onChange={handleChange} required />
                            <progress max="250" value={input.weight}></progress>
                            <span>{errors.weight && (<p className='error'>{errors.weight}</p>)}</span>
                        </div>
                        <div className={styles.inputContainer}>
                            <label>Type:</label>
                            <select onChange={(e) => handleSelect(e)} className={styles.selectTypes} value='disabled'>
                                <option value=''>Select</option>
                                {types.map((t) => (<option key={t.name} value={t.name} className={styles.optionsSelect}>{t.name}</option>))}
                            </select>
                            <span>{errors.types && (<p className='error'>{errors.types}</p>)}</span>

                            <div className={styles.typeSelectedContainer}>
                                {input.types.map(el =>
                                    <div key={el}>
                                        <div className={styles.typeSelectedContainerIn}>
                                            <img className={styles.typeLogoSelected} src={getLogoType(el)} alt="" />
                                            <p className={styles.typeSelected}>{el}</p>
                                            <button key={el} className={styles.xButton} onClick={() => handleDelete(el)}>x</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className={styles.inputContainer}>
                            <label>Image: </label>
                            <input type='text' value={input.img} name='img' placeholder='Link' onChange={handleChange} />
                            {/* <FileBase type="file" multiple={false} name='img' onDone={({base64}) => setInput({ ...input, img: base64 })} /> */}

                            <img src={input.img} alt="" />
                            <span>{errors.img && (<p className='error'>{errors.img}</p>)}</span>
                        </div>
                        <button className={styles.createButton} type='submit' disabled={errors.name || errors.hp || errors.attack || errors.defense || errors.speed || errors.height || errors.weight || errors.img || errors.types || input.name === '' ? true : false} >Create</button>
                        {/* <button className={styles.createButton} type='submit' disabled={errors.name || errors.hp || errors.attack || errors.defense || errors.speed || errors.height || errors.weight || errors.types || input.name === '' ? true : false } >Create</button> */}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default PokemonCreate