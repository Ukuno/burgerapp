import React from 'react';
import './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    const transformIngredients = Object.keys(props.ingredients) // [[cheese],[bacon],[salad],[meat]]
    .map(igkey => {
        return [...Array(props.ingredients[igkey])].map((e, i) => {
            return <BurgerIngredient key={igkey + i} type={igkey}/>
        });
    });
    
    return (
        <div className='Burger'>

            <BurgerIngredient type='bread-top' />

            {transformIngredients}

            <BurgerIngredient type='bread-bottom' />

        </div>
    )
}

export default burger;