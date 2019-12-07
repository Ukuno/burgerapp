import React from 'react';
import Aux from '../../hoc/Aux/Aux';

const layout = ( props ) => (
    <Aux>
        <div>toolbar , somthing , something</div>
        <main>
            {props.children}
        </main>
    </Aux>
);

export default layout;