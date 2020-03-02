import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import './NavigationItemList.css';


const navigationItemList = (props) => (
    <ul className='NavigationItemList'>
        <NavigationItem link='/' active>Burger </NavigationItem>
        <NavigationItem link='/' >Burger checkout </NavigationItem>
    </ul>
);

export default navigationItemList;