import React, { useState, useEffect } from 'react';
import { getLunarDate, get12HourLuck } from '../utils/dateUtils';
import DateWheelPicker from './DateWheelPicker';
import CalendarMonthGrid from './CalendarMonthGrid';
import { Calendar as CalIcon, ChevronDown, CheckCircle2, XCircle, Clock, Info } from 'lucide-react';

// Icons
import wealthIcon from '../assets/calendar/wealth.PNG';
import happyIcon from '../assets/calendar/happy.PNG';
import greatIcon from '../assets/calendar/great.PNG'; // Mapped to Fortune (福)
import goodIcon from '../assets/calendar/good.PNG';
import badIcon from '../assets/calendar/bad.PNG';
import todoIcon from '../assets/calendar/todo.PNG';
import notDoIcon from '../assets/calendar/notdo.PNG';

const CalendarDetailView = ({ date, setDate }) => {
    const [isPickerOpen, setIsPickerOpen] = useState(false);
    const [lunarData, setLunarData] = useState(null);
    const [hourlyLuck, setHourlyLuck] = useState([]);

    useEffect(() => {
        const ld = getLunarDate(date);
        const hl = get12HourLuck(date);
        setLunarData(ld);
        setHourlyLuck(hl);
    }, [date]);

    if (!lunarData) return <div className="p-10 text-center">Loading...</div>;

    const { solar, lunar, term, gods, info, yi, ji, officer } = lunarData;

    return (
        <div className="pb-24 bg-stone-50 min-h-screen">
            {/* 1. Header & Month Grid */}
            <div className="bg-white sticky top-14 z-40">

                {/* Month Grid with Header Click for Picker */}
                <CalendarMonthGrid
                    currentDate={date}
                    selectDate={setDate}
                    onHeaderClick={() => setIsPickerOpen(true)}
                />
            </div>

            {/* Popup Modal for Picker */}
            {isPickerOpen && (
                <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm animation-fade-in" onClick={() => setIsPickerOpen(false)}>
                    <div className="bg-white w-full max-w-lg rounded-t-2xl sm:rounded-2xl p-4 animate-slide-up sm:animate-zoom-in" onClick={e => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-4 border-b border-stone-100 pb-2">
                            <span className="text-lg font-bold text-ink">選擇日期</span>
                            <button onClick={() => setIsPickerOpen(false)} className="text-clay font-bold">完成</button>
                        </div>
                        <DateWheelPicker date={date} onChange={setDate} />
                    </div>
                </div>
            )}

            {/* 2. Main Detail Card */}
            <div className="px-3 py-2 space-y-2 max-w-lg mx-auto">

                {/* Big Info Card */}
                <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden relative">
                    <div className="p-3 relative z-10 text-center">
                        {/* Huge Date - Reduced size by ~30% per request (7xl->5xl, 3xl->2xl) */}
                        <div className="flex items-baseline justify-center gap-2 mb-0 leading-none">
                            <span className="text-5xl font-bold text-clay font-serif">{solar.day}</span>
                            <span className="text-2xl font-bold text-stone-600">{lunar.monthString}{lunar.dayString}</span>
                        </div>

                        {/* Consolidated Date Line: 2026 • 乙巳(蛇)年 己丑月 壬寅日 • 三 */}
                        <div className="text-sm text-stone-500 font-serif tracking-widest mb-2 leading-tight mt-1 font-bold">
                            {solar.year} • {lunar.yearString} {lunar.monthGanZhi}月 {lunar.dayGanZhi}日 • {solar.weekDayChinese}
                        </div>

                        {/* Term & Info Grid (Terms) - Darker Time Text */}
                        <div className="grid grid-cols-2 gap-0 divide-x divide-stone-200 text-base bg-stone-50 rounded-lg p-2 border border-stone-100 mb-2">
                            <div className="flex flex-col items-center">
                                <span className="text-[10px] text-stone-500 leading-none mb-0.5">上個節氣</span>
                                <div className="leading-none">
                                    <span className="font-bold text-stone-700 block text-lg">{term.current.name || "無"}</span>
                                    {/* Darker time: text-stone-600 */}
                                    <span className="text-[10px] text-stone-600 font-bold font-mono block transform scale-90">{term.current.time}</span>
                                </div>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="text-[10px] text-stone-500 leading-none mb-0.5">下個節氣</span>
                                <div className="leading-none">
                                    <span className="font-bold text-clay mr-1 block text-lg">{term.next.name}</span>
                                    {/* Darker time: text-stone-600 */}
                                    <span className="text-[10px] text-stone-600 font-bold font-mono block transform scale-90">{term.next.time}</span>
                                </div>
                            </div>
                        </div>

                        {/* Compact Gods & Info Grid - 1pt spacing for Chong Sha */}
                        <div className="grid grid-cols-6 gap-0 divide-x divide-stone-100 border-t border-b border-stone-100 py-1.5 text-center">
                            {/* Wealth */}
                            <div className="flex flex-col items-center justify-center">
                                <img src={wealthIcon} alt="財神" className="w-4 h-4 object-contain mb-1" />
                                <span className="text-sm font-bold text-stone-800 leading-none">{gods.wealth}</span>
                            </div>
                            {/* Happy */}
                            <div className="flex flex-col items-center justify-center">
                                <img src={happyIcon} alt="喜神" className="w-4 h-4 object-contain mb-1" />
                                <span className="text-sm font-bold text-stone-800 leading-none">{gods.happy}</span>
                            </div>
                            {/* Fortune */}
                            <div className="flex flex-col items-center justify-center">
                                <img src={greatIcon} alt="福神" className="w-4 h-4 object-contain mb-1" />
                                <span className="text-sm font-bold text-stone-800 leading-none">{gods.fortune}</span>
                            </div>

                            {/* Value God */}
                            <div className="flex flex-col items-center justify-center">
                                <span className="text-[9px] text-stone-400 leading-none mb-0.5">值神</span>
                                <div className="flex flex-col items-center leading-none">
                                    <span className={`text-sm font-bold leading-none ${info.valueGodType === '黃道' ? 'text-red-500' : 'text-stone-600'}`}>
                                        {info.valueGod}
                                    </span>
                                    <span className={`text-[9px] scale-90 mt-0.5 ${info.valueGodType === '黃道' ? 'text-red-400' : 'text-stone-500'}`}>
                                        {info.valueGodType}日
                                    </span>
                                </div>
                            </div>
                            {/* Officer */}
                            <div className="flex flex-col items-center justify-center">
                                <span className="text-[9px] text-stone-400 leading-none mb-0.5">建除</span>
                                <span className="text-sm font-bold text-stone-800 leading-none">{officer.name}日</span>
                            </div>
                            {/* Chong Sha - 3 lines with spacing */}
                            <div className="flex flex-col items-center justify-center px-1">
                                <span className="text-[9px] text-stone-400 leading-none mb-0.5">沖煞</span>
                                <div className="flex flex-col items-center leading-none">
                                    <span className="text-sm font-bold text-stone-800 leading-none whitespace-nowrap">{info.zodiacChong}</span>
                                    <span className="text-[9px] text-stone-500 whitespace-nowrap scale-90 mt-0.5">煞{info.zodiacSha}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Yi / Ji Rows - Gap reduced by 50% (gap-x-1) */}
                    <div className="border-t border-stone-100 divide-y divide-stone-100">
                        {/* YI */}
                        <div className="flex items-start px-3 py-1.5 bg-green-50/30">
                            <img src={todoIcon} alt="宜" className="w-6 h-6 object-contain mr-2 shrink-0" />
                            <div className="flex flex-wrap gap-x-1 gap-y-0 text-sm text-stone-800 leading-tight mt-0.5">
                                {yi.length > 0 ? yi.map((y, i) => (
                                    <span key={i} className="font-bold">{y.original}</span>
                                )) : <span className="font-bold text-stone-400">諸事不宜</span>}
                            </div>
                        </div>
                        {/* JI */}
                        <div className="flex items-start px-3 py-1.5 bg-red-50/30">
                            <img src={notDoIcon} alt="忌" className="w-6 h-6 object-contain mr-2 shrink-0" />
                            <div className="flex flex-wrap gap-x-1 gap-y-0 text-sm text-stone-800 leading-tight mt-0.5">
                                {ji.length > 0 ? ji.map((j, i) => (
                                    <span key={i} className="font-bold">{j.original}</span>
                                )) : <span className="font-bold text-stone-400">無</span>}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 12-Hour Luck Table - Enlarged */}
                <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden mt-4">
                    <div className="bg-stone-50 border-b border-stone-200 p-2 flex items-center gap-2">
                        <div className="w-1.5 h-4 bg-clay rounded-full"></div>
                        <span className="text-base font-bold text-stone-700">時辰吉凶</span>
                    </div>
                    <div className="divide-y divide-stone-100">
                        {hourlyLuck.map((h, i) => (
                            <div key={i} className="flex items-stretch text-base min-h-[44px]">
                                {/* Time Header */}
                                <div className="w-16 bg-stone-50 flex flex-col items-center justify-center text-stone-500 border-r border-stone-100 shrink-0">
                                    <span className="font-bold text-stone-800 text-base leading-none">{h.zhi}時</span>
                                    <span className="text-[10px] leading-none mt-0.5">{h.range.split('-')[0]}</span>
                                </div>

                                {/* Luck Indicator */}
                                <div className="w-10 flex items-center justify-center border-r border-stone-100 shrink-0">
                                    {h.type === '吉' ? (
                                        <img src={goodIcon} alt="吉" className="w-6 h-6 object-contain" />
                                    ) : (
                                        <img src={badIcon} alt="凶" className="w-6 h-6 object-contain" />
                                    )}
                                </div>

                                {/* God & Yi/Ji */}
                                <div className="flex-1 px-3 py-1 flex flex-col justify-center min-w-0 border-r border-stone-100">
                                    {/* Header Line: GanZhi + TianShen + ChongSha */}
                                    <div className="flex items-center gap-2 mb-0.5">
                                        <span className="text-xs text-stone-500 font-mono leading-none">{h.ganZhi}</span>
                                        <span className={`text-[10px] px-1.5 py-0 rounded-full leading-relaxed ${h.type === '吉' ? 'bg-red-100 text-red-600' : 'bg-stone-100 text-stone-500'}`}>
                                            {h.tianShen}
                                        </span>
                                        <span className="text-[10px] text-red-500 shrink-0 ml-1">
                                            沖{h.chong.includes('(') ? h.chong : `(${h.chong})`}・煞{h.sha}
                                        </span>
                                    </div>
                                    {/* Hourly Yi/Ji Display - Replacing text with small images */}
                                    <div className="flex items-start text-[10px] text-stone-600 leading-none mb-0.5">
                                        <img src={todoIcon} alt="宜" className="w-3 h-3 object-contain mr-1" />
                                        <div className="truncate">
                                            {h.yi && h.yi.length > 0
                                                ? h.yi.map(y => y).slice(0, 8).join(' ')
                                                : <span className="text-stone-400">諸事不宜</span>
                                            }
                                        </div>
                                    </div>
                                    <div className="flex items-start text-[10px] text-stone-600 leading-none">
                                        <img src={notDoIcon} alt="忌" className="w-3 h-3 object-contain mr-1" />
                                        <div className="truncate">
                                            {h.ji && h.ji.length > 0
                                                ? h.ji.map(j => j).slice(0, 8).join(' ')
                                                : <span className="text-stone-400">無</span>
                                            }
                                        </div>
                                    </div>
                                </div>

                                {/* Right Side: Gods ONLY */}
                                <div className="w-16 shrink-0 flex flex-col justify-center text-[10px] px-1 text-stone-500 bg-stone-50/30">
                                    <div className="flex flex-col space-y-[2px] leading-none">
                                        <div className="flex justify-between">
                                            <span>財: {h.gods?.wealth}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>喜: {h.gods?.happy}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>福: {h.gods?.fortune}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CalendarDetailView;
