import React from 'react';
import { Compass, Home } from 'lucide-react';
import { analyzeRelation, getColorAdvice } from '../utils/engine';

const DetailView = ({ year, selectedCell, roomAssignments }) => {
    if (!selectedCell) return <div className="p-6 text-center text-stone-400 bg-stone-100 rounded-xl mt-4"><Compass size={32} className="mx-auto mb-2 opacity-50" /><p>點擊九宮格查看詳情</p></div>;

    const { p, s, k } = selectedCell;
    const room = roomAssignments[k];

    // Future Years (2027-2030) - Show limited info
    if (year && year > 2026) {
        // 顏色定義 for Header
        const palaceHeaderBgMap = { '金': 'bg-gray-100', '木': 'bg-green-50', '水': 'bg-blue-50', '火': 'bg-red-50', '土': 'bg-amber-50' };
        const starBadgeBgMap = { '金': 'bg-yellow-600', '木': 'bg-green-700', '水': 'bg-blue-600', '火': 'bg-red-600', '土': 'bg-amber-700' };

        return (
            <div className="bg-white rounded-xl shadow-lg border-t-4 border-stone-300 mt-4 overflow-hidden animation-fade-in">
                <div className={`${palaceHeaderBgMap[p.element]} p-3 border-b flex justify-between items-center`}>
                    <div className="flex items-center gap-2">
                        <h3 className="font-bold text-lg text-stone-800 flex items-center gap-2">
                            <span>{p.name}・{p.trigram}({p.element})</span>
                            <span className={`px-2 py-0.5 rounded text-sm text-white ${starBadgeBgMap[s.element]}`}>{s.name}({s.element})</span>
                        </h3>
                        {room && room !== '(未選擇)' && <span className="text-sm font-bold text-stone-700">({room})</span>}
                    </div>
                </div>
                <div className="p-8 text-center text-stone-500 font-bold">
                    詳情稍後更新
                </div>
            </div>
        );
    }

    // 宮星關係
    const relation = analyzeRelation(s.element, p.element);

    // 動態吉凶判斷 (Legacy logic kept for safety, but primary is new text)
    // 優先使用新版數據
    // 動態吉凶判斷
    const luckText = s.luckText || '未知';

    // 吉凶顏色
    let luckColor = 'bg-stone-600 text-white';
    if (luckText.includes('大吉')) luckColor = 'bg-red-600 text-white';
    else if (luckText.includes('小吉') || luckText.includes('吉')) luckColor = 'bg-pink-500 text-white';
    else if (luckText.includes('大凶')) luckColor = 'bg-black text-white';
    else if (luckText.includes('凶')) luckColor = 'bg-stone-500 text-white';

    // 內容字段 (優先使用 new fields)
    const relationContent = s.relationText || relation.interaction; // Fallback
    const relationSub = s.relationText ? '' : relation.explanation;

    const symbolContent = s.symbolism || s.desc;
    const layoutContent = s.layout || s.cure; // Mapped 'cure' to 'layout'concept
    const tabooContent = s.taboo || s.avoid;

    const likeContent = s.colorLike || '';
    const dislikeContent = s.colorDislike || '';

    // 顏色定義 for Header (Keep existing)
    const palaceHeaderBgMap = { '金': 'bg-gray-100', '木': 'bg-green-50', '水': 'bg-blue-50', '火': 'bg-red-50', '土': 'bg-amber-50' };
    const starBadgeBgMap = { '金': 'bg-yellow-600', '木': 'bg-green-700', '水': 'bg-blue-600', '火': 'bg-red-600', '土': 'bg-amber-700' };

    return (
        <div className="bg-white rounded-xl shadow-lg border-t-4 border-amber-700 mt-4 overflow-hidden animation-fade-in">
            <div className={`${palaceHeaderBgMap[p.element]} p-3 border-b flex justify-between items-center`}>
                <div className="flex items-center gap-2">
                    <h3 className="font-bold text-lg text-stone-800 flex items-center gap-2">
                        <span>{p.name}・{p.trigram}({p.element})</span>
                        <span className={`px-2 py-0.5 rounded text-sm text-white ${starBadgeBgMap[s.element]}`}>{s.name}({s.element})</span>
                    </h3>
                    {room && room !== '(未選擇)' && <span className="text-sm font-bold text-stone-700">({room})</span>}
                </div>
                <span className={`text-sm font-bold px-3 py-1 rounded ${luckColor}`}>{luckText}</span>
            </div>
            <div className="p-4 space-y-3 text-sm">
                <div className="flex gap-2"><div className="w-20 font-bold text-stone-600 text-right">宮星關係：</div><div className="flex-1 text-stone-800 font-bold">{relationContent}{relationSub && <span className="block text-xs font-normal text-stone-500">{relationSub}</span>}</div></div>
                <div className="flex gap-2"><div className="w-20 font-bold text-stone-600 text-right">象徵：</div><div className="flex-1 text-stone-800">{symbolContent}</div></div>
                <div className="flex gap-2"><div className="w-20 font-bold text-stone-600 text-right">佈局：</div><div className="flex-1 text-stone-800">{layoutContent}</div></div>
                <div className="flex gap-2"><div className="w-20 font-bold text-stone-600 text-right">忌放：</div><div className="flex-1 text-stone-800">{tabooContent}</div></div>

                {/* Updated to Emojis */}
                <div className="flex gap-2 items-center pt-1 border-t border-stone-100 mt-1">
                    <div className="flex-1 flex items-center gap-2 bg-green-50 px-3 py-2 rounded-lg">
                        <span role="img" aria-label="lucky" className="text-lg">👍</span>
                        <span className="font-bold text-stone-700">{likeContent}</span>
                    </div>
                </div>
                <div className="flex gap-2 items-center">
                    <div className="flex-1 flex items-center gap-2 bg-red-50 px-3 py-2 rounded-lg">
                        <span role="img" aria-label="avoid" className="text-lg">👎</span>
                        <span className="font-bold text-stone-700">{dislikeContent}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailView;
