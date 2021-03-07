import React, {Component} from 'react';
import Aux from '../../hoc/Aux'

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/Ui/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/Ui/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorhandler';

const INGREDIENT_PRICES =    {
    cheese : 0.5,
    meat : 1.0,
    bacon : 0.4,
    salad : 0.7
}

class BurgerBuilder extends Component {

    state = {
        ingredients : null,
        totalPrice : 4,
        purchasable: false,
        purchasing: false,
        loader: false,
        error: false    
    }

    componentDidMount() {
        axios.get('https://react-burgerapp-cc413.firebaseio.com/ingredients.json')
        .then (res => {
            this.setState({ingredients : res.data})
        })
        .catch(error => {
            this.setState({error : true})
        })
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
       

        const queryParms = []

        for( let i in this.state.ingredients) {
            queryParms.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        queryParms.push('price=' + this.state.totalPrice)
        const queryString = queryParms.join('&')
        this.props.history.push({
           pathname: '/checkout',
           search:  '?' + queryString
        })
    }


    render() {
        const disableIngredientsInfo = {
            ...this.state.ingredients
        };

        for(let key in disableIngredientsInfo){
            disableIngredientsInfo[key] = disableIngredientsInfo[key] <= 0;
        }
        let burger  = this.state.error ? <p>there is error getting ingredients</p> : <Spinner />
        let orderSummary = null
        if(this.state.ingredients) {
            burger = (
                <Aux>
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
            )

            orderSummary = <OrderSummary  
                            ingredients = {this.state.ingredients}
                            cancel={this.closeModal}
                            continue={this.continuePurchsing}
                            price={this.state.totalPrice}
                            />
        }

       

        if(this.state.loader) {
            orderSummary = <Spinner />
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} closed={this.closeModal}>
                    { orderSummary }
                </Modal>
                { burger}
            </Aux>
            );
    }

}

export default withErrorHandler(BurgerBuilder, axios);