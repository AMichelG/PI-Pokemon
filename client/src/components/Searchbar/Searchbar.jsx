import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getByName, clearFilter } from '../../redux/actions';

function Searchbar() {
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    function handleChange(e) {
        e.preventDefault();
        setName(e.target.value)
    };

    function handleSubmit(e) {
        e.preventDefault();

        dispatch(clearFilter());
        dispatch(getByName(name));
        setName('');
    };

    return (
        <div>
            <input
                type='text'
                value={name}
                placeholder='Ex. Pikachu'
                onChange={(e) => handleChange(e)} />
            <button
                type='submit'
                onClick={(e) => handleSubmit(e)}>Search</button>
        </div>
    );
}

export default Searchbar;
