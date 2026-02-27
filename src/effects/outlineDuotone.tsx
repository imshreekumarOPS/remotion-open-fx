import React from 'react';
import { useCurrentFrame } from 'remotion';

export type DuotoneMode = 'duotone' | 'outline';

export interface OutlineDuotoneProps {
    /** Light / highlight color. */
    colorLight?: string;
    /** Dark / shadow color. */
    colorDark?: string;
    /** Effect mode: 'duotone' for two-color grade, 'outline' for high-contrast edges. */
    mode?: DuotoneMode;
    /** Effect intensity (0–1). */
    intensity?: number;
    /** Animate a subtle color shift. */
    animate?: boolean;
    /** Animation speed. */
    animationSpeed?: number;
    children?: React.ReactNode;
}

/**
 * Converts a hex color like '#ff6b6b' to { r, g, b } in 0–1 range.
 */
const hexToNormalized = (hex: string): { r: number; g: number; b: number } => {
    const clean = hex.replace('#', '');
    const r = parseInt(clean.slice(0, 2), 16) / 255;
    const g = parseInt(clean.slice(2, 4), 16) / 255;
    const b = parseInt(clean.slice(4, 6), 16) / 255;
    return { r, g, b };
};

/**
 * Outline/Duotone — Two-color stylized look, very trendy in art/fashion content.
 *
 * - **duotone** mode maps shadows to `colorDark` and highlights to `colorLight`.
 * - **outline** mode creates a high-contrast posterized edge effect.
 *
 * @example
 * <OutlineDuotone colorLight="#ff6b6b" colorDark="#2d1b69" mode="duotone">
 *   <AbsoluteFill><YourScene /></AbsoluteFill>
 * </OutlineDuotone>
 */
export const OutlineDuotone: React.FC<OutlineDuotoneProps> = ({
    colorLight = '#ff6b6b',
    colorDark = '#2d1b69',
    mode = 'duotone',
    intensity = 1,
    animate = false,
    animationSpeed = 0.02,
    children,
}) => {
    const frame = useCurrentFrame();

    // Optional subtle hue animation
    const hueShift = animate ? Math.sin(frame * animationSpeed) * 15 : 0;

    const light = hexToNormalized(colorLight);
    const dark = hexToNormalized(colorDark);

    const filterId = `duotone-${mode}-${frame}`;

    if (mode === 'duotone') {
        // Duotone: grayscale → feComponentTransfer to map to two colors
        // Using feColorMatrix to convert to grayscale, then feComponentTransfer
        // to remap the luminance channel to our two colors.
        const rSlope = light.r - dark.r;
        const gSlope = light.g - dark.g;
        const bSlope = light.b - dark.b;

        return (
            <div
                style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        filter: `url(#${filterId}) hue-rotate(${hueShift}deg)`,
                        opacity: intensity,
                    }}
                >
                    {children}
                </div>

                {/* Original behind at reduced opacity for blending */}
                {intensity < 1 && (
                    <div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            opacity: 1 - intensity,
                            zIndex: -1,
                        }}
                    >
                        {children}
                    </div>
                )}

                <svg
                    style={{
                        position: 'absolute',
                        width: 0,
                        height: 0,
                        pointerEvents: 'none',
                    }}
                >
                    <defs>
                        <filter id={filterId}>
                            {/* Convert to grayscale */}
                            <feColorMatrix
                                type="matrix"
                                values="0.33 0.33 0.33 0 0
                                        0.33 0.33 0.33 0 0
                                        0.33 0.33 0.33 0 0
                                        0    0    0    1 0"
                            />
                            {/* Map grayscale to duotone colors */}
                            <feComponentTransfer>
                                <feFuncR
                                    type="linear"
                                    slope={rSlope}
                                    intercept={dark.r}
                                />
                                <feFuncG
                                    type="linear"
                                    slope={gSlope}
                                    intercept={dark.g}
                                />
                                <feFuncB
                                    type="linear"
                                    slope={bSlope}
                                    intercept={dark.b}
                                />
                            </feComponentTransfer>
                        </filter>
                    </defs>
                </svg>
            </div>
        );
    }

    // Outline mode: high contrast + edge detection look
    return (
        <div
            style={{
                position: 'relative',
                width: '100%',
                height: '100%',
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    filter: `
                        grayscale(1)
                        contrast(${2 + intensity * 3})
                        brightness(${1 + intensity * 0.5})
                        hue-rotate(${hueShift}deg)
                    `,
                    mixBlendMode: 'normal',
                }}
            >
                {children}
            </div>

            {/* Color tint overlay */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    pointerEvents: 'none',
                    background: `linear-gradient(135deg, ${colorDark}aa, ${colorLight}aa)`,
                    mixBlendMode: 'color',
                    opacity: intensity,
                }}
            />
        </div>
    );
};
