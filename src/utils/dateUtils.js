import { Solar, Lunar } from 'lunar-javascript';

// Strict User-Defined Mapping: Key = Simplified (Library Output), Value = Traditional/Merged Name
// Deletions are implicit (keys not here are ignored).
const YI_JI_MAPPING = {
    // Wedding
    "嫁娶": "嫁娶",
    "订盟": "訂盟",
    "安床": "安床",
    "会亲友": "會友", // Renamed

    // Living/Construction
    "入宅": "移徙",   // Merged
    "移徙": "移徙",   // Merged
    "动土": "動土",   // Merged
    "修造": "動土",   // Merged
    "拆卸": "動土",   // Merged
    "开市": "開市",

    // Business
    "交易": "交易",   // Merged
    "立券": "交易",   // Merged
    "赴任": "赴任",

    // Travel/Lifestyle
    "出行": "出行",
    "理发": "理髮",
    "扫舍": "掃舍",
    "祭祀": "祭祀",
    "祈福": "祈福",

    // Funeral
    "安葬": "安葬"
};

const TC_MAP = {
    "马": "馬", "见": "見", "贝": "貝", "车": "車", "长": "長", "门": "門",
    "选": "選", "韦": "韋", "让": "讓", "风": "風", "飞": "飛", "电": "電",
    "东": "東", "西": "西", "南": "南", "北": "北",
    "龙": "龍", "鸡": "雞", "猪": "豬", "鼠": "鼠", "牛": "牛", "虎": "虎",
    "兔": "兔", "蛇": "蛇", "羊": "羊", "猴": "猴", "狗": "狗",
    "执": "執", "战": "戰", "腊": "臘",
    "陈": "陳", "财": "財", "开": "開", "无": "無", "成": "成", "收": "收", "匮": "匱",
    "除": "除", "满": "滿", "平": "平", "定": "定", "破": "破", "危": "危", "闭": "閉",
    "黄": "黃", "黑": "黑" // Ensure Value God types are TC
};

const toTraditional = (str) => {
    if (!str) return "";
    const s = String(str);
    return s.split('').map(char => TC_MAP[char] || char).join('');
};

/**
 * Formats: DD-MM-YY HH-MM-SS
 */
const formatTermTime = (solar) => {
    if (!solar) return "";
    const pad = (n) => n.toString().padStart(2, '0');
    return `${pad(solar.getDay())}-${pad(solar.getMonth())}-${solar.getYear().toString().slice(2)} ${pad(solar.getHour())}:${pad(solar.getMinute())}:${pad(solar.getSecond())}`;
};

/**
 * Filter and Transform Yi/Ji list based on strict user mapping
 */
const processYiJi = (terms) => {
    const result = new Set(); // Use Set to deduplicate merged items (e.g. RuZhai + YiXi -> YiXi)
    terms.forEach(term => {
        const mapped = YI_JI_MAPPING[term]; // term is Simplified from library
        if (mapped) {
            result.add(mapped);
        }
    });
    // Convert Set back to Array of objects
    return Array.from(result).map(text => ({ original: text }));
};

