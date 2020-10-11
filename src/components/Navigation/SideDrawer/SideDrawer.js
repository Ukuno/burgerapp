import React from 'react';
import NavigationItem from '../NavigationItemList/NavigationItem/NavigationItem';
import './SideDrawer.css';
import Logo from '../Logo/Logo';
import BackDrop from '../../Ui/Backdrop/Backdrop';
import AUX from '../../../hoc/Aux';

const sideDrawer = (props) => {
    let showMenuClass = ['SideDrawer', 'Close']
    if(props.open){
        showMenuClass = ['SideDrawer', 'Open']
    }
    return (
        <AUX>
            <BackDrop show={props.open} closed={props.closed}/>
            <div className= {showMenuClass.join(' ')} >
            <div className='sideLogo'>
                <Logo />
            </div>
            
            <nav>
                <NavigationItem link='/' active>Burger </NavigationItem>
                <NavigationItem link='/' >Burger checkout </NavigationItem>
            </nav>
        </div>
        </AUX>
        
    );

}

export default sideDrawer;