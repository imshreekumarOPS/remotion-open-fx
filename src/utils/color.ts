export interface RGB {
    r: number;
    g: number;
    b: number;
}
export interface RGBA extends RGB {
    a: number;
}
export interface HSL {
    h: number;
    s: number;
    l: number;
}

/** Parse "#RRGGBB" to RGB */
export const hexToRgb = (hex: string): RGB => {
    const h = hex.replace('#', '');
    return {
        r: parseInt(h.slice(0, 2), 16),
        g: parseInt(h.slice(2, 4), 16),
        b: parseInt(h.slice(4, 6), 16),
    };
};

/** Convert RGB to CSS string */
export const rgbToCss = ({ r, g, b }: RGB, a = 1): string =>
    a < 1 ? `rgba(${r},${g},${b},${a})` : `rgb(${r},${g},${b})`;

/** Interpolate between two hex colors */
export const lerpColor = (
    colorA: string,
    colorB: string,
    t: number,
): string => {
    const a = hexToRgb(colorA);
    const b = hexToRgb(colorB);
    return rgbToCss({
        r: Math.round(a.r + (b.r - a.r) * t),
        g: Math.round(a.g + (b.g - a.g) * t),
        b: Math.round(a.b + (b.b - a.b) * t),
    });
};

/** Apply brightness adjustment to hex color */
export const brighten = (hex: string, amount: number): string => {
    const { r, g, b } = hexToRgb(hex);
    return rgbToCss({
        r: Math.min(255, Math.round(r * amount)),
        g: Math.min(255, Math.round(g * amount)),
        b: Math.min(255, Math.round(b * amount)),
    });
};

/** Create CSS rgba string from hex + opacity */
export const withOpacity = (hex: string, opacity: number): string => {
    const { r, g, b } = hexToRgb(hex);
    return `rgba(${r},${g},${b},${opacity})`;
};
