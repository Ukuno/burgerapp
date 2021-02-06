import React from 'react'
import Burger from '../../Burger/Burger'
import Button from "../../Ui/Button/Button";
import './CheckoutSummary.css'

export default function checkoutSummary(props) {
    return (
        <div className="CheckoutSummary">
            <h1>We hope it taste GOOD</h1>
            <div style ={{ width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button btnType="Danger" clicked={props.checkoutCancelled}>
                CANCEL
            </Button>
            <Button btnType="Success" clicked={props.checkoutContinued}>
                CONTINUE
            </Button>
            
        </div>
    )
}
