import React from 'react';
import { getLunarDate } from '../utils/dateUtils';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';

const WEEKDAYS = ["日", "一", "二", "三", "四", "五", "六"];

const CalendarMonthGrid = ({ currentDate, selectDate, onHeaderClick }) => {
    // Basic Calendar Logic
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    // Days padding
    const startDay = firstDayOfMonth.getDay(); // 0 (Sun) - 6 (Sat)
    const totalDays = lastDayOfMonth.getDate();

    // Generate Grid - fixed 6 rows (42 slots)
    const days = [];
    const calendarSlots = 42;

    // Padding empty slots
    for (let i = 0; i < startDay; i++) {
        days.push(null);
    }
    // Actual days
    for (let i = 1; i <= totalDays; i++) {
        days.push(new Date(year, month, i));
    }
    // Remaining empty slots
    while (days.length < calendarSlots) {
        days.push(null);
    }

    // Handlers
    const handlePrevMonth = (e) => {
        e.stopPropagation();
        selectDate(new Date(year, month - 1, 1));
    };

    const handleNextMonth = (e) => {
        e.stopPropagation();
        selectDate(new Date(year, month + 1, 1));
    };

    return (
        <div className="bg-white shadow-sm border-b border-stone-200 pb-2">
            {/* Header: Month Navigator & Picker Trigger */}
            <div className="flex items-center justify-between px-4 py-1.5 bg-paper border-b border-stone-50">
                <button onClick={handlePrevMonth} className="p-1.5 rounded-full hover:bg-stone-100 text-stone-400 active:scale-95">
                    <ChevronLeft size={20} />
                </button>

                {/* Trigger Button */}
                <button
                    onClick={onHeaderClick}
                    className="text-lg font-bold text-ink font-sans tracking-widest flex items-center gap-1 active:opacity-60 transition-opacity"
                >
                    <span>{year}年 {month + 1}月</span>
                    <ChevronDown size={14} className="text-stone-400" />
                </button>

                <button onClick={handleNextMonth} className="p-1.5 rounded-full hover:bg-stone-100 text-stone-400 active:scale-95">
                    <ChevronRight size={20} />
                </button>
            </div>

            {/* Week Headers */}
            <div className="px-4">
                <div className="grid grid-cols-7 text-center mb-0.5 border-b border-stone-50">
                    {WEEKDAYS.map((d, i) => (
                        <div key={i} className={`text-[10px] font-bold py-1 ${i === 0 || i === 6 ? 'text-red-500' : 'text-stone-300'}`}>
                            {d}
                        </div>
                    ))}
                </div>

                {/* Days Grid - Extremely Compact */}
                <div className="grid grid-cols-7 gap-px bg-stone-50/50">
                    {/* Using gap-px creates logical separation without large gaps */}
                    {days.map((dateObj, i) => {
                        if (!dateObj) return <div key={i} className="h-10"></div>;

                        const isSelected = dateObj.getDate() === currentDate.getDate()
                            && dateObj.getMonth() === currentDate.getMonth()
                            && dateObj.getFullYear() === currentDate.getFullYear();

                        const isToday = new Date().toDateString() === dateObj.toDateString();

                        const lunarInfo = getLunarDate(dateObj);
                        // Fix object rendering crash: check term.current.name
                        // Fix "Whole month term" issue: use term.daily (only exists if today is term)
                        const termName = lunarInfo.term.daily;
                        const lunarText = termName || lunarInfo.lunar.dayString;
                        const isTerm = !!termName;

                        return (
                            <div
                                key={i}
                                onClick={() => selectDate(dateObj)}
                                style={{ backgroundColor: isSelected ? '#15803d' : (isToday && !isSelected ? '#f0fdf4' : '') }}
                                className={`
                                    h-10 flex flex-col items-center justify-center rounded-md cursor-pointer transition-all relative
                                    ${isSelected ? 'text-white shadow-sm' : 'hover:bg-stone-100 text-ink'}
                                    ${isToday && !isSelected ? '' : 'bg-white'}
                                `}
                            >
                                <span className={`text-xl font-bold leading-none mb-0.5 ${isSelected ? 'text-white' : 'text-stone-800'}`}>
                                    {dateObj.getDate()}
                                </span>
                                <span className={`text-[9px] scale-90 ${isSelected ? 'text-white/90' : (isTerm ? 'text-green-700 font-bold' : 'text-stone-600 font-bold')
                                    }`}>
                                    {lunarText}
                                </span>

                                {/* Dot for today if not selected */}
                                {isToday && !isSelected && (
                                    <div className="absolute top-0.5 right-0.5 w-1 h-1 bg-red-500 rounded-full"></div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default CalendarMonthGrid;
