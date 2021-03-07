import React, { Component} from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom'
import ContactForm from "./ContactForm/ContactForm";

class Checkout extends Component {
    state = {
        ingredients: null,
        totalPrice : 0
    }

    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredient = {}
        let price = 0
        for(let param of query.entries()) {
            if(param[0]=== 'price'){
                price = param[0]
            } else {
                ingredient[param[0]] = +param[1]
            }
            
        }
        this.setState({ingredients: ingredient, totalPrice: price})
    }

    checkoutCancel = () => {
        this.props.history.goBack();
    }
    checkoutContinue = () => {
        this.props.history.replace("/checkout/contact-form")
    }
render() {
    return (
        <div>
            <CheckoutSummary 
            checkoutCancelled={this.checkoutCancel}
            checkoutContinued={this.checkoutContinue}
            ingredients={this.state.ingredients}/>
            <Route path={this.props.match.path + '/contact-form'} 
            render={(props) => (<ContactForm ingredients={this.state.ingredients} price={this.state.totalPrice} {...props}/>)}/>
        </div>
    )
}

}

export default Checkout;