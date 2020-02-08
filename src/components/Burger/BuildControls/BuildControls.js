import React from 'react';
import './BuildControls.css';

import BuildControl from './BuildControl/BuildControl'

const controls = [
    { label:'Meat', type:'meat'},
    { label:'Bacon', type:'bacon'},
    { label:'Salad', type:'salad'},
    { label:'Cheese', type:'cheese'}
]

const buildControls = (props) => (
    <div className = 'BuildControls'>
        {
            
        controls.map(ctrls => (
            <BuildControl 
            key={ctrls.label} 
            label={ctrls.label} 
            added={() => props.addedIngredient(ctrls.type)}
            remove={() => props.removeIngredient(ctrls.type)}
            disabledBtn= {props.disabledBtnKey[ctrls.type]}
            />
        ))
         }
    </div>
)

export default buildControls;
