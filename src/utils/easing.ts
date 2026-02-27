export type EasingFn = (t: number) => number;

// ─── Polynomial ─────────────────────────────────────────────────────────────
export const linear: EasingFn = (t) => t;

export const easeInQuad: EasingFn = (t) => t * t;
export const easeOutQuad: EasingFn = (t) => t * (2 - t);
export const easeInOutQuad: EasingFn = (t) =>
    t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

export const easeInCubic: EasingFn = (t) => t * t * t;
export const easeOutCubic: EasingFn = (t) => --t * t * t + 1;
export const easeInOutCubic: EasingFn = (t) =>
    t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

export const easeInQuart: EasingFn = (t) => t * t * t * t;
export const easeOutQuart: EasingFn = (t) => 1 - --t * t * t * t;
export const easeInOutQuart: EasingFn = (t) =>
    t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;

export const easeInQuint: EasingFn = (t) => t * t * t * t * t;
export const easeOutQuint: EasingFn = (t) => 1 + --t * t * t * t * t;
export const easeInOutQuint: EasingFn = (t) =>
    t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;

// ─── Sinusoidal ─────────────────────────────────────────────────────────────
export const easeInSine: EasingFn = (t) => 1 - Math.cos((t * Math.PI) / 2);
export const easeOutSine: EasingFn = (t) => Math.sin((t * Math.PI) / 2);
export const easeInOutSine: EasingFn = (t) =>
    -(Math.cos(Math.PI * t) - 1) / 2;

// ─── Exponential ────────────────────────────────────────────────────────────
export const easeInExpo: EasingFn = (t) =>
    t === 0 ? 0 : Math.pow(2, 10 * t - 10);
export const easeOutExpo: EasingFn = (t) =>
    t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
export const easeInOutExpo: EasingFn = (t) =>
    t === 0
        ? 0
        : t === 1
            ? 1
            : t < 0.5
                ? Math.pow(2, 20 * t - 10) / 2
                : (2 - Math.pow(2, -20 * t + 10)) / 2;

// ─── Circular ───────────────────────────────────────────────────────────────
export const easeInCirc: EasingFn = (t) => 1 - Math.sqrt(1 - t * t);
export const easeOutCirc: EasingFn = (t) => Math.sqrt(1 - --t * t);
export const easeInOutCirc: EasingFn = (t) =>
    t < 0.5
        ? (1 - Math.sqrt(1 - 4 * t * t)) / 2
        : (Math.sqrt(1 - (-2 * t + 2) ** 2) + 1) / 2;

// ─── Elastic ────────────────────────────────────────────────────────────────
const c4 = (2 * Math.PI) / 3;
const c5 = (2 * Math.PI) / 4.5;

export const easeInElastic: EasingFn = (t) =>
    t === 0
        ? 0
        : t === 1
            ? 1
            : -Math.pow(2, 10 * t - 10) * Math.sin((t * 10 - 10.75) * c4);

export const easeOutElastic: EasingFn = (t) =>
    t === 0
        ? 0
        : t === 1
            ? 1
            : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;

export const easeInOutElastic: EasingFn = (t) =>
    t === 0
        ? 0
        : t === 1
            ? 1
            : t < 0.5
                ? -(
                    Math.pow(2, 20 * t - 10) * Math.sin((20 * t - 11.125) * c5)
                ) / 2
                : (Math.pow(2, -20 * t + 10) * Math.sin((20 * t - 11.125) * c5)) /
                2 +
                1;

// ─── Back (Overshoot) ───────────────────────────────────────────────────────
const c1 = 1.70158,
    c2 = c1 * 1.525,
    c3 = c1 + 1;

export const easeInBack: EasingFn = (t) => c3 * t * t * t - c1 * t * t;
export const easeOutBack: EasingFn = (t) =>
    1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
export const easeInOutBack: EasingFn = (t) =>
    t < 0.5
        ? (Math.pow(2 * t, 2) * ((c2 + 1) * 2 * t - c2)) / 2
        : (Math.pow(2 * t - 2, 2) * ((c2 + 1) * (t * 2 - 2) + c2) + 2) / 2;

// ─── Bounce ─────────────────────────────────────────────────────────────────
export const easeOutBounce: EasingFn = (t) => {
    const n1 = 7.5625,
        d1 = 2.75;
    if (t < 1 / d1) return n1 * t * t;
    if (t < 2 / d1) return n1 * (t -= 1.5 / d1) * t + 0.75;
    if (t < 2.5 / d1) return n1 * (t -= 2.25 / d1) * t + 0.9375;
    return n1 * (t -= 2.625 / d1) * t + 0.984375;
};

