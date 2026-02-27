/** Clamp a value between min and max */
export const clamp = (value: number, min: number, max: number): number =>
    Math.min(Math.max(value, min), max);

/** Remap a value from one range to another */
export const remap = (
    value: number,
    inMin: number,
    inMax: number,
    outMin: number,
    outMax: number,
): number => outMin + ((value - inMin) / (inMax - inMin)) * (outMax - outMin);

/** Linear interpolation between a and b */
export const lerp = (a: number, b: number, t: number): number =>
    a + (b - a) * t;

/** Smooth step — S-curve blend */
export const smoothstep = (
    edge0: number,
    edge1: number,
    x: number,
): number => {
    const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
    return t * t * (3 - 2 * t);
};

/** Convert degrees to radians */
export const degToRad = (deg: number): number => (deg * Math.PI) / 180;

/** Round to N decimal places */
export const round = (value: number, decimals = 2): number =>
    Math.round(value * 10 ** decimals) / 10 ** decimals;

/** Generate a pseudo-random number seeded by a value (deterministic) */
export const seededRandom = (seed: number): number => {
    const x = Math.sin(seed + 1) * 10000;
    return x - Math.floor(x);
};

/** Value noise — smooth random, great for organic motion */
export const valueNoise = (
    t: number,
    octaves = 1,
    seed = 0,
): number => {
    let result = 0,
        amplitude = 1,
        frequency = 1,
        maxAmp = 0;
    for (let i = 0; i < octaves; i++) {
        const ti = t * frequency + seed + i * 100;
        const fl = Math.floor(ti);
        const fr = ti - fl;
        const a = seededRandom(fl);
        const b = seededRandom(fl + 1);
        const smooth = fr * fr * (3 - 2 * fr);
        result += (a + (b - a) * smooth) * amplitude;
        maxAmp += amplitude;
        amplitude *= 0.5;
        frequency *= 2;
    }
    return result / maxAmp;
};
