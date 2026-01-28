import { Lunar } from 'lunar-javascript';
import { getLunarDate, get12HourLuck } from './src/utils/dateUtils.js';

const date = new Date('2026-02-05'); // Pick a random day, e.g. Feb 5 2026
const hours = get12HourLuck(date);

console.log(`Date: ${date.toDateString()}`);
hours.forEach(h => {
    // We need to re-fetch raw data to compare, as get12HourLuck returns filtered now
    // Actually get12HourLuck code calls processYiJi internally.
    // To debug, I need to see what get12HourLuck is seeing.
    // But I can't easily modify the source for logging without editing file.
    // I'll simulate the raw call here.

    // Reconstruct hour date
    // Note: get12HourLuck logic:
    // timeZhi index 0 -> 23:00-01:00. This is actually previous day late night or today early?
    // Lunar lib handles it.

    // I'll just print what get12HourLuck returns first.
    console.log(`\n=== ${h.zhi} Hour (${h.range}) ===`);
    console.log(`Yi: ${h.yi.join(', ')}`);
    console.log(`Ji: ${h.ji.join(', ')}`);

    if (h.yi.length === 0 && h.ji.length === 0) {
        console.log("!!! EMPTY !!!");
    }
});

// To see RAW items, I will replicate the logic locally
// Copied MAPPING from dateUtils
const YI_JI_MAPPING = {
    "嫁娶": "嫁娶", "订盟": "訂盟", "安床": "安床", "会亲友": "會友",
    "入宅": "移徙", "移徙": "移徙", "动土": "動土", "修造": "動土", "拆卸": "動土", "开市": "開市",
    "交易": "交易", "立券": "交易", "赴任": "赴任",
    "出行": "出行", "理发": "理髮", "扫舍": "掃舍", "祭祀": "祭祀", "祈福": "祈福",
    "安葬": "安葬"
};

console.log("\n--- DEEP DIVE INTO RAW DATA ---");
const timeZhi = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
timeZhi.forEach((zhi, idx) => {
    let targetHour = idx * 2;
    if (idx === 0) targetHour = 0;
    const hDate = new Date(date);
    hDate.setHours(targetHour, 0, 0, 0);
    const lunar = Lunar.fromDate(hDate);

    const rawYi = lunar.getTimeYi();
    const rawJi = lunar.getTimeJi();

    console.log(`${zhi} Raw Yi:`, rawYi.join(', '));
    // Filter check
    const filteredYi = rawYi.filter(t => YI_JI_MAPPING[t]);
    console.log(`${zhi} Filtered Yi:`, filteredYi.map(t => YI_JI_MAPPING[t]).join(', '));

    console.log(`${zhi} Raw Ji:`, rawJi.join(', '));
    const filteredJi = rawJi.filter(t => YI_JI_MAPPING[t]);
    console.log(`${zhi} Filtered Ji:`, filteredJi.map(t => YI_JI_MAPPING[t]).join(', '));
});
