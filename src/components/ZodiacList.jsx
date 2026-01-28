import React, { useRef, useEffect } from 'react';
import { ZODIAC_DETAILS, EARTH_BRANCHES_ARR, HEAVENLY_STEMS_ARR, MONTH_NAMES } from '../data/constants';
import { analyzeDestiny, getMonthlyStem, calculateZodiacRelation } from '../utils/engine';
import ZodiacItem from './ZodiacItem';
import { getMonthlyReportOverride } from '../utils/report';
import { FORTUNES_2026 } from '../data/fortunes/2026';
import { Star, TrendingUp, Heart, Coins, Briefcase, Zap, ShieldAlert, HeartPulse, Info, Calendar } from 'lucide-react';
import { ANNUAL_STARS_MAP } from '../data/stars';
import { getYearlyDetailedReport } from '../utils/report';

// Import Fortune Aspect Images
import careerImg from '../assets/fortune/career.PNG';
import moneyImg from '../assets/fortune/money.PNG';
import relationshipImg from '../assets/fortune/relationship.PNG';
import healthImg from '../assets/fortune/health.PNG';

// Import Month Number Images
import m1 from '../assets/month/1st.PNG';
import m2 from '../assets/month/2nd.PNG';
import m3 from '../assets/month/3rd.PNG';
import m4 from '../assets/month/4th.PNG';
import m5 from '../assets/month/5th.PNG';
import m6 from '../assets/month/6th.PNG';
import m7 from '../assets/month/7th.PNG';
import m8 from '../assets/month/8th.PNG';
import m9 from '../assets/month/9th.PNG';
import m10 from '../assets/month/10th.PNG';
import m11 from '../assets/month/11th.PNG';
import m12 from '../assets/month/12th.PNG';

// Import Lunar Month (Stem-Branch) Images
import l1 from '../assets/month/lunar1st.PNG';
import l2 from '../assets/month/lunar2nd.PNG';
import l3 from '../assets/month/lunar3rd.PNG';
import l4 from '../assets/month/lunar4th.PNG';
import l5 from '../assets/month/lunar5th.PNG';
import l6 from '../assets/month/lunar6th.PNG';
import l7 from '../assets/month/lunar7th.PNG';
import l8 from '../assets/month/lunar8th.PNG';
import l9 from '../assets/month/lunar9th.PNG';
import l10 from '../assets/month/lunar10th.PNG';
import l11 from '../assets/month/lunar11th.PNG';
import l12 from '../assets/month/lunar12th.PNG';

// Import Zodiac Images
import zi from '../assets/zodiac/zi.PNG';
import chou from '../assets/zodiac/chou.PNG';
import yin from '../assets/zodiac/yin.PNG';
import mao from '../assets/zodiac/mao.PNG';
import chen from '../assets/zodiac/chen.PNG';
import si from '../assets/zodiac/si.PNG';
import wu from '../assets/zodiac/wu.PNG';
import wei from '../assets/zodiac/wei.PNG';
import shen from '../assets/zodiac/shen.PNG';
import you from '../assets/zodiac/you.PNG';
import xu from '../assets/zodiac/xu.PNG';
import hai from '../assets/zodiac/hai.PNG';

const MONTH_NUM_IMGS = { 1: m1, 2: m2, 3: m3, 4: m4, 5: m5, 6: m6, 7: m7, 8: m8, 9: m9, 10: m10, 11: m11, 12: m12 };
const MONTH_LUNAR_IMGS = { 1: l1, 2: l2, 3: l3, 4: l4, 5: l5, 6: l6, 7: l7, 8: l8, 9: l9, 10: l10, 11: l11, 12: l12 };
const ZODIAC_IMGS = [zi, chou, yin, mao, chen, si, wu, wei, shen, you, xu, hai];
const ZODIAC_ELEMENTS = ['水', '土', '木', '木', '土', '火', '火', '土', '金', '金', '土', '水'];