export const getLunarDate = (date) => {
    if (!date) return null;
    const solar = Solar.fromDate(date);
    const lunar = Lunar.fromDate(date);

    // Solar Term Logic
    // getJieQi() returns string if today IS term, else empty string.
    // We use this for Grid Display (only show term on the specific day)
    const dailyTerm = lunar.getJieQi();
    const dailyTermName = dailyTerm ? toTraditional(dailyTerm) : "";

    // getPrevJieQi(true) returns the ACTIVE term for the period.
    // We use this for the Detail View ("Previous/Current Term")
    const currentTermObj = lunar.getPrevJieQi(true);
    const currentTermName = currentTermObj ? toTraditional(currentTermObj.getName()) : "";
    const currentTermSolar = currentTermObj ? currentTermObj.getSolar() : null;

    // Next Term
    const nextJieQi = lunar.getNextJieQi(true);
    const nextTermName = nextJieQi ? toTraditional(nextJieQi.getName()) : "";
    const nextTermSolar = nextJieQi ? nextJieQi.getSolar() : null;

    // Officer (Jian Chu)
    const officerName = toTraditional(lunar.getZhiXing());

    const formatDirection = (pos) => {
        const map = {
            '震': '正東', '巽': '東南', '离': '正南', '離': '正南',
            '坤': '西南', '兑': '正西', '兌': '正西', '乾': '西北',
            '坎': '正北', '艮': '東北', '中': '中宮'
        };
        // Ensure we check the character (sometimes it might be SC/TC)
        const s = String(pos);
        const char = s.trim();
        return map[char] || toTraditional(s);
    }

    return {
        solar: {
            year: solar.getYear(),
            month: solar.getMonth(),
            day: solar.getDay(),
            weekDay: solar.getWeek(),
            weekDayChinese: toTraditional(solar.getWeekInChinese()),
            constellation: toTraditional(solar.getXingZuo()), // Western Zodiac
            fullString: solar.toYmd()
        },
        lunar: {
            yearString: `${lunar.getYearInGanZhi()}(${toTraditional(lunar.getYearShengXiao())})年`,
            monthString: `${toTraditional(lunar.getMonthInChinese())}月`,
            dayString: `${toTraditional(lunar.getDayInChinese())}`,
            fullString: lunar.toString(),
            season: toTraditional(lunar.getSeason()),
            dayGanZhi: toTraditional(lunar.getDayInGanZhi()),
            monthGanZhi: toTraditional(lunar.getMonthInGanZhi()),
            yearGanZhi: toTraditional(lunar.getYearInGanZhi()),
            dayShengXiao: toTraditional(lunar.getDayShengXiao()), // Added for Hourly Chone Sha context
        },
        term: {
            daily: dailyTermName, // Only present if today IS a term day
            current: {
                name: currentTermName, // The active term for this period
                time: currentTermSolar ? formatTermTime(currentTermSolar) : ""
            },
            next: {
                name: nextTermName,
                time: nextTermSolar ? formatTermTime(nextTermSolar) : ""
            }
        },
        gods: {
            wealth: formatDirection(lunar.getDayPositionCai()), // 財神 -> 方向
            happy: formatDirection(lunar.getDayPositionXi()),   // 喜神 -> 方向
            fortune: formatDirection(lunar.getDayPositionFu()), // 福神 -> 方向
        },
        info: {
            pengZu: {
                gan: toTraditional(lunar.getPengZuGan()),
                zhi: toTraditional(lunar.getPengZuZhi())
            },
            naYin: toTraditional(lunar.getDayNaYin()), // e.g. 山下火
            nineStar: toTraditional(lunar.getDayNineStar().toString()), // Daily Nine Star
            xiu: toTraditional(lunar.getXiu()), // 28 Mansions
            zodiacSha: toTraditional(lunar.getDaySha()), // 煞
            zodiacChong: toTraditional(lunar.getDayChongDesc()), // 沖
            valueGod: toTraditional(lunar.getDayTianShen()), // Zhi Shen (Yellow/Black path)
            valueGodType: toTraditional(lunar.getDayTianShenType()), // HuangDao/HeiDao
        },
        officer: {
            name: officerName,
        },
        yi: processYiJi(lunar.getDayYi()),
        ji: processYiJi(lunar.getDayJi()),
    };
};

export const get12HourLuck = (date) => {
    const hours = [];
    const timeZhi = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

    const getTimeRange = (idx) => {
        if (idx === 0) return "23:00-01:00";
        const start = (idx * 2 - 1).toString().padStart(2, '0');
        const end = (idx * 2 + 1).toString().padStart(2, '0');
        return `${start}:00-${end}:00`;
    };

    const formatDirection = (pos) => {
        const map = {
            '震': '正東', '巽': '東南', '离': '正南', '離': '正南',
            '坤': '西南', '兑': '正西', '兌': '正西', '乾': '西北',
            '坎': '正北', '艮': '東北', '中': '中宮'
        };
        const s = String(pos);
        const char = s.trim();
        return map[char] || toTraditional(s);
    };

    timeZhi.forEach((zhi, idx) => {
        let targetHour = idx * 2;
        if (idx === 0) targetHour = 0;

        const hDate = new Date(date);
        hDate.setHours(targetHour, 0, 0, 0);

        const lunar = Lunar.fromDate(hDate);

        const tianShen = toTraditional(lunar.getTimeTianShen());
        const tianShenLuck = toTraditional(lunar.getTimeTianShenLuck());

        const yiRaw = lunar.getTimeYi();
        // Use processYiJi to apply the same Strict Mapping/Filtering as Daily
        const yiFiltered = processYiJi(yiRaw).map(item => item.original);

        const jiRaw = lunar.getTimeJi();
        const jiFiltered = processYiJi(jiRaw).map(item => item.original);

        hours.push({
            zhi,
            range: getTimeRange(idx),
            ganZhi: lunar.getTimeInGanZhi(),
            tianShen,
            type: tianShenLuck,
            yi: yiFiltered, // Array of strings (TC)
            ji: jiFiltered, // Array of strings (TC)
            chong: toTraditional(lunar.getTimeChongDesc()),
            sha: toTraditional(lunar.getTimeSha()), // Hourly Sha
            gods: {
                wealth: formatDirection(lunar.getTimePositionCai()),
                happy: formatDirection(lunar.getTimePositionXi()),
                fortune: formatDirection(lunar.getTimePositionFu())
            }
        });
    });

    return hours;
};
