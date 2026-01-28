export const ZODIAC_LIST = ['鼠', '牛', '虎', '兔', '龍', '蛇', '馬', '羊', '猴', '雞', '狗', '豬'];
export const EARTH_BRANCHES_ARR = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
export const HEAVENLY_STEMS_ARR = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
export const MONTH_NAMES = ['正月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
export const ROOM_OPTIONS = ['(未選擇)', '主人房', '睡房1', '睡房2', '客廳', '飯廳', '洗手間', '廚房', '窗/露台', '雜物房', '大門'];
export const SOLAR_TERMS_START_DAYS = [4, 6, 5, 6, 6, 7, 8, 8, 8, 7, 7, 6];

// Stems Data
export const STEMS = {
    '甲': { el: '木', yinYang: '陽', name: '甲木', nature: '參天大樹', organ: '膽', body: '頭部/神經' },
    '乙': { el: '木', yinYang: '陰', name: '乙木', nature: '花草藤蘿', organ: '肝', body: '頸肢/筋脈' },
    '丙': { el: '火', yinYang: '陽', name: '丙火', nature: '太陽之火', organ: '小腸', body: '眼目/肩背' },
    '丁': { el: '火', yinYang: '陰', name: '丁火', nature: '燈燭之火', organ: '心', body: '氣血/舌頭' },
    '戊': { el: '土', yinYang: '陽', name: '戊土', nature: '高山厚土', organ: '胃', body: '背肌/消化' },
    '己': { el: '土', yinYang: '陰', name: '己土', nature: '田園濕土', organ: '脾', body: '腹部/肌肉' },
    '庚': { el: '金', yinYang: '陽', name: '庚金', nature: '刀斧頑金', organ: '大腸', body: '骨骼/關節' },
    '辛': { el: '金', yinYang: '陰', name: '辛金', nature: '首飾珠玉', organ: '肺', body: '呼吸/牙齒' },
    '壬': { el: '水', yinYang: '陽', name: '壬水', nature: '江河大海', organ: '膀胱', body: '血液/循環' },
    '癸': { el: '水', yinYang: '陰', name: '癸水', nature: '雨露之水', organ: '腎', body: '泌尿/耳' },
};

// Branches Data
export const BRANCHES = {
    '子': { el: '水', hidden: '癸', yinYang: '陽', name: '鼠', organ: '膀胱', body: '耳/腰' },
    '丑': { el: '土', hidden: '己', yinYang: '陰', name: '牛', organ: '脾', body: '腹/足' },
    '寅': { el: '木', hidden: '甲', yinYang: '陽', name: '虎', organ: '膽', body: '頭/關節' },
    '卯': { el: '木', hidden: '乙', yinYang: '陰', name: '兔', organ: '肝', body: '頸/神經' },
    '辰': { el: '土', hidden: '戊', yinYang: '陽', name: '龍', organ: '胃', body: '背/皮' },
    '巳': { el: '火', hidden: '丙', yinYang: '陽', name: '蛇', organ: '小腸', body: '面/咽' },
    '午': { el: '火', hidden: '丁', yinYang: '陰', name: '馬', organ: '心', body: '眼/血' },
    '未': { el: '土', hidden: '己', yinYang: '陰', name: '羊', organ: '脾', body: '腹/脊' },
    '申': { el: '金', hidden: '庚', yinYang: '陽', name: '猴', organ: '大腸', body: '骨/經' },
    '酉': { el: '金', hidden: '辛', yinYang: '陰', name: '雞', organ: '肺', body: '皮/鼻' },
    '戌': { el: '土', hidden: '戊', yinYang: '陽', name: '狗', organ: '胃', body: '足/胸' },
    '亥': { el: '水', hidden: '壬', yinYang: '陰', name: '豬', organ: '腎', body: '血/尿' }
};

// Zodiac Details
export const ZODIAC_DETAILS = ZODIAC_LIST.map((name, idx) => {
    const branchChar = EARTH_BRANCHES_ARR[idx];
    return { ...BRANCHES[branchChar], branch: branchChar, name };
});
