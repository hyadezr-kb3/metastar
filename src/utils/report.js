import { ZODIAC_LIST, BRANCHES, HEAVENLY_STEMS_ARR, EARTH_BRANCHES_ARR, STEMS } from '../data/constants';
import { calculateTenGod, getTenGodInfo } from './engine';
import { ELEMENTS } from '../data/elements';
import { FORTUNES_2026 } from '../data/fortunes/2026';

// 1. 流年列表簡述
export const getYearlyShortSummary = (type, stars, yearStem, zodiacIdx) => {
    // Check for static explanation first (Optional: if we want short summaries to be manual too)
    // For now, keep short summary algorithmic or check if 'overview.general' exists to grab a snippet?
    // Let's keep short summary algorithmic for the list view unless requested otherwise, 
    // BUT the prompt implies "12 months detailed fortune text", so maybe overview too.

    // Quick check: If manual data exists, maybe use first sentence? 
    // For simplicity/safety, let's keep the short summary tag-based for now (Tai Sui status etc is standard).
    // User asked for "Detailed Fortune" text extraction.

    const selfStem = BRANCHES[EARTH_BRANCHES_ARR[zodiacIdx]].hidden;
    const tenGod = calculateTenGod(selfStem, yearStem);

    if (type === 'fan') return '值太歲，諸事宜靜不宜動。';
    if (type === 'chong') return '沖太歲，必有動盪變遷。';
    if (type === 'xing') return '刑太歲，易惹官非口舌。';
    if (type === 'hai') return '害太歲，防小人暗害。';
    if (type === 'he') return '六合太歲，貴人多助。';
    if (type === 'sanhe') return '三合拱照，社交運強。';
    if (type === 'sanhui') return '三會強援，勢不可擋。';

    const goodStar = stars.find(s => ['紫微', '太陽', '天德', '福德'].includes(s));
    if (goodStar) return `${goodStar}吉星高照，運勢上揚。`;

    const badStar = stars.find(s => ['白虎', '五鬼', '病符'].includes(s));
    if (badStar) return `${badStar}入命，需防意外。`;

    return `流年${tenGod}主事，平穩進取。`;
};