const ZodiacList = ({ year, expandedZodiac, setExpandedZodiac, selectedMonthIndex, setSelectedMonthIndex }) => {
    const scrollContainerRef = useRef(null);

    // Initial scroll setup
    useEffect(() => {
        if (expandedZodiac !== null && scrollContainerRef.current) {
            const index = expandedZodiac;
            const itemWidth = 80; // Estimated width
            const containerWidth = scrollContainerRef.current.clientWidth;
            const scrollPos = (index * itemWidth) - (containerWidth / 2) + (itemWidth / 2);
            scrollContainerRef.current.scrollTo({ left: scrollPos, behavior: 'smooth' });
        }
    }, [expandedZodiac]);

    const handleZodiacClick = (index) => {
        setExpandedZodiac(index);
        setSelectedMonthIndex(null);
    };

    // Current Selection
    const currentZodiacIdx = expandedZodiac !== null ? expandedZodiac : 0;
    const currentZodiac = ZODIAC_DETAILS[currentZodiacIdx];

    // Check for Manual Data (Rich Layout)
    const manualData = (year === 2026 && FORTUNES_2026[currentZodiacIdx]) ? FORTUNES_2026[currentZodiacIdx] : null;

    // Fallback Data Props
    const yearStemIdx = (year - 4) % 10;
    const yearBranchIdx = (year - 1924) % 12;

    const [expandedAspect, setExpandedAspect] = React.useState(null);
    const [expandedMonth, setExpandedMonth] = React.useState(null);

    // Calculate Years (1900 - 2026)
    const getZodiacYears = (idx) => {
        let years = [];
        let startYear = 1900 + idx; // 1900 is Rat (idx 0)
        while (startYear <= 2026) {
            years.push(startYear);
            startYear += 12;
        }
        return years.join(', ');
    };

    return (
        <section className="bg-paper min-h-screen pb-16">

            {/* Sticky Header Group: Title + Navigator + Zodiac Info */}
            <div className="sticky top-14 z-30 bg-paper border-b border-stone-800 shadow-sm">

                {/* 1. Main Title */}
                <div className="pt-4 pb-2 px-4 animation-fade-in">
                    <h1 className="text-xl font-bold text-center text-ink">2026年丙午年(馬年) 十二生肖運程</h1>
                </div>

                {/* 2. Sticky Horizontal Scroll Navigator */}
                <div className="py-2 pb-1">
                    <div
                        ref={scrollContainerRef}
                        className="flex overflow-x-auto px-4 gap-4 no-scrollbar snap-x snap-mandatory py-2"
                        style={{ scrollBehavior: 'smooth' }}
                    >
                        {ZODIAC_DETAILS.map((sign, index) => (
                            <div key={sign.branch} className="snap-center shrink-0">
                                <ZodiacItem
                                    z={sign}
                                    idx={index}
                                    yearBranchIdx={yearBranchIdx}
                                    isSelected={expandedZodiac === index}
                                    onClick={() => handleZodiacClick(index)}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* 3. Zodiac Detail Header (Fixed Top Section when Manual Data exists) */}
                {manualData && (
                    <div className="px-6 py-4 animation-fade-in bg-paper">
                        <div className="flex justify-between items-start">
                            <div className="flex gap-4 items-start w-full">
                                {/* Zodiac Image - Circular White Background */}
                                <div className="flex-shrink-0 w-20 h-20 rounded-full shadow-sm border border-stone-100 overflow-hidden">
                                    <img src={ZODIAC_IMGS[currentZodiacIdx]} alt={currentZodiac.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex flex-col flex-1 min-w-0 pt-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-xs font-bold text-stone-900 bg-stone-300 px-2 py-1 rounded">地支：{ZODIAC_ELEMENTS[currentZodiacIdx]}</span>
                                        <div className="flex items-center gap-1 text-amber-500">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={14} fill={i < manualData.rating ? "currentColor" : "none"} className={i < manualData.rating ? "" : "text-stone-700"} />
                                            ))}
                                        </div>
                                    </div>

                                    <p className="text-[10px] text-stone-400 leading-relaxed break-words font-mono tracking-tighter mt-1">
                                        {getZodiacYears(currentZodiacIdx)}
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 items-end shrink-0 pl-2">
                                {/* Keywords */}
                                {manualData.keywords.map((kwObj, i) => {
                                    const text = typeof kwObj === 'string' ? kwObj : kwObj.text;
                                    const type = typeof kwObj === 'string' ? 2 : kwObj.type;
                                    let styleClass = 'bg-stone-800 text-stone-400 border border-stone-700';
                                    if (type === 2) styleClass = 'bg-red-900/30 text-red-300 border border-red-800/50';
                                    else if (type === 3) styleClass = 'bg-blue-900/30 text-blue-300 border border-blue-800/50';

                                    return (
                                        <span key={i} className={`text-[10px] font-bold px-2 py-1 rounded-full whitespace-nowrap ${styleClass}`}>
                                            {text}
                                        </span>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Scrollable Content Area */}
            <div className="max-w-4xl mx-auto px-4 pt-4 animation-fade-in pb-20">
                {manualData ? (
                    <div className="space-y-6">
                        {/* Overview Text (Now in a White Card of its own) */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100">
                            <h3 className="font-bold text-stone-800 mb-2">總體運勢</h3>
                            <div className="prose prose-stone text-sm text-stone-600 leading-relaxed text-justify">
                                {manualData.overview}
                            </div>
                        </div>

                        {/* Four Aspects Grid (Collapsible) */}
                        <div className="flex flex-col gap-3">
                            <AspectCard
                                icon={<Briefcase size={18} className="text-blue-500" />}
                                titleImg={careerImg}
                                content={manualData.aspects.career}
                                borderColor="border-blue-500"
                                isOpen={expandedAspect === 'career'}
                                onToggle={() => setExpandedAspect(expandedAspect === 'career' ? null : 'career')}
                            />
                            <AspectCard
                                icon={<Coins size={18} className="text-amber-500" />}
                                titleImg={moneyImg}
                                content={manualData.aspects.wealth}
                                borderColor="border-amber-500"
                                isOpen={expandedAspect === 'wealth'}
                                onToggle={() => setExpandedAspect(expandedAspect === 'wealth' ? null : 'wealth')}
                            />
                            <AspectCard
                                icon={<Heart size={18} className="text-pink-500" />}
                                titleImg={relationshipImg}
                                content={manualData.aspects.love}
                                borderColor="border-pink-500"
                                isOpen={expandedAspect === 'love'}
                                onToggle={() => setExpandedAspect(expandedAspect === 'love' ? null : 'love')}
                            />
                            <AspectCard
                                icon={<ShieldAlert size={18} className="text-green-500" />}
                                titleImg={healthImg}
                                content={manualData.aspects.health}
                                borderColor="border-green-500"
                                isOpen={expandedAspect === 'health'}
                                onToggle={() => setExpandedAspect(expandedAspect === 'health' ? null : 'health')}
                            />
                        </div>

                        {/* Lucky Info Bar */}
                        <div className="bg-fuchsia-100 text-stone-800 rounded-xl p-5 border border-fuchsia-200 flex flex-col gap-3 text-sm shadow-sm transition-colors">
                            <div className="flex gap-2 items-center">
                                <span className="font-bold text-red-900 shrink-0">幸運顏色：</span>
                                <span className="font-medium text-red-900">{manualData.lucky.colors}</span>
                            </div>
                            <div className="flex gap-2 items-center">
                                <span className="font-bold text-red-900 shrink-0">幸運數字：</span>
                                <span className="font-medium text-red-900">{manualData.lucky.numbers}</span>
                            </div>
                            <div className="flex gap-2 items-start">
                                <span className="font-bold text-red-900 shrink-0">增運錦囊：</span>
                                <span className="font-medium text-red-900 leading-relaxed">{manualData.lucky.tips}</span>
                            </div>
                        </div>

                        {/* Monthly Timeline */}
                        <div className="space-y-4">
                            <h3 className="font-bold text-ink text-lg ml-1">十二流月運程 (點擊展開)</h3>
                            <div className="flex flex-col gap-3">
                                {manualData.months.map((m, idx) => (
                                    <MonthCard
                                        key={m.month}
                                        m={m}
                                        isOpen={expandedMonth === idx}
                                        onToggle={() => setExpandedMonth(expandedMonth === idx ? null : idx)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    /* 2. FALLBACK ALGORITHMIC CONTENT (For items without static data) */
                    <ZodiacDetailFallback
                        currentZodiacIdx={currentZodiacIdx}
                        year={year}
                        yearStemIdx={yearStemIdx}
                        yearBranchIdx={yearBranchIdx}
                        zodiac={currentZodiac}
                        selectedMonthIndex={selectedMonthIndex}
                        setSelectedMonthIndex={setSelectedMonthIndex}
                    />
                )}
            </div>
        </section>
    );
};

// Helper Component for Collapsible Aspects
const AspectCard = ({ icon, titleImg, content, borderColor, isOpen, onToggle }) => {
    return (
        <div
            onClick={onToggle}
            className={`bg-white rounded-lg border border-stone-200 shadow-sm overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-paper ${isOpen ? 'ring-1 ring-stone-300' : 'hover:bg-stone-50'}`}
        >
            <div className="p-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    {icon}
                    {/* Resized to h-[32px] (2x) */}
                    <img src={titleImg} alt="Aspect Title" className="h-[32px] w-auto object-contain" />
                </div>
                <span className={`text-stone-400 font-light transform transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`}>＋</span>
            </div>

            {isOpen && (
                <div className="px-5 pb-5 pt-0 text-base text-stone-600 text-justify leading-loose tracking-wide border-t border-stone-100 mt-0 pt-4 animation-fade-in font-sans">
                    {content}
                </div>
            )}
        </div>
    );
}

// Extracted Fallback Component to keep things clean
const ZodiacDetailFallback = ({ currentZodiacIdx, year, yearStemIdx, yearBranchIdx, zodiac, selectedMonthIndex, setSelectedMonthIndex }) => {
    // Reuse original logic logic here
    const offset = (currentZodiacIdx - yearBranchIdx + 12) % 12;
    const starData = ANNUAL_STARS_MAP[offset];
    const { type } = calculateZodiacRelation(currentZodiacIdx, yearBranchIdx);
    const detailedReport = getYearlyDetailedReport(yearStemIdx, yearBranchIdx, currentZodiacIdx, starData.stars, type);

    return (
        <div className="bg-white border text-stone-900 rounded-lg shadow-paper p-6 mx-1 mb-20">
            {/* Header Section of Detail Card */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 border-b border-stone-100 pb-6">
                <div className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-paper rounded-full flex items-center justify-center text-4xl font-sans font-bold text-clay border border-stone-200">
                        {zodiac.name}
                    </div>
                    <div>
                        <h3 className="text-3xl font-bold text-stone-900 font-sans tracking-widest flex items-center gap-3">
                            {year}年運勢
                            <span className="text-sm font-normal text-stone-500 bg-paper px-3 py-1 rounded-full tracking-wide">屬{zodiac.char}</span>
                        </h3>
                        <div className="text-sm text-stone-500 mt-2 font-sans tracking-wide">
                            <span className="bg-stone-50 text-stone-400 px-2 py-1 rounded text-xs border border-stone-100">資料編撰中...</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-center py-12">
                <p className="text-stone-400 font-sans tracking-widest text-lg">該生肖的 {year} 年詳細運程正在編撰中。</p>
            </div>
        </div>
    );
};

// Helper Component for Collapsible Months
const MonthCard = ({ m, isOpen, onToggle }) => {
    return (
        <div
            onClick={onToggle}
            className={`bg-white rounded-lg border border-stone-200 shadow-sm overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-paper ${isOpen ? 'ring-1 ring-clay' : 'hover:bg-stone-50'}`}
        >
            <div className="p-5 flex gap-5 items-center">
                {/* Month Badge - Removed Background Styling */}
                <div className={`flex flex-col items-center justify-center w-16 h-16 rounded-md shrink-0 transition-colors duration-500`}>
                    {/* Replaced Text with Image */}
                    <img src={MONTH_NUM_IMGS[m.month]} alt={`${m.month}月`} className="h-[95%] w-auto object-contain" />
                </div>

                {/* Header Summary */}
                <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                        <div className="flex items-center gap-2 overflow-hidden">
                            {/* Replaced Text with Image */}
                            <img src={MONTH_LUNAR_IMGS[m.month]} alt={m.title} className="h-[16px] w-auto object-contain" />
                            <span className="text-sm font-sans text-stone-400 shrink-0">({m.date})</span>
                        </div>
                        <span className={`text-stone-300 font-light transform transition-transform duration-500 ${isOpen ? 'rotate-180' : ''} shrink-0 ml-2`}>＋</span>
                    </div>
                    <p className={`text-sm font-medium truncate font-sans tracking-wide transition-colors duration-300 ${isOpen ? 'text-clay' : 'text-stone-400'}`}>{m.trend}</p>
                </div>
            </div>

            {/* Expandable Details */}
            {isOpen && (
                <div className="px-5 pb-5 pt-0 border-t border-stone-100 mt-0 pt-4 animation-fade-in">
                    <p className="text-base text-stone-600 text-justify leading-loose font-sans tracking-wide mb-4 border-l-2 border-stone-200 pl-4">{m.desc}</p>
                    <div className="flex items-center gap-2 text-red-muted text-sm font-bold bg-red-muted/5 px-3 py-2 rounded-md border border-red-muted/10">
                        <span className="animate-pulse">💓</span>
                        <span className="tracking-wide">健康注意：{m.health}</span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ZodiacList;
