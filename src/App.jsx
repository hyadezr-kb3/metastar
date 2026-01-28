import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import FlyingStarGrid from './components/FlyingStarGrid';
import ZodiacList from './components/ZodiacList';
import CalendarDetailView from './components/CalendarDetailView'; // NEW
import { getCenterStar, calculateGrid, getAfflictions } from './utils/calendar';
import { STARS_INFO, PALACES } from './data/stars';

export default function FengShuiAppPro() {
  // State management
  const [year, setYear] = useState(2026);
  const [activeTab, setActiveTab] = useState('flying_star'); // default to flying star
  const [calendarDate, setCalendarDate] = useState(new Date()); // NEW: Calendar State

  const [grid, setGrid] = useState([]);
  const [afflictions, setAfflictions] = useState({});
  const [selectedCell, setSelectedCell] = useState(null);
  const [expandedZodiac, setExpandedZodiac] = useState(null);
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(null);
  // Initialize from localStorage if available
  const [roomAssignments, setRoomAssignments] = useState(() => {
    try {
      const saved = localStorage.getItem('metaphysics_room_assignments');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      console.warn("Failed to load room assignments", e);
      return {};
    }
  });

  // Persist room assignments
  useEffect(() => {
    localStorage.setItem('metaphysics_room_assignments', JSON.stringify(roomAssignments));
  }, [roomAssignments]);

  useEffect(() => {
    const center = getCenterStar(year);
    setGrid(calculateGrid(center));
    setAfflictions(getAfflictions(year));
    setSelectedCell(prev => {
      if (!prev) return null;
      const newG = calculateGrid(center);
      const updatedCell = newG.find(cell => cell.k === prev.k);
      return updatedCell ? { ...updatedCell, p: PALACES.find(p => p.key === updatedCell.k), s: STARS_INFO[updatedCell.s] } : null;
    });
  }, [year]);

  const handleRoomChange = (locationKey, room) => {
    setRoomAssignments(prev => ({ ...prev, [locationKey]: room }));
  };

  // Year options for Flying Star
  const yearOptions = [2026, 2027, 2028, 2029, 2030];

  return (
    <div className="min-h-screen bg-paper text-ink font-sans max-w-lg mx-auto shadow-2xl flex flex-col antialiased">
      <Header />

      {/* Added pt-20 for header, pb-24 for bottom nav */}
      <main className="flex-1 w-full pt-14 pb-24">
        {activeTab === 'flying_star' && (
          <div className="p-4 animation-fade-in flex flex-col gap-4">
            <FlyingStarGrid
              year={year}
              setYear={setYear}
              grid={grid}
              afflictions={afflictions}
              selectedCell={selectedCell}
              setSelectedCell={setSelectedCell}
              roomAssignments={roomAssignments}
              handleRoomChange={handleRoomChange}
            />
          </div>
        )}

        {/* CALENDAR TAB */}
        {activeTab === 'calendar' && (
          <CalendarDetailView
            date={calendarDate}
            setDate={setCalendarDate}
          />
        )}

        {/* Fortune Mode: Fixed to 2026 as requested */}
        {activeTab === 'fortune' && (
          <ZodiacList
            year={2026}
            expandedZodiac={expandedZodiac}
            setExpandedZodiac={setExpandedZodiac}
            selectedMonthIndex={selectedMonthIndex}
            setSelectedMonthIndex={setSelectedMonthIndex}
          />
        )}
      </main>

      <BottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </div>
  );
}
