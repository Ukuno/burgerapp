import React from "react";
import './Toolbar.css';
import Logo from '../Logo/Logo';
import NavigationItemList from '../NavigationItemList/NavigationItemList';

const toolbar = (props) => (
    <header className='Toolbar'>
        <div>Menu</div>
        <Logo />
        <nav>
            <NavigationItemList />
        </nav>
    </header>
);

export default toolbar;