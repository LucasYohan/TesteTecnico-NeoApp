export function markRareHqs(hqs) {
    const totalRaras = Math.ceil(hqs.length * 0.1);
    const indicesSorteados = new Set();

    while (indicesSorteados.size < totalRaras) {
        const randomIndex = Math.floor(Math.random() * hqs.length);
        indicesSorteados.add(randomIndex);
    }

    return hqs.map((hq, index) => ({
        ...hq,
        rare: indicesSorteados.has(index)
    }));
}

export const coupons = {
    COMUM5: { type: "common", discount: 0.05 },
    RARO10: { type: "rare", discount: 0.10 }
};
