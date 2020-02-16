import React from 'react'
import Aux from '../../../hoc/Aux'

const orderSummary = (props) => {
   const summary = Object.keys(props.ingredients)
    .map( idkey => {
        return (
            <li>
                <p><span style={{textTransform: "capitalize"}}>{idkey}</span>: {props.ingredients[idkey]}</p>
            </li>
        )
    });
   return ( 
     <Aux>
        <p>This is the list of your order</p>
        <ul>
            {summary}
        </ul>
    </Aux>
   )
}

export default orderSummary;