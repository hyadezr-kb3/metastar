

export const getCenterStar = (y) => { let s = 0; y.toString().split('').forEach(d => s += parseInt(d)); while (s > 9) { let t = 0; s.toString().split('').forEach(d => t += parseInt(d)); s = t; } let c = 11 - s; if (c > 9) c -= 9; if (c <= 0) c += 9; return c; };

export const calculateGrid = (c) => [{ k: 'SE', s: (c + 8) % 9 || 9 }, { k: 'S', s: (c + 4) % 9 || 9 }, { k: 'SW', s: (c + 6) % 9 || 9 }, { k: 'E', s: (c + 7) % 9 || 9 }, { k: 'C', s: c }, { k: 'W', s: (c + 2) % 9 || 9 }, { k: 'NE', s: (c + 3) % 9 || 9 }, { k: 'N', s: (c + 5) % 9 || 9 }, { k: 'NW', s: (c + 1) % 9 || 9 }];

export const getAfflictions = (y) => {
    const b = (y - 1924) % 12;
    const t = { 0: 'N', 1: 'NE', 2: 'NE', 3: 'E', 4: 'SE', 5: 'SE', 6: 'S', 7: 'SW', 8: 'SW', 9: 'W', 10: 'NW', 11: 'NW' };
    const s = { 0: 'S', 1: 'SW', 2: 'SW', 3: 'W', 4: 'NW', 5: 'NW', 6: 'N', 7: 'NE', 8: 'NE', 9: 'E', 10: 'SE', 11: 'SE' };
    const ss = [0, 4, 8].includes(b) ? 'S' : [2, 6, 10].includes(b) ? 'N' : [3, 7, 11].includes(b) ? 'W' : 'E';
    return { taiSui: t[b], suiPo: s[b], sanSha: ss };
};
