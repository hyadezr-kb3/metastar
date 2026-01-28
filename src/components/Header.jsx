import React from 'react';
import logo from '../assets/logo.PNG'; // Updated logo import

const Header = () => {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-paper/95 backdrop-blur-md border-b border-stone-800 shadow-sm h-14 transition-all duration-300">
            <div className="max-w-4xl mx-auto px-6 h-full flex items-center justify-center">
                {/* Logo Section */}
                <div className="flex items-center gap-3">
                    <img src={logo} alt="歲局星案" className="h-[42px] w-auto object-contain opacity-90 hover:opacity-100 transition-opacity brightness-0 invert" />
                </div>
            </div>
        </header>
    );
};

export default Header;
