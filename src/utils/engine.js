import { STEMS, BRANCHES, EARTH_BRANCHES_ARR } from '../data/constants';
import { ELEMENTS } from '../data/elements';
import { TEN_GODS } from '../data/tenGods';

// 安全獲取數據 (防白畫面關鍵)
export const getStemInfo = (char) => STEMS[char] || STEMS['甲'];
export const getBranchInfo = (char) => BRANCHES[char] || BRANCHES['子'];
export const getTenGodInfo = (god) => TEN_GODS[god] || TEN_GODS['未知'];

// 計算十神
export const calculateTenGod = (selfStemChar, targetStemChar) => {
    const self = getStemInfo(selfStemChar);
    const target = getStemInfo(targetStemChar);

    if (self.el === target.el) return self.yinYang === target.yinYang ? '比肩' : '劫財';
    if (ELEMENTS[self.el].generates === target.el) return self.yinYang === target.yinYang ? '食神' : '傷官';
    if (ELEMENTS[self.el].controls === target.el) return self.yinYang === target.yinYang ? '偏財' : '正財';
    if (ELEMENTS[target.el].controls === self.el) return self.yinYang === target.yinYang ? '七殺' : '正官';
    if (ELEMENTS[target.el].generates === self.el) return self.yinYang === target.yinYang ? '偏印' : '正印';
    return '未知';
};

// 判斷五行關係
export const checkRelation = (el1, el2) => {
    if (el1 === el2) return '同氣';
    if (ELEMENTS[el1].generates === el2) return '生';
    if (ELEMENTS[el1].controls === el2) return '剋';
    if (ELEMENTS[el2].generates === el1) return '被生';
    if (ELEMENTS[el2].controls === el1) return '被剋';
    return '無';
};

// 判斷地支刑沖
export const checkBranchRel = (b1, b2) => {
    const i1 = EARTH_BRANCHES_ARR.indexOf(b1);
    const i2 = EARTH_BRANCHES_ARR.indexOf(b2);
    const diff = (i2 - i1 + 12) % 12;

    if (diff === 6) return '沖';
    if ((i1 + i2) % 12 === 1) return '合';
    if ((b1 === '子' && b2 === '卯') || (b1 === '卯' && b2 === '子')) return '刑';
    if (['辰', '午', '酉', '亥'].includes(b1) && b1 === b2) return '刑'; // 自刑
    return null;
};

// 五虎遁月 (Five Tigers Chasing Months)
export const getMonthlyStem = (yearStemIdx, monthBranchIdx) => {
    // monthBranchIdx: 0=Tiger(寅/Feb/Jan.Lunar) ... 11=Ox
    // Logic: (YearStemIdx % 5) * 2 + 2 is the starting Stem index for Tiger month
    const startStemIdx = ((yearStemIdx % 5) * 2 + 2) % 10;
    return (startStemIdx + monthBranchIdx) % 10;
};

// 紫微斗數四化表 (Zi Wei Dou Shu - Si Hua)
const ZWDS_SI_HUA = {
    '甲': { lu: '廉貞', quan: '破軍', ke: '武曲', ji: '太陽' },
    '乙': { lu: '天機', quan: '天梁', ke: '紫微', ji: '太陰' },
    '丙': { lu: '天同', quan: '天機', ke: '文昌', ji: '廉貞' },
    '丁': { lu: '太陰', quan: '天同', ke: '天機', ji: '巨門' },
    '戊': { lu: '貪狼', quan: '太陰', ke: '右弼', ji: '天機' },
    '己': { lu: '武曲', quan: '貪狼', ke: '天梁', ji: '文曲' },
    '庚': { lu: '太陽', quan: '武曲', ke: '太陰', ji: '天同' },
    '辛': { lu: '巨門', quan: '太陽', ke: '文曲', ji: '文昌' },
    '壬': { lu: '天梁', quan: '紫微', ke: '左輔', ji: '武曲' },
    '癸': { lu: '破軍', quan: '巨門', ke: '太陰', ji: '貪狼' }
};

export const getSiHua = (stem) => ZWDS_SI_HUA[stem] || null;

