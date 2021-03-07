import React, { Component } from "react";
import Button from '../../../components/Ui/Button/Button'
import './ContactForm.css';
import axios from '../../../axios-orders'
import Spinner from '../../../components/Ui/Spinner/Spinner'

class ContactForm extends Component {
    state = {
        name : '',
        email: '',
        address: {
            street: '',
            post: ''
        },
        loader: false
    }

    orderhandler = (event) => {
        event.preventDefault()
         this.setState({loader: true})
        const order = {
            ingredients : this.props.ingredients,
            price: this.props.price,
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
            this.setState({loader: false})
            this.props.history.push('/')
        })
        .catch(err => {
            this.setState({loader: false})
            console.log(err)
        });
    }

    render() {
        let form = (
                <form>
                    <input type="text" className="ContactInput" name="name" placeholder="Name" />
                    <input type= "email" className="ContactInput" name="email" placeholder="Email" />
                    <input type="text" className="ContactInput" name="street" placeholder="Street Name" />
                    <input type="text" className="ContactInput" name="postal" placeholder="Postal code" />
                    <Button btnType="Success" clicked={this.orderhandler}>ORDER</Button>
                </form> 
                )
        if(this.state.loader) {
            form = <Spinner />
        }
        return (
            <div className="ContactForm">
                <h4>Enter Your Contact Info</h4>
                { form }
            </div>
        )
    }
}

export default ContactForm
