import React from 'react';
import './hero.css';
import { AboutUs } from './AboutUs/AboutUs';
import { Menu } from './Menu/Menu';
import { Footer } from './Footer/Footer';
import { Section } from './section/section';

const Hero = () => {
return (
    <div>
        <Section />
        <AboutUs />
        <Menu />
        <Footer />
    </div>
)
};
export { Hero };
      