export const easeInBounce: EasingFn = (t) => 1 - easeOutBounce(1 - t);
export const easeInOutBounce: EasingFn = (t) =>
    t < 0.5
        ? (1 - easeOutBounce(1 - 2 * t)) / 2
        : (1 + easeOutBounce(2 * t - 1)) / 2;

// ─── Special FX Easings ─────────────────────────────────────────────────────

/** Snap — overshoot then snap back. Great for UI pop-ins */
export const snap: EasingFn = (t) => {
    const s = 1.70158;
    return t * t * ((s + 1) * t - s);
};

/** Punch — quick hit and settle. Great for impact frames */
export const punch: EasingFn = (t) =>
    Math.pow(2, -10 * t) * Math.sin((t - 0.1) * 5 * Math.PI) + 1;

/** Wobble — oscillates several times before settling */
export const wobble: EasingFn = (t) =>
    Math.pow(2, -8 * t) * Math.sin(((t - 0.375) / 0.45) * Math.PI * 2) + 1;

/** Steps — discrete film-strip style jumps */
export const steps =
    (count: number): EasingFn =>
        (t) =>
            Math.min(Math.floor(t * count) / count, 1);

/** Cubic Bezier approximation — matches CSS cubic-bezier() */
export const cubicBezier = (
    x1: number,
    y1: number,
    x2: number,
    y2: number,
): EasingFn => {
    return (t: number) => {
        const cx = 3 * x1,
            bx = 3 * (x2 - x1) - cx,
            ax = 1 - cx - bx;
        const cy = 3 * y1,
            by = 3 * (y2 - y1) - cy,
            ay = 1 - cy - by;
        const sampleX = (tt: number) => ((ax * tt + bx) * tt + cx) * tt;
        const sampleSlope = (tt: number) => (3 * ax * tt + 2 * bx) * tt + cx;
        let tt = t;
        for (let i = 0; i < 8; i++) {
            const x = sampleX(tt) - t;
            if (Math.abs(x) < 1e-5) break;
            const slope = sampleSlope(tt);
            if (Math.abs(slope) < 1e-5) break;
            tt -= x / slope;
        }
        return ((ay * tt + by) * tt + cy) * tt;
    };
};

// Preset CSS curves
export const cssEase = cubicBezier(0.25, 0.1, 0.25, 1.0);
export const cssEaseIn = cubicBezier(0.42, 0.0, 1.0, 1.0);
export const cssEaseOut = cubicBezier(0.0, 0.0, 0.58, 1.0);
export const cssEaseInOut = cubicBezier(0.42, 0.0, 0.58, 1.0);

// ─── Easing Composers ───────────────────────────────────────────────────────

/** Reverse an easing: what was the end is now the start */
export const reverse =
    (fn: EasingFn): EasingFn =>
        (t) =>
            fn(1 - t);

/** Mirror: ease in for first half, ease out for second half */
export const mirror =
    (fn: EasingFn): EasingFn =>
        (t) =>
            t < 0.5 ? fn(t * 2) / 2 : 1 - fn((1 - t) * 2) / 2;

/** Chain: use easing `a` for first half, `b` for second */
export const chain =
    (a: EasingFn, b: EasingFn): EasingFn =>
        (t) =>
            t < 0.5 ? a(t * 2) / 2 : 0.5 + b((t - 0.5) * 2) / 2;

// ─── Named Export Namespace ─────────────────────────────────────────────────
export const Easing = {
    linear,
    easeInQuad,
    easeOutQuad,
    easeInOutQuad,
    easeInCubic,
    easeOutCubic,
    easeInOutCubic,
    easeInQuart,
    easeOutQuart,
    easeInOutQuart,
    easeInQuint,
    easeOutQuint,
    easeInOutQuint,
    easeInSine,
    easeOutSine,
    easeInOutSine,
    easeInExpo,
    easeOutExpo,
    easeInOutExpo,
    easeInCirc,
    easeOutCirc,
    easeInOutCirc,
    easeInElastic,
    easeOutElastic,
    easeInOutElastic,
    easeInBack,
    easeOutBack,
    easeInOutBack,
    easeInBounce,
    easeOutBounce,
    easeInOutBounce,
    snap,
    punch,
    wobble,
    steps,
    cubicBezier,
    cssEase,
    cssEaseIn,
    cssEaseOut,
    cssEaseInOut,
    reverse,
    mirror,
    chain,
};
