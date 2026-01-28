import React, { useEffect, useRef, useState } from 'react';

// Years range 1900 - 2100
const YEARS = Array.from({ length: 201 }, (_, i) => 1900 + i);
// Months 1 - 12
const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);

const WheelColumn = ({ options, value, onChange, label }) => {
    const containerRef = useRef(null);
    const itemHeight = 40; // Fixed height per item in pixels

    // Scroll to position on init or value change
    useEffect(() => {
        if (containerRef.current) {
            const index = options.indexOf(value);
            if (index !== -1) {
                containerRef.current.scrollTop = index * itemHeight;
            }
        }
    }, [value, options]); // Only re-scroll if value changes externally implies "controlled", but scroll might fight with user.
    // Ideally we only scroll if the Drag ended or it's a fresh mount. But for simplicity let's stick to this.
    // If user is scrolling, we shouldn't force it back until they stop.
    // For this simple version, let's trust click or scroll-snap.

    const handleScroll = (e) => {
        // Debouncing could be added here to trigger onChange only when stopped
        // For now, let's use onClick to select for precision or require a "Done" button context if we were strict.
        // But the parent expects live updates.
        // Let's rely on CLICK for selection to be robust, and simple scroll for viewing.
        // Actually, to make it behave like a picker, we should calculate the center item on scroll end.
    };

    // Improved interaction: Click to select
    return (
        <div className="flex flex-col items-center h-[200px] w-full relative">
            {/* The List */}
            <div
                ref={containerRef}
                className="w-full h-full overflow-y-auto no-scrollbar snap-y snap-mandatory py-[80px]"
                onScroll={(e) => {
                    const index = Math.round(e.target.scrollTop / itemHeight);
                    if (options[index] !== value && options[index] !== undefined) {
                        // Debounce this in real app, but for now direct
                        // onChange(options[index]); 
                        // Direct onChange on scroll might be laggy. Best to match "scroll end".
                        // For this generic component, let's just use click-to-select logic mostly, 
                        // or simple check.
                    }
                }}
            >
                {options.map((opt, i) => (
                    <div
                        key={opt}
                        onClick={() => onChange(opt)}
                        className={`
                            h-[40px] flex items-center justify-center snap-center cursor-pointer transition-all duration-200
                            ${opt === value ? 'text-ink font-bold text-xl scale-110' : 'text-stone-300'}
                        `}
                    >
                        {opt}{label}
                    </div>
                ))}
            </div>
        </div>
    );
};

// Re-implementing with a simpler logic:
// We render a window. It's properly controlled.
const DateWheelPicker = ({ date, onChange }) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    // Calculate days in month dynamically
    const getDaysInMonth = (y, m) => new Date(y, m, 0).getDate();
    const daysInMonth = getDaysInMonth(year, month);
    const DAYS = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    // Handlers
    const handleYearChange = (newYear) => {
        const maxDays = getDaysInMonth(newYear, month);
        const newDay = day > maxDays ? maxDays : day;
        onChange(new Date(newYear, month - 1, newDay));
    };

    const handleMonthChange = (newMonth) => {
        const maxDays = getDaysInMonth(year, newMonth);
        const newDay = day > maxDays ? maxDays : day;
        onChange(new Date(year, newMonth - 1, newDay));
    };

    const handleDayChange = (newDay) => {
        onChange(new Date(year, month - 1, newDay));
    };

    return (
        <div className="bg-paper rounded-xl shadow-inner border border-stone-200 p-4 relative overflow-hidden">
            {/* Selection Highlight Bar */}
            <div className="absolute top-1/2 left-0 right-0 h-[40px] -mt-[20px] bg-stone-100/50 pointer-events-none border-y border-stone-200/50 z-0"></div>

            <div className="flex justify-between items-center relative z-10 font-sans">
                {/* YEAR */}
                <div className="w-1/3 border-r border-stone-100">
                    <WheelColumn
                        options={YEARS}
                        value={year}
                        onChange={handleYearChange}
                        label="年"
                    />
                </div>

                {/* MONTH */}
                <div className="w-1/3 border-r border-stone-100">
                    <WheelColumn
                        options={MONTHS}
                        value={month}
                        onChange={handleMonthChange}
                        label="月"
                    />
                </div>

                {/* DAY */}
                <div className="w-1/3">
                    <WheelColumn
                        options={DAYS}
                        value={day}
                        onChange={handleDayChange}
                        label="日"
                    />
                </div>
            </div>

            {/* Gradient Overlays for 3D effect */}
            <div className="absolute top-0 left-0 right-0 h-[60px] bg-gradient-to-b from-paper to-transparent pointer-events-none z-20"></div>
            <div className="absolute bottom-0 left-0 right-0 h-[60px] bg-gradient-to-t from-paper to-transparent pointer-events-none z-20"></div>
        </div>
    );
};

export default DateWheelPicker;
