import React, { Component} from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'

class Checkout extends Component {
    state = {
        ingredients: {
            cheese : 1,
            salad: 1,
            bacon: 1
        }
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        debugger
        const ingredient = {}
        for(let param of query.entries()) {
            ingredient[param[0]] = +param[1]
        }
        this.setState({ingredients: ingredient})
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
        </div>
    )
}

}

export default Checkout;