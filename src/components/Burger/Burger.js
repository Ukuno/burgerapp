import React from 'react';
import './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    let transformIngredients = Object.keys(props.ingredients) // [[cheese],[bacon],[salad],[meat]]
    .map(igkey => {
        return [...Array(props.ingredients[igkey])].map((e, i) => {
            return <BurgerIngredient key={igkey + i} type={igkey}/>
        });
    }).reduce((arr , element) => { 
        return arr.concat(element)
    }, []);

    if(transformIngredients.length === 0) {
        transformIngredients = <p>Please add ingredients!!</p>
    }

    return (
        <div className='Burger'>

            <BurgerIngredient type='bread-top' />

            {transformIngredients}

            <BurgerIngredient type='bread-bottom' />

        </div>
    )
}

export default burger;