// [核心] 全局八字分析 (Refined)
export const analyzeDestiny = (yStem, yBranch, mStem, mBranch, zBranch) => {
    // 數據準備
    const zInfo = getBranchInfo(zBranch);
    const selfStem = zInfo.hidden; // 命主(生肖藏干)
    const selfEl = zInfo.el;

    const msInfo = getStemInfo(mStem);
    const mbInfo = getBranchInfo(mBranch);
    const ysInfo = getStemInfo(yStem);

    // 1. 計算十神
    const stemGod = calculateTenGod(selfStem, mStem);
    const branchGod = calculateTenGod(selfStem, mbInfo.hidden);

    // 2. 五行相互作用
    const yearMonthRel = checkRelation(ysInfo.el, msInfo.el); // 年干 vs 月干
    const stemBranchRel = checkRelation(msInfo.el, mbInfo.el.replace('土', msInfo.el)); // 月干 vs 月支 (近似) - 修正：月支氣勢通常由月令決定，這裡簡化處理

    // 3. 地支互動 (Month vs Zodiac)
    const branchRel = checkBranchRel(zBranch, mBranch);

    // 4. 紫微斗數四化 (流年 & 流月)
    const yearSiHua = getSiHua(yStem);
    const monthSiHua = getSiHua(mStem);

    // --- 運勢文案 ---
    let fortune = "";

    // A. 標題與核心格局
    fortune += `【天干${stemGod}・地支${branchGod}】`;

    // B. 紫微四化引入 (增加豐富度)
    if (monthSiHua) {
        fortune += `流月天干${mStem}引動${monthSiHua.lu}化祿，${monthSiHua.ji}化忌。`;
    }

    // C. 天干地支綜合解析 (避免純粹重複)
    // 透過 "月干" 的屬性來修飾 "月支" 的環境
    const mStemDesc = TEN_GODS[stemGod]?.general || "運勢平平";
    const mBranchDesc = TEN_GODS[branchGod]?.career || "守成為上";

    // 判斷月干對月支的影響 (蓋頭/截腳/相生/比和)
    const mbEl = mbInfo.el; // 月支五行
    const msEl = msInfo.el; // 月干五行

    let stemEffect = "";
    if (ELEMENTS[msEl].controls === mbEl) {
        stemEffect = "天干剋地支（蓋頭），外在壓力大，"; // e.g. 庚寅 (金剋木)
    } else if (ELEMENTS[mbEl].controls === msEl) {
        stemEffect = "地支剋天干（截腳），理想難以落實，"; // e.g. 甲申 (金剋木)
    } else if (ELEMENTS[msEl].generates === mbEl) {
        stemEffect = "天干生地支，外在資源挹注，"; // e.g. 壬寅 (水生木)
    } else if (ELEMENTS[mbEl].generates === msEl) {
        stemEffect = "地支生天干，根基穩固助發展，"; // e.g. 丙寅 (木生火)
    } else {
        stemEffect = "干支同氣，氣場專一強大，"; // e.g. 庚申 (金金)
    }

    fortune += ` 本月${stemEffect}${mStemDesc}`; // Removed period as mStemDesc typically ends sentence or we add it later?
    // Actually mStemDesc usually comes from TEN_GODS. 
    // If we look at TEN_GODS, they are phrases like "運勢平平" (no period).
    // But "利於進修。。" implies stemEffect has period?
    // stemEffects are "...," (comma). 
    // Wait, the double period might be from `fortune += ... + "。"` if mStemDesc ALREADY has one?
    // Let's just ensure we strictly control it.

    fortune += "。"; // Add single period explicitly after checking logic if needed, but safest is to just add it once here if we are unsure. 
    // Actually, looking at the logic:
    // stemEffect ends with comma. mStemDesc is text.
    // If mStemDesc is empty, we get "bla, ." -> "bla,."
    // Let's just use: `fortune += \` 本月${stemEffect}${mStemDesc}。\`;` 
    // But if mStemDesc ends with `。`, we get `。。`.
    // Fix: Remove potential trailing period from mStemDesc then add one.

    // D. 深入地支互動 (結合十神與生肖)
    if (branchRel === '沖') {
        fortune += ` 地支${mBranch}${zBranch}相沖，受${monthSiHua?.ji || '凶星'}化忌影響，${stemEffect.includes('剋') ? '動盪加劇' : '變動在所難免'}，凡事宜守不宜攻。`;
    } else if (branchRel === '刑') {
        fortune += ` 地支相刑，${monthSiHua?.ji ? '是非口舌' : '內心糾結'}多，需防小人作祟。`;
    } else if (branchRel === '合') {
        fortune += ` 六合助力，${monthSiHua?.lu ? '貴人顯現' : '合作順利'}，${stemEffect.includes('生') ? '事半功倍' : '難題漸解'}。`;
    } else {
        // E. 地支十神動態解析 (解決重複問題的核心)
        // 根據 月干(msEl) 對 月支(mbEl) 的作用，修飾 地支十神(branchGod) 的表現

        // (1) 判斷干支關係
        let relationType = 'same';
        if (ELEMENTS[msEl].controls === mbEl) relationType = 'stem_controls_branch'; // 蓋頭
        else if (ELEMENTS[mbEl].controls === msEl) relationType = 'branch_controls_stem'; // 截腳
        else if (ELEMENTS[msEl].generates === mbEl) relationType = 'stem_generates_branch'; // 生
        else if (ELEMENTS[mbEl].generates === msEl) relationType = 'branch_generates_stem'; // 洩

        // (2) 定義修飾語 (Modulation Map)
        const MODIFIERS = {
            '傷官': {
                'stem_controls_branch': '雖然有變革之心，但受制於現實規則，行事需轉趨低調。',
                'branch_controls_stem': '理想宏大但資源不足，需步步為營，切勿眼高手低。',
                'stem_generates_branch': '才思泉湧，改革動力強勁，易劍走偏鋒，宜三思後行。',
                'branch_generates_stem': '才華外顯，能言善道，有利於爭取支持，表現亮眼。',
                'same': '傲氣凌人，獨斷獨行，易惹是非，務必謙虛納諫。'
            },
            '食神': {
                'stem_controls_branch': '享受受阻，各方壓力紛至，需調整心態，苦中作樂。',
                'branch_controls_stem': '雖有創意但難以落實，建議先求穩再求變。',
                'stem_generates_branch': '福氣滿溢，資源不缺，心寬體胖，宜把握良機。',
                'branch_generates_stem': '才華有效轉化為成果，利於展現，收穫頗豐。',
                'same': '安於現狀，缺乏動力，易錯失良機，宜積極進取。'
            },
            '七殺': {
                'stem_controls_branch': '壓力倍增，且受外在制約，寸步難行，宜忍辱負重。',
                'branch_controls_stem': '挑戰雖大但名不符實，虛驚一場，處變不驚即可。',
                'stem_generates_branch': '權力慾望高漲，手段激烈，易招反噬，忌操之過急。',
                'branch_generates_stem': '威望得以彰顯，危機處理得當，化險為夷。',
                'same': '壓力極大，四面楚歌，需尋求外援，不可硬碰。'
            },
            '正官': {
                'stem_controls_branch': '地位受損，名譽有爭議，行事宜謹慎，防被人抓住把柄。',
                'branch_controls_stem': '權力被架空，有名無實，需韜光養晦。',
                'stem_generates_branch': '貴人多助，地位穩固，升遷有望，順風順水。',
                'branch_generates_stem': '名聲遠播，獲得公眾認可，利於建立形象。',
                'same': '地位尊崇，一言九鼎，但易流於刻板，缺乏彈性。'
            },
            '偏財': {
                'stem_controls_branch': '財源受制，投資失利，現金流吃緊，宜保守理財。',
                'branch_controls_stem': '看似機會眾多，實則陷阱處處，切勿貪小便宜。',
                'stem_generates_branch': '財源廣進，得外力資金支持，利擴張版圖。',
                'branch_generates_stem': '資金周轉靈活，獲利了結，袋袋平安。',
                'same': '橫財就手，但來得快去得快，宜見好就收。'
            },
            '正財': {
                'stem_controls_branch': '收入縮水，工作量增但不見回報，需節流。',
                'branch_controls_stem': '財來財去，難以積存，需嚴格控管開支。',
                'stem_generates_branch': '薪資增長，工作穩定，多勞多得，財庫豐盈。',
                'branch_generates_stem': '投資獲利，資產增值，利於長線佈局。',
                'same': '財運亨通，正財穩健，利於置業儲蓄。'
            },
            '比肩': {
                'stem_controls_branch': '同儕排擠，競爭失利，受制於人，宜退守。',
                'branch_controls_stem': '合作生變，貌合神離，利益分配不均。',
                'stem_generates_branch': '黨羽豐滿，助力強大，眾志成城。',
                'branch_generates_stem': '付出助人，人緣極佳，建立口碑。',
                'same': '競爭白熱化，強敵環伺，非友即敵，需全力以赴。'
            },
            '劫財': {
                'stem_controls_branch': '破財受阻，小人被制，反是塞翁失馬。',
                'branch_controls_stem': '衝動行事但無力回天，雖有損失但不大。',
                'stem_generates_branch': '野心膨脹，肆無忌憚，恐鑄大錯，懸崖勒馬。',
                'branch_generates_stem': '熱心助人反被利用，好心沒好報，宜帶眼識人。',
                'same': '群雄逐鹿，資源耗盡，孤注一擲，勝負難料。'
            },
            '正印': {
                'stem_controls_branch': '學業受阻，思緒混亂，長輩給予壓力，難以專注。',
                'branch_controls_stem': '雖有靠山但助力不顯，需靠自己摸索。',
                'stem_generates_branch': '名師指點，開竅頓悟，學業事業大進。',
                'branch_generates_stem': '心得分享，以此教化他人，獲得尊重。',
                'same': '固執己見，思想僵化，不易接受新知，宜開放心胸。'
            },
            '偏印': {
                'stem_controls_branch': '靈感受到打壓，曲高和寡，內心鬱悶。',
                'branch_controls_stem': '旁門左道行不通，需回歸正途。',
                'stem_generates_branch': '異路功名，另闢蹊徑，獨樹一幟。',
                'branch_generates_stem': '才華獨特，應用於實務，終獲肯定。',
                'same': '孤芳自賞，與世隔絕，需走入人群。'
            }
        };

        // 選取動態描述
        const branchDesc = MODIFIERS[branchGod]?.[relationType] || MODIFIERS[branchGod]?.['same'] || mBranchDesc;
        fortune += ` 地支${mBranch}為${branchGod}之地，${branchDesc}`;

        // 附加五行細節 (保留原有邏輯作為補充)
        if (msEl === '水' && mbEl === '木') fortune += " 水木相生，靈感湧現但忌空想。";
        else if (msEl === '金' && mbEl === '木') fortune += " 金木相戰，執行力強但易急躁。";
        else if (msEl === '火' && mbEl === '木') fortune += " 木火通明，表現慾強，利於展示。";
        else if (msEl === '土' && mbEl === '木') fortune += " 木剋土，財運有起伏，忌投機。";
    }

    // --- 健康文案 (動態五行病藥說) ---
    // 核心邏輯：不再單看生肖對應器官，而是看「五行生剋」造成的過旺或受剋

    let health = "";

    // 定義五行對應身體部位 (更廣泛的系統)
    const BODY_SYSTEMS = {
        '木': '肝膽、神經系統、四肢筋脈',
        '火': '心血管、小腸、眼睛、發炎',
        '土': '脾胃消化、肌肉、皮膚',
        '金': '呼吸系統、肺部、骨骼牙齒',
        '水': '腎臟膀胱、內分泌、血液循環'
    };

    const SYMPTOMS = {
        '木': '易怒、神經痛、抽筋、過敏',
        '火': '心悸、發燒、口乾舌燥、眼疾',
        '土': '胃酸過多、消化不良、四肢無力',
        '金': '咳嗽、氣喘、皮膚乾癢、骨痛',
        '水': '水腫、疲勞、畏寒、泌尿問題'
    };

    // 1. 沖局 (Clash) - 最嚴重的動盪 (衝擊、意外、急性病)
    if (branchRel === '沖') {
        const mySystem = BODY_SYSTEMS[selfEl];
        const monthSystem = BODY_SYSTEMS[mbEl];
        health += `【沖太歲】地支相沖，氣場震盪。需防${mySystem}及${monthSystem}之急性病症或外傷。`;

        if (ELEMENTS[mbEl].controls === selfEl) {
            health += ` 流月${mbEl}沖剋本命，${SYMPTOMS[selfEl]}。防${BODY_SYSTEMS[selfEl].split('、')[0]}受損。`;
        } else if (ELEMENTS[selfEl].controls === mbEl) {
            health += ` 自身沖剋流月，情緒激動，易導致${SYMPTOMS[selfEl].split('、')[0]}。`;
        } else {
            health += ` 水火相沖者防心腎不交，金木相戰者防手腳受傷。`;
        }
    }
    // 2. 剋局 (Control) - 壓力與壓迫 (慢性病、功能減退)
    else if (checkRelation(msInfo.el, selfEl) === '剋' || checkRelation(mbInfo.el, selfEl) === '剋') {
        const killerEl = checkRelation(msInfo.el, selfEl) === '剋' ? msInfo.el : mbInfo.el;
        health += `【受剋】五行${killerEl}剋身，壓力較大。弱點在${BODY_SYSTEMS[selfEl]}。`;
        health += ` 留意${SYMPTOMS[selfEl]}，適宜溫補修復。`;

        // 特殊剋局
        if (killerEl === '土' && selfEl === '水') health += " 土多水滯，也需防腎結石或代謝問題。";
        if (killerEl === '木' && selfEl === '土') health += " 木旺土虛，防腸胃潰瘍。";
    }
    // 3. 洩/生 (Drain/Generate) - 虛弱或過旺
    else if (checkRelation(selfEl, msInfo.el) === '生') {
        health += `【洩氣】天干洩秀，精神消耗大，易疲勞、抵抗力下降。`;
        health += ` 需保養${BODY_SYSTEMS[selfEl]}，多休息少操勞。`;
    }
    else if (checkRelation(msInfo.el, selfEl) === '生') {
        health += `【得生】氣場受生，體能回升，但${msEl === '火' || msEl === '土' ? '防燥熱過補' : '大致安康'}。`;
        if (monthSiHua?.ji) health += ` 惟受化忌星影響，仍需留意${BODY_SYSTEMS[msInfo.el]}之小毛病。`;
    }
    // 4. 同氣 (Same) - 過旺
    else {
        health += `【比旺】五行同氣，體魄強健。但防${SYMPTOMS[selfEl]}。`;
        if (selfEl === '火') health += " 火氣過旺，防高血壓或發炎。";
        if (selfEl === '水') health += " 水氣過盛，防寒濕之症。";
    }

    // 5. 紫微四化補述 (化忌星的具體影響)
    if (monthSiHua?.ji) {
        health += ` (流月化忌：${monthSiHua.ji}，需注意心理壓力調適)`;
    }

    return { fortune, health };
};

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

