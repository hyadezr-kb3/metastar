import React from 'react';
import { Compass } from 'lucide-react';
import GridCell from './GridCell';
import DetailView from './DetailView';

const YEAR_OPTIONS = [
    { year: 2026, label: '2026年 丙午年' },
    { year: 2027, label: '2027年 丁未年' },
    { year: 2028, label: '2028年 戊申年' },
    { year: 2029, label: '2029年 己酉年' },
    { year: 2030, label: '2030年 庚戌年' }
];

const FlyingStarGrid = ({ year, setYear, grid, afflictions, selectedCell, setSelectedCell, roomAssignments, handleRoomChange }) => {
    return (
        <section className="animation-fade-in">
            <div className="flex justify-between items-center mb-4 px-1">
                <div className="flex gap-2 items-center">
                    <Compass className="text-amber-500" size={24} />
                    <div className="flex flex-col">
                        <h2 className="text-xl font-bold text-ink tracking-wide">流年九宮飛星局</h2>
                        <span className="text-[10px] text-stone-400 font-normal">上南下北</span>
                    </div>
                </div>

                <div className="relative inline-block w-40">
                    <select
                        value={year}
                        onChange={(e) => setYear(Number(e.target.value))}
                        className="w-full appearance-none bg-paper border border-stone-700 text-ink font-bold py-2 pl-3 pr-8 rounded-lg shadow-sm focus:outline-none focus:border-amber-600 text-sm tracking-wide cursor-pointer"
                    >
                        {YEAR_OPTIONS.map((opt) => (
                            <option key={opt.year} value={opt.year}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-stone-400">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
                {grid.map((c, i) => (
                    <GridCell
                        key={i}
                        cell={c}
                        afflictions={afflictions}
                        selectedCell={selectedCell}
                        setSelectedCell={setSelectedCell}
                        roomAssignments={roomAssignments}
                        handleRoomChange={handleRoomChange}
                    />
                ))}
            </div>
            <DetailView year={year} selectedCell={selectedCell} roomAssignments={roomAssignments} />
        </section>
    );
};

export default FlyingStarGrid;
