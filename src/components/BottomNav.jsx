import React from 'react';
import { Compass, BookOpen, Calendar } from 'lucide-react'; // Using icons for tabs

const BottomNav = ({ activeTab, setActiveTab }) => {
    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-paper/95 backdrop-blur-md border-t border-stone-800 pb-safe shadow-[0_-1px_3px_rgba(0,0,0,0.5)]">
            <div className="flex justify-around items-center h-16 max-w-lg mx-auto">
                <button
                    onClick={() => setActiveTab('calendar')}
                    className={`flex flex-col items-center justify-center w-full h-12 rounded-xl transition-all duration-300 mx-2 ${activeTab === 'calendar'
                        ? 'bg-clay text-white shadow-lg scale-105'
                        : 'text-stone-400 hover:text-ink'
                        }`}
                >
                    <Calendar className="w-6 h-6 mb-1" strokeWidth={activeTab === 'calendar' ? 2 : 1.5} />
                    <span className="text-xs font-sans font-bold tracking-widest">萬年曆</span>
                </button>

                <button
                    onClick={() => setActiveTab('fortune')}
                    className={`flex flex-col items-center justify-center w-full h-12 rounded-xl transition-all duration-300 mx-2 ${activeTab === 'fortune'
                        ? 'bg-clay text-white shadow-lg scale-105'
                        : 'text-stone-400 hover:text-ink'
                        }`}
                >
                    <BookOpen className="w-6 h-6 mb-1" strokeWidth={activeTab === 'fortune' ? 2 : 1.5} />
                    <span className="text-xs font-sans font-bold tracking-widest">流年運程</span>
                </button>

                <button
                    onClick={() => setActiveTab('flying_star')}
                    className={`flex flex-col items-center justify-center w-full h-12 rounded-xl transition-all duration-300 mx-2 ${activeTab === 'flying_star'
                        ? 'bg-clay text-white shadow-lg scale-105'
                        : 'text-stone-400 hover:text-ink'
                        }`}
                >
                    <Compass className="w-6 h-6 mb-1" strokeWidth={activeTab === 'flying_star' ? 2 : 1.5} />
                    <span className="text-xs font-sans font-bold tracking-widest">九宮飛星</span>
                </button>
            </div>
        </nav>
    );
};

export default BottomNav;
