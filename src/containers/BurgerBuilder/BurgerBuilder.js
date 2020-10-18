import React, {Component} from 'react';
import Aux from '../../hoc/Aux'

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/Ui/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'

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
        totalPrice : 4,
        purchasable: false,
        purchasing: false    
    }

    updatePurchase(ingredients) {
        const sum = Object.keys(ingredients)
        .map(igkey => {
            return ingredients[igkey]
        })
        .reduce((sum,  el) => {
            return sum +el
        },0);

        this.setState({purchasable: sum > 0});
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
        this.updatePurchase(updateIngredient)

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
        this.updatePurchase(updateIngredient)

    }

    purchasing = () =>{
        this.setState({purchasing: true})
    }

    closeModal = () => {
        this.setState({purchasing: false})
    }

    continuePurchsing = () => {
        const order = {
            ingredients : this.state.ingredients,
            price: this.state.totalPrice.toFixed(2),
            customer : {
                name: 'Fili',
                email: 'fili@fili.com',
                address: {
                    street: '1234st streetName',
                    zipcode: '12345',
                    country : 'USA'
                }
            },
            deliverMethod: 'pickup'
        }
        axios.post('/order.json', order)
        .then(res => {
            console.log(res)
            this.closeModal();
        })
        .catch(err => console.log(err));
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
                <Modal show={this.state.purchasing} closed={this.closeModal}>
                    <OrderSummary  
                    ingredients = {this.state.ingredients}
                    cancel={this.closeModal}
                    continue={this.continuePurchsing}
                    price={this.state.totalPrice}
                    />
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                addedIngredient={ this.addedIngredient}
                removeIngredient={this.removeIngredient}
                disabledBtnKey = {disableIngredientsInfo}
                purchasable = { this.state.purchasable}
                ordered = {this.purchasing}
                price={this.state.totalPrice}
                />
            </Aux>
            );
    }

}

export default BurgerBuilder;