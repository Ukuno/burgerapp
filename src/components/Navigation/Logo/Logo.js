import React from 'react';
import LogoImage from '../../../assets/images/original.png';
import './Logo.css';

const logo = () => (
    <div className='Logo'>
        <img src={LogoImage} alt='My Burger App' />
    </div>
)

export default logo;