// 2. 流年詳批 (Hybrid System: Manual > Matrix > Fallback)
export const getYearlyDetailedReport = (yearStemIdx, yearBranchIdx, zodiacIdx, stars, type) => {
    // A. Check for Manual Data (2026)
    // We can map year index to year number. 2026 is Bing Wu.
    // Assuming simple year check for now. 
    // In a real app we'd pass the actual year number. currently yearStem/BranchIdx are cyclical.
    // Optimization: Assume the current context of the app is 2026 if checking 2026 data.
    // The user primarily cares about 2026/2027.

    // For this verification, we strictly check if we have data for this zodiac in 2026 slot.
    // Note: The UI separates years. We need to know WHICH year is being requested.
    // The current function signature doesn't pass 'year'. 
    // However, 2026 = Bing (2) Wu (6). 
    // yearStemIdx=2, yearBranchIdx=6 corresponds to 2026.

    // Manual Override Logic
    if (yearStemIdx % 10 === 2 && yearBranchIdx % 12 === 6) { // 2026
        const manualData = FORTUNES_2026[zodiacIdx];
        if (manualData) {
            return manualData.overview;
        }
    }

    // B. Fallback to Algorithmic Matrix Generation
    const selfStem = BRANCHES[EARTH_BRANCHES_ARR[zodiacIdx]].hidden;
    const yearStem = HEAVENLY_STEMS_ARR[yearStemIdx % 10];
    const god = calculateTenGod(selfStem, yearStem);
    const reading = getTenGodInfo(god);

    // 1. Relationship Matrix (地支關係)
    const RELATION_MODIFIERS = {
        'fan': { desc: '值太歲，伏吟', influence: '阻滯、壓力、停滯', advice: '宜靜不宜動，韜光養晦', score: -2 },
        'chong': { desc: '沖太歲，歲破', influence: '動盪、變遷、衝擊', advice: '主動尋求變化，如出差搬遷', score: -3 },
        'xing': { desc: '刑太歲', influence: '是非、刑傷', advice: '低調行事，防官非口舌', score: -2 },
        'hai': { desc: '害太歲', influence: '陷害、不和', advice: '提防小人，注意身體保養', score: -2 },
        'he': { desc: '六合太歲', influence: '貴人、和諧', advice: '利用人脈，大膽進取', score: 3 },
        'sanhe': { desc: '三合太歲', influence: '聯盟、社交', advice: '團隊合作，如虎添翼', score: 2 },
        'sanhui': { desc: '三會太歲', influence: '強援、勢眾', advice: '借勢而起，順水推舟', score: 2 },
        'normal': { desc: '運勢平穩', influence: '平順、積累', advice: '按部就班，充實自我', score: 0 }
    };
    const rel = RELATION_MODIFIERS[type] || RELATION_MODIFIERS['normal'];

    // 2. Elemental Flow Matrix (五行燥濕冷熱)
    const yEl = STEMS[yearStem].el;
    const zInfo = BRANCHES[EARTH_BRANCHES_ARR[zodiacIdx]];
    const zEl = zInfo.el;

    let elementFlow = "";
    let baseStatus = "運勢平穩"; // Default fallback

    if (yEl === '火' && (zEl === '火' || ['未', '戌'].includes(zInfo.branch))) {
        elementFlow = "火炎土燥，性情急躁";
        baseStatus = "情緒起伏";
    } else if (yEl === '水' && (zEl === '水' || ['丑', '辰'].includes(zInfo.branch))) {
        elementFlow = "水寒濕重，思緒較沉";
        baseStatus = "心態保守";
    } else if (yEl === '火' && ['丑', '辰'].includes(zInfo.branch)) {
        elementFlow = "寒濕遇暖，生機勃發"; // Wet Earth meets Fire
        baseStatus = "穩步上揚";
    } else if (yEl === '水' && ['未', '戌'].includes(zInfo.branch)) {
        elementFlow = "燥土逢潤，左右逢源"; // Dry Earth meets Water
        baseStatus = "漸入佳境";
    } else if (ELEMENTS[yEl].generates === zEl) {
        elementFlow = "得流年相生，資源充沛";
        baseStatus = "貴人助力";
    } else if (ELEMENTS[yEl].controls === zEl) {
        elementFlow = "受流年剋制，壓力稍大";
        baseStatus = "逆風前行";
    } else if (ELEMENTS[zEl].controls === yEl) {
        elementFlow = "剋制流年，勞心勞力";
        baseStatus = "辛苦得財";
    } else {
        elementFlow = "五行氣場平和";
    }

    // --- Generate Sections ---

    // A. General Luck
    let general = `本年天干【${god}】主事，${elementFlow}。`;
    general += ` ${rel.desc}，主${rel.influence}。${rel.advice}。`;

    const majorStars = stars.filter(s => ['紫微', '太陽', '天德', '福德', '龍德'].includes(s));
    if (majorStars.length > 0) {
        general += ` 幸有【${majorStars.join('、')}】吉星照耀，逢凶化吉，格局宏大。`;
    } else if (stars.some(s => ['咸池', '紅鸞'].includes(s))) {
        general += ' 桃花星入命，人緣極佳，利於社交推廣。';
    } else if (type === 'normal' && stars.length === 0) {
        general += ' 無明顯吉凶星，需靠自身努力，避免依賴運氣。';
    }

    // B. Career Luck
    let career = reading.career;
    if (type === 'sanhe' || type === 'sanhui') career = "三合/三會局助陣，團隊默契佳，" + career + " 利於合作開發。";
    else if (type === 'he') career = "六合貴人提攜，" + career + " 易獲上司賞識。";
    else if (type === 'chong') career = "沖太歲變動大，" + career + " 雖有波折但也是轉機。";
    else if (type === 'hai') career = "害太歲易犯小人，" + career + " 勿強出頭，低調為佳。";
    else if (baseStatus === "逆風前行") career = "流年壓力較大，" + career + " 宜守成，不宜貿然轉職。";
    else if (baseStatus === "貴人助力") career = "得長輩或上司助力，" + career + " 機會眾多。";

    if (stars.includes('將星') || stars.includes('八座')) career += " 權力地位提升，有掌權之象。";

    // C. Relationship Luck
    let relationship = reading.relationship;

    if (type === 'chong') {
        relationship = "沖太歲感情易變，聚少離多，宜互信互諒，以免衝突。";
    } else if (['咸池', '紅鸞', '天喜'].some(s => stars.includes(s))) {
        relationship = "桃花星動，感情生活豐富，單身者宜把握，已婚者防牆外桃花。";
    } else if (type === 'sanhe' || type === 'he') {
        relationship = "太歲相合，感情融洽，" + relationship;
    } else { // Normal cases
        relationship += ""; // Keep base text
    }

    if (zInfo.branch === '戌' && yearStem === '丙') relationship += " 火庫逢火，熱情如火但易爭執。";

    // D. Health Luck
    let health = reading.health;

    if (elementFlow.includes('火炎土燥')) health = "火氣過旺，防發炎、眼疾或心血管問題。";
    else if (elementFlow.includes('水寒濕重')) health = "寒濕過重，防腎虛、水腫或風濕痛。";
    else if (elementFlow.includes('燥土逢潤')) health = "燥濕調和，身體狀況大致良好。";

    if (stars.includes('病符')) {
        health = "病符星動，小病不斷，宜做健康檢查。 " + health;
    } else if (type === 'chong') {
        health = "沖太歲防意外衝撞，駕駛小心。 " + health;
    }

    return { general, career, relationship, health };
};

