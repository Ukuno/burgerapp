import React from "react";
import './Toolbar.css';
import Logo from '../Logo/Logo';
import NavigationItemList from '../NavigationItemList/NavigationItemList';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => (
    <header className='Toolbar'>
        <DrawerToggle clicked={props.drawerToggleHandler}/>
        <div className='toolbarLogo'>
                <Logo />
        </div>
        
        <nav className="DiskTopOnly">
            <NavigationItemList />
        </nav>
    </header>
);

export default toolbar;