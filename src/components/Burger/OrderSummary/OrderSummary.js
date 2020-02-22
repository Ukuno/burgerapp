import React from 'react'
import Aux from '../../../hoc/Aux'
import Button from '../../Ui/Button/Button'

const orderSummary = (props) => {
   const summary = Object.keys(props.ingredients)
    .map( igkey => {
        return (
            <li key={igkey}>
                <p><span style={{textTransform: "capitalize"}}>{igkey}</span>: {props.ingredients[igkey]}</p>
            </li>
        )
    });
   return ( 
     <Aux>
        <p>This is the list of your order</p>
        <ul>
            {summary}
        </ul>
        <Button btnType='Danger' clicked={props.cancel}>CANCEL</Button>
        <Button btnType='Success'clicked={props.continue} >CONTINUE</Button>
    </Aux>
   )
}

export default orderSummary;