// 3. Monthly Report Hook for Manual Override
export const getMonthlyReportOverride = (yearStemIdx, yearBranchIdx, zodiacIdx, monthIndex) => {
    if (yearStemIdx % 10 === 2 && yearBranchIdx % 12 === 6) { // 2026
        const manualData = FORTUNES_2026[zodiacIdx];
        if (manualData && manualData.months && manualData.months[monthIndex]) {
            return manualData.months[monthIndex]; // Return manual string
        }
    }
    return null; // No override, use engine
}

export const getColorAdvice = (star) => {
    const el = star.element;
    const parentKey = Object.keys(ELEMENTS).find(k => ELEMENTS[k].generates === el);
    const childKey = ELEMENTS[el].generates;
    const elColor = ELEMENTS[el].colorName;
    const parentColor = ELEMENTS[parentKey].colorName;
    const childColor = ELEMENTS[childKey].colorName;

    if (['吉', '大吉'].includes(star.type)) {
        return { lucky: `${elColor}、${parentColor}`, avoid: `${childColor} (洩氣)` };
    } else {
        return { lucky: `${childColor} (化洩)`, avoid: `${elColor}、${parentColor} (助旺)` };
    }
};

export const analyzeRelation = (s, p) => {
    if (s === p) return { type: '比旺', desc: '星宮同氣', strength: '強', color: 'text-amber-600', interaction: `${s}星入${p}宮，星宮比和`, explanation: '星得地利，力量增強。' };
    if (ELEMENTS[s].generates === p) return { type: '洩氣', desc: '星生宮', strength: '減弱', color: 'text-gray-500', interaction: `${s}星入${p}宮，星生宮`, explanation: '星氣洩於宮位，力量減弱。' };
    if (ELEMENTS[p].generates === s) return { type: '得生', desc: '宮生星', strength: '極強', color: 'text-red-600', interaction: `${s}星入${p}宮，宮生星`, explanation: '宮位生旺飛星，力量大增。' };
    if (ELEMENTS[s].controls === p) return { type: '剋出', desc: '星剋宮', strength: '稍弱', color: 'text-orange-500', interaction: `${s}星入${p}宮，星剋宮`, explanation: '星剋宮位，雖佔上風但損耗元氣。' };
    if (ELEMENTS[p].controls === s) return { type: '受剋', desc: '宮剋星', strength: '受制', color: 'text-stone-400', interaction: `${s}星入${p}宮，宮剋星`, explanation: '宮剋飛星，飛星受制，力量大減。' };
    return { type: '-', desc: '-', interaction: '-', explanation: '-' };
};
