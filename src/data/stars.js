export const PALACES = [
    { key: 'SE', name: '東南', trigram: '巽', element: '木' },
    { key: 'S', name: '正南', trigram: '離', element: '火' },
    { key: 'SW', name: '西南', trigram: '坤', element: '土' },
    { key: 'E', name: '正東', trigram: '震', element: '木' },
    { key: 'C', name: '中宮', trigram: '中', element: '土' },
    { key: 'W', name: '正西', trigram: '兌', element: '金' },
    { key: 'NE', name: '東北', trigram: '艮', element: '土' },
    { key: 'N', name: '正北', trigram: '坎', element: '水' },
    { key: 'NW', name: '西北', trigram: '乾', element: '金' }
];

export const STARS_INFO = {
    1: {
        name: '一白貪狼', element: '水', type: '吉',
        luckText: '小吉',
        relationText: '水入土宮(中宮屬土)，土剋水。星受宮剋，力量受阻，需用「金」來通關生旺。',
        symbolism: '人緣、桃花、智慧、未來財運。',
        layout: '宜放金屬擺設(如金元寶、銅葫蘆)、一杯清水、水種植物。',
        taboo: '忌放紅色物品、長明燈(火耗水)、黃色地毯(土剋水)。',
        colorLike: '金色/銀色 (金生水)、藍色/黑色/灰色 (水助旺)',
        colorDislike: '黃色/啡色 (土剋水)、紅色/紫色 (火耗水)'
    },
    2: {
        name: '二黑巨門', element: '土', type: '凶',
        luckText: '凶 (病符星)',
        relationText: '土入金宮，土生金。宮位洩去部分土氣，凶性稍減，但仍需化解。',
        symbolism: '疾病、婦科病、腸胃病、精神不振。',
        layout: '宜放銅葫蘆、六帝錢、金屬音樂盒、圓形金屬擺設 (金泄土氣)。',
        taboo: '忌放紅地毯、紅燈(火生土)、黃色物品(土助煞)、魚缸(引發病氣)。',
        colorLike: '白色/金色/銅色 (金泄土氣)',
        colorDislike: '紅色/紫色 (火生病星)、黃色/啡色 (土助病星)'
    },
    3: {
        name: '三碧祿存', element: '木', type: '凶',
        luckText: '凶 (是非星)',
        relationText: '木入金宮，金剋木。金木相戰，加劇爭鬥與受傷風險。',
        symbolism: '官非、爭執、吵架、手腳受傷、情緒躁動。',
        layout: '宜放紅色長明燈、紅色地毯、粉紅色物品 (以火泄木氣)。',
        taboo: '忌放水種植物、魚缸(水生木)、風鈴(金木交戰聲)。',
        colorLike: '紅色/粉紅/紫色 (火泄木氣)',
        colorDislike: '綠色/青色 (木助煞)、藍色/黑色 (水生木)'
    },
    4: {
        name: '四綠文曲', element: '木', type: '吉',
        luckText: '吉 (文昌星)',
        relationText: '木入土宮，木剋土。星強宮弱，文昌力量尚可，宜用水養木。',
        symbolism: '學業考試、文職升遷、創意靈感、人緣。',
        layout: '宜放四枝水種富貴竹、綠色文昌塔、毛筆架。',
        taboo: '忌放金屬物品(金剋木)、紅色物品(火洩木氣)。',
        colorLike: '綠色/青色 (木助旺)、藍色/黑色 (水生木)',
        colorDislike: '白色/金色 (金剋木)、紅色/紫色 (火洩木)'
    },
    5: {
        name: '五黃廉貞', element: '土', type: '大凶',
        luckText: '大凶 (太歲位/災星)',
        relationText: '土入火宮，火生土。火氣生旺災星，加上是「太歲位」，凶性極大，絕對不可動土。',
        symbolism: '嚴重疾病、血光之災、意外、破產。',
        layout: '必須放六層銅製風鈴、銅鑼、六帝錢、安忍水 (以重金屬聲音化泄土氣)。',
        taboo: '忌放紅地毯、紅燈(火生土)、陶瓷石頭(土助煞)、植物(木剋土激發凶性)。',
        colorLike: '白色/金色/銀色/銅色 (金泄土氣)',
        colorDislike: '紅色/紫色 (火生旺災星)、黃色/啡色 (土助煞)、綠色 (木剋土)'
    },
    6: {
        name: '六白武曲', element: '金', type: '吉',
        luckText: '吉 (偏財/驛馬)',
        relationText: '金入水宮，金生水。星生宮，吉氣被洩，需用「土」或「金」來補充。',
        symbolism: '橫財、技術行業、武職、升遷、遠行。',
        layout: '宜放黃色地毯、八粒鵝卵石(土生金)、金屬貔貅/金蟾。',
        taboo: '忌放紅色物品(火剋金)、過多植物(木耗金)。',
        colorLike: '黃色/啡色 (土生金)、金色/白色 (金助旺)',
        colorDislike: '紅色/紫色 (火剋金)、藍色/黑色 (水洩金)'
    },
    7: {
        name: '七赤破軍', element: '金', type: '凶',
        luckText: '凶 (退氣/賊星)',
        relationText: '金入土宮，土生金。宮生星，助長破軍星的肅殺之氣。',
        symbolism: '失竊、詐騙、口舌是非、呼吸系統疾病。',
        layout: '宜放一杯清水(水泄金氣)、藍色地毯、黑曜石擺件。',
        taboo: '忌放金屬利器(剪刀、刀劍)、陶瓷、黃色物品(土生金)。',
        colorLike: '藍色/黑色 (水泄金氣)',
        colorDislike: '黃色/啡色 (土生金)、白色/金色 (金助煞)'
    },
    8: {
        name: '八白左輔', element: '土', type: '吉',
        luckText: '平/吉 (退氣財星)',
        relationText: '土入木宮，木剋土。吉星受剋，財氣減弱，需用「火」通關(木生火生土)。',
        symbolism: '正財、工作薪金、穩定收入(雖退氣仍屬吉星)。',
        layout: '宜放紅色中國結、紅地毯、紅色擺設 (以火通關)。',
        taboo: '忌放大量植物(木剋土)、金屬物品(洩土氣)。',
        colorLike: '紅色/紫色 (火生土)、黃色/啡色 (土助旺)',
        colorDislike: '綠色/青色 (木剋土)、白色/金色 (金洩土)'
    },
    9: {
        name: '九紫右弼', element: '火', type: '大吉',
        luckText: '大吉 (當旺財星)',
        relationText: '火入木宮，木生火。宮生星，吉星力量倍增，全屋最旺方位。',
        symbolism: '喜慶、嫁娶、置業、升職、正財。',
        layout: '宜放九枝去刺紅玫瑰、紅色聚寶盆、長明燈、紅色地毯。',
        taboo: '忌放魚缸、流水擺設(水剋火)、雜物、大葉植物(雖木生火，但泥土過多會洩火氣，水種較佳)。',
        colorLike: '紅色/紫色/粉紅 (火助旺)、綠色/青色 (木生火)',
        colorDislike: '藍色/黑色 (水剋火)、黃色/啡色 (土洩火)'
    },
};

export const ANNUAL_STARS_MAP = [
    { name: '太歲', stars: ['太歲', '劍鋒', '伏屍'], type: 'bad' },
    { name: '太陽', stars: ['太陽', '天空', '咸池'], type: 'good' },
    { name: '喪門', stars: ['喪門', '地喪', '地雌'], type: 'bad' },
    { name: '太陰', stars: ['太陰', '勾絞', '貫索'], type: 'mix' },
    { name: '五鬼', stars: ['五鬼', '官符', '三台'], type: 'bad' },
    { name: '死符', stars: ['死符', '小耗', '月德'], type: 'bad' },
    { name: '歲破', stars: ['歲破', '大耗', '欄干'], type: 'bad' },
    { name: '龍德', stars: ['龍德', '紫微', '暴敗'], type: 'good' },
    { name: '白虎', stars: ['白虎', '天雄', '地煞'], type: 'bad' },
    { name: '福德', stars: ['福德', '天德', '卷舌'], type: 'good' },
    { name: '天狗', stars: ['天狗', '吊客', '八座'], type: 'bad' },
    { name: '病符', stars: ['病符', '陌越', '六害'], type: 'bad' }
];
