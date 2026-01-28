import React from 'react';
import { EARTH_BRANCHES_ARR } from '../data/constants';
import { calculateZodiacRelation } from '../utils/engine';

// Import Zodiac Images
// Import Zodiac Images (Default and Active)
import zi from '../assets/zodiac/zi.PNG';
import zi01 from '../assets/zodiac/zi01.PNG';
import chou from '../assets/zodiac/chou.PNG';
import chou01 from '../assets/zodiac/chou01.PNG';
import yin from '../assets/zodiac/yin.PNG';
import yin01 from '../assets/zodiac/yin01.PNG';
import mao from '../assets/zodiac/mao.PNG';
import mao01 from '../assets/zodiac/mao01.PNG';
import chen from '../assets/zodiac/chen.PNG';
import chen01 from '../assets/zodiac/chen01.PNG';
import si from '../assets/zodiac/si.PNG';
import si01 from '../assets/zodiac/si01.PNG';
import wu from '../assets/zodiac/wu.PNG';
import wu01 from '../assets/zodiac/wu01.PNG';
import wei from '../assets/zodiac/wei.PNG';
import wei01 from '../assets/zodiac/wei01.PNG';
import shen from '../assets/zodiac/shen.PNG';
import shen01 from '../assets/zodiac/shen01.PNG';
import you from '../assets/zodiac/you.PNG';
import you01 from '../assets/zodiac/you01.PNG';
import xu from '../assets/zodiac/xu.PNG';
import xu01 from '../assets/zodiac/xu01.PNG';
import hai from '../assets/zodiac/hai.PNG';
import hai01 from '../assets/zodiac/hai01.PNG';

const ZODIAC_IMAGES = [
    { default: zi, active: zi01 },
    { default: chou, active: chou01 },
    { default: yin, active: yin01 },
    { default: mao, active: mao01 },
    { default: chen, active: chen01 },
    { default: si, active: si01 },
    { default: wu, active: wu01 },
    { default: wei, active: wei01 },
    { default: shen, active: shen01 },
    { default: you, active: you01 },
    { default: xu, active: xu01 },
    { default: hai, active: hai01 }
];

const ZodiacItem = ({ z, idx, yearBranchIdx, isSelected, onClick }) => {
    // Determine Zodiac status for the dot indicator
    const { type } = calculateZodiacRelation(idx, yearBranchIdx);

    // Dot color map - Red for all Tai Sui clashes/conflicts as per user request (Ox need red dot)
    // Refined to show specific text badge
    let badgeText = null;
    if (type === 'fan') badgeText = '值';
    else if (type === 'chong') badgeText = '沖';
    else if (type === 'hai') badgeText = '害';
    else if (type === 'xing') badgeText = '破';

    // Determine Active Image
    const imageSrc = isSelected ? ZODIAC_IMAGES[idx].active : ZODIAC_IMAGES[idx].default;

    return (
        <button
            onClick={onClick}
            className={`
                relative w-16 h-16 rounded-full flex flex-col items-center justify-center transition-all overflow-visible
                ${isSelected
                    ? 'shadow-[0_8px_16px_-4px_rgba(0,0,0,0.25)] scale-110 z-10'
                    : 'hover:scale-105 active:scale-95 shadow-sm'
                }
            `}
        >
            {/* Status Badge */}
            {badgeText && (
                <span className="absolute -top-1 -right-1 z-20 w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center text-[10px] font-bold shadow-sm border-2 border-paper">
                    {badgeText}
                </span>
            )}

            {/* Icon Image - removed border for selected state as requested */}
            <div className={`w-full h-full rounded-full overflow-hidden transition-colors ${isSelected ? '' : 'border-2 border-stone-200'}`}>
                <img
                    src={imageSrc}
                    alt={z.name}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Optional: Text label below if needed, maybe removed for cleaner look or strictly inside icon? User said "button text become icon", implying replacement. */}
            {/* Keeping it clean: Just icon. */}
        </button>
    );
};

export default ZodiacItem;
