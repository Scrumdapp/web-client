function hexToRgb(hex: string): [number, number, number] {
    const sanitized = hex.replace("#", "");
    const bigint = parseInt(sanitized, 16);
    return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
}

function lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t;
}

export function interpolateColor(t: number, from: string, to: string): string {
    const clampedT = Math.min(1, Math.max(0, t));
    const [r1, g1, b1] = hexToRgb(from);
    const [r2, g2, b2] = hexToRgb(to);
    const r = Math.round(lerp(r1, r2, clampedT));
    const g = Math.round(lerp(g1, g2, clampedT));
    const b = Math.round(lerp(b1, b2, clampedT));
    return `rgb(${r}, ${g}, ${b})`;
}