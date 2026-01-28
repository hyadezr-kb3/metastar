import { Lunar } from 'lunar-javascript';

const d = Lunar.fromDate(new Date());

console.log("Testing API...");

try {
    console.log("getPrevJieQi:", d.getPrevJieQi(true)?.getName());
} catch (e) {
    console.log("getPrevJieQi Error:", e.message);
}

try {
    console.log("getTimeSha:", d.getTimeSha());
} catch (e) {
    console.log("getTimeSha Error:", e.message);
}

try {
    const h = Lunar.fromDate(new Date());
    console.log("getTimePositionCai:", h.getTimePositionCai());
} catch (e) {
    console.log("getTimePositionCai Error:", e.message);
}
