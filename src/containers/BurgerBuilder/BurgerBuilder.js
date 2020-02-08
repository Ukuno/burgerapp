import React, {Component} from 'react';
import Aux from '../../hoc/Aux'

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

const INGREDIENT_PRICES =    {
    cheese : 0.5,
    meat : 1.0,
    bacon : 0.4,
    salad : 0.7
}

class BurgerBuilder extends Component {

    state = {
        ingredients : {
            cheese : 0,
            bacon: 0,
            meat : 0,
            salad: 0
        },
        totalPrice : 4    
    }

    addedIngredient = (type) => {

        const oldCount = this.state.ingredients[type];
        const newCount = oldCount + 1 ;
        const updateIngredient = {
            ...this.state.ingredients
        };
        updateIngredient[type]= newCount;
        const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type]
        this.setState({totalPrice: newPrice, ingredients: updateIngredient})

    }

    removeIngredient = (type) => {

        const oldCount = this.state.ingredients[type];
        const newCount = oldCount - 1 ;
        const updateIngredient = {
            ...this.state.ingredients
        };
        updateIngredient[type]= newCount;
        const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type]
        this.setState({totalPrice: newPrice, ingredients: updateIngredient})

    }



    render() {
        const disableIngredientsInfo = {
            ...this.state.ingredients
        };

        for(let key in disableIngredientsInfo){
            disableIngredientsInfo[key] = disableIngredientsInfo[key] <= 0;
        }
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                addedIngredient={ this.addedIngredient}
                removeIngredient={this.removeIngredient}
                disabledBtnKey = {disableIngredientsInfo}
                />
            </Aux>
            );
    }

}

export default BurgerBuilder;