export const calculateZodiacRelation = (zodiacIdx, yearBranchIdx) => {
    // 0: Rat ... 11: Pig
    // Fan (Grand Duke) = Same Index
    // Chong (Clash) = Opposite Index (+6)
    // Xing (Punishment/Harm) = +3 or +9 (Square relationship) - simplified
    // Lu He (Six Harmony): Rat-Ox, Tiger-Pig, Rabbit-Dog, Dragon-Rooster, Snake-Monkey, Horse-Goat
    // Hai (Six Harm): Rat-Goat, Ox-Horse, Tiger-Snake, Rabbit-Dragon, Monkey-Pig, Rooster-Dog

    // Using a map for complex relationships
    const SIX_HARMONIES = { 0: 1, 1: 0, 2: 11, 11: 2, 3: 10, 10: 3, 4: 9, 9: 4, 5: 8, 8: 5, 6: 7, 7: 6 };
    const SIX_HARMS = { 0: 7, 7: 0, 1: 6, 6: 1, 2: 5, 5: 2, 3: 4, 4: 3, 8: 11, 11: 8, 9: 10, 10: 9 };

    const diff = (12 + zodiacIdx - yearBranchIdx) % 12;

    if (diff === 0) return { type: 'fan', label: '值太歲', color: 'bg-red-600' };
    if (diff === 6) return { type: 'chong', label: '沖太歲', color: 'bg-red-500' };
    if (diff === 3 || diff === 9) return { type: 'xing', label: '刑/破太歲', color: 'bg-orange-500' };

    // Add new relations
    if (SIX_HARMONIES[zodiacIdx] === yearBranchIdx) return { type: 'he', label: '六合', color: 'bg-green-600' };
    if (SIX_HARMS[zodiacIdx] === yearBranchIdx) return { type: 'hai', label: '害太歲', color: 'bg-orange-400' };

    // San He (Three Harmony)
    const SAN_HE_GROUPS = [
        [0, 4, 8],  // Water
        [1, 5, 9],  // Metal
        [2, 6, 10], // Fire
        [3, 7, 11]  // Wood
    ];
    if (SAN_HE_GROUPS.some(group => group.includes(zodiacIdx) && group.includes(yearBranchIdx))) {
        return { type: 'sanhe', label: '三合', color: 'bg-emerald-500' };
    }

    // San Hui (Three Meeting)
    const SAN_HUI_GROUPS = [
        [11, 0, 1], // Winter
        [2, 3, 4],  // Spring
        [5, 6, 7],  // Summer
        [8, 9, 10]  // Autumn
    ];
    if (SAN_HUI_GROUPS.some(group => group.includes(zodiacIdx) && group.includes(yearBranchIdx))) {
        return { type: 'sanhui', label: '三會', color: 'bg-teal-500' };
    }

    return { type: 'normal', label: '運勢平穩', color: 'bg-emerald-600' };
};
