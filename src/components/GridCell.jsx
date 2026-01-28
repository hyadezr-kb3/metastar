import React from 'react';
import { PALACES } from '../data/stars';
import { STARS_INFO } from '../data/stars';
import { ROOM_OPTIONS } from '../data/constants';

// Import Images
import onewhite from '../assets/star/onewhite.PNG';
import twoblack from '../assets/star/twoblack.PNG';
import threegreen from '../assets/star/threegreen.PNG';
import fourgreen from '../assets/star/fourgreen.PNG';
import fiveyellow from '../assets/star/fiveyellow.PNG';
import sixwhite from '../assets/star/sixwhite.PNG';
import sevengold from '../assets/star/sevengold.PNG';
import eightwhite from '../assets/star/eightwhite.PNG';
import ninepurple from '../assets/star/ninepurple.PNG';

import shuipor from '../assets/star/shuipor.PNG';
import threekill from '../assets/star/threekill.PNG';
import yeargod from '../assets/star/yeargod.PNG';

const STAR_IMAGES = {
    1: onewhite,
    2: twoblack,
    3: threegreen,
    4: fourgreen,
    5: fiveyellow,
    6: sixwhite,
    7: sevengold,
    8: eightwhite,
    9: ninepurple
};

const GridCell = ({ cell, afflictions, selectedCell, setSelectedCell, roomAssignments, handleRoomChange }) => {
    const palace = PALACES.find(p => p.key === cell.k);
    const star = STARS_INFO[cell.s];

    // Color Maps (still used for fallbacks or palace bg)
    const palaceBgMap = { '金': 'bg-gray-100', '木': 'bg-green-50', '水': 'bg-blue-50', '火': 'bg-red-50', '土': 'bg-amber-50' };
    const starColorMap = { '金': 'text-yellow-600', '木': 'text-green-700', '水': 'text-blue-700', '火': 'text-red-600', '土': 'text-amber-800' };

    const currentRoom = roomAssignments[cell.k] || '(未選擇)';

    // Prepare Affliction Images
    const activeAfflictions = [];
    if (afflictions.taiSui === cell.k) activeAfflictions.push({ key: 'taisui', src: yeargod, name: '太歲' });
    if (afflictions.suiPo === cell.k) activeAfflictions.push({ key: 'suipo', src: shuipor, name: '歲破' });
    if (afflictions.sanSha === cell.k) activeAfflictions.push({ key: 'sansha', src: threekill, name: '三煞' });

    return (
        <div onClick={() => setSelectedCell({ ...cell, p: palace, s: star })} className={`relative flex flex-col items-center p-1 rounded-xl border-2 cursor-pointer transition-all active:scale-95 shadow-sm ${selectedCell?.k === cell.k ? 'border-amber-600 ring-2 ring-amber-100 z-10' : 'border-stone-100 hover:border-amber-200'} h-32 w-full overflow-hidden ${palaceBgMap[palace.element] || 'bg-white'} bg-opacity-60`}>
            {/* Top Left: Palace Info */}
            <div className="absolute top-1 left-2 text-[10px] font-bold text-stone-400 opacity-80">{palace.name}・{palace.trigram}({palace.element})</div>

            {/* Center: Star Image or Text Fallback */}
            <div className={`absolute top-8 flex justify-center items-center w-full h-12 pointer-events-none`}>
                {STAR_IMAGES[cell.s] ? (
                    <img src={STAR_IMAGES[cell.s]} alt={star.name} className="h-[85%] w-auto object-contain drop-shadow-sm" />
                ) : (
                    <div className={`text-2xl font-black tracking-wide ${starColorMap[star.element]}`}>{star.name}</div>
                )}
            </div>

            {/* Center-Bottom: Affliction Images - Absolute Positioned */}
            <div className="absolute top-[4.6rem] flex gap-1 justify-center w-full px-1">
                {activeAfflictions.map((aff, i) => (
                    <img key={i} src={aff.src} alt={aff.name} className="h-[17px] w-auto object-contain" />
                ))}
            </div>

            {/* Bottom: Room Selector */}
            <div className="absolute bottom-1 w-full px-2" onClick={(e) => e.stopPropagation()}><select value={currentRoom} onChange={(e) => handleRoomChange(cell.k, e.target.value)} className="w-full text-[10px] bg-white/60 border border-stone-200 rounded p-1 text-stone-600 focus:outline-none focus:border-amber-500 text-center text-ellipsis">{ROOM_OPTIONS.map(r => <option key={r} value={r}>{r}</option>)}</select></div>
        </div>
    );
};

export default GridCell;
