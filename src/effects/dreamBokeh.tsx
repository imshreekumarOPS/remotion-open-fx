import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { seededRandom } from '../utils/math';

export interface DreamBokehProps {
    /** Blur amount applied to the base content (px). */
    blurAmount?: number;
    /** Number of bokeh light particles. */
    particleCount?: number;
    /** Colors for the bokeh particles. */
    particleColors?: string[];
    /** Extra brightness boost (0–1). */
    brightness?: number;
    /** Warm tint intensity (0–1). */
    warmth?: number;
    /** Blur amount on bokeh particles. */
    particleBlur?: number;
    children?: React.ReactNode;
}

/**
 * Dream/Bokeh Overlay — Soft dreamy aesthetic with floating bokeh
 * light particles. Applies a subtle blur and warm tint to children
 * with luminous floating particles on top.
 *
 * @example
 * <DreamBokeh blurAmount={3} particleCount={20}>
 *   <AbsoluteFill><YourScene /></AbsoluteFill>
 * </DreamBokeh>
 */
export const DreamBokeh: React.FC<DreamBokehProps> = ({
    blurAmount = 2,
    particleCount = 18,
    particleColors = ['#FFE4B5', '#FFD700', '#FFA07A', '#F0E68C', '#FFDAB9'],
    brightness = 0.1,
    warmth = 0.15,
    particleBlur = 25,
    children,
}) => {
    const frame = useCurrentFrame();
    const { width, height } = useVideoConfig();

    const particles = Array.from({ length: particleCount }, (_, i) => {
        const seed = i * 53;
        const x = seededRandom(seed + 1) * width;
        const y = seededRandom(seed + 2) * height;
        const size = seededRandom(seed + 3) * 100 + 30;
        const color =
            particleColors[
            Math.floor(seededRandom(seed + 4) * particleColors.length)
            ];

        // Gentle float animation
        const driftX =
            Math.sin(frame * 0.012 + seededRandom(seed + 5) * 8) * 40;
        const driftY =
            Math.cos(frame * 0.009 + seededRandom(seed + 6) * 8) * 30;

        // Slow breathing opacity
        const breathe =
            0.5 +
            0.5 *
            Math.sin(
                frame * 0.02 + seededRandom(seed + 7) * Math.PI * 2,
            );
        const opacity = (seededRandom(seed + 8) * 0.25 + 0.1) * breathe;

        return (
            <div
                key={i}
                style={{
                    position: 'absolute',
                    left: x + driftX - size / 2,
                    top: y + driftY - size / 2,
                    width: size,
                    height: size,
                    borderRadius: '50%',
                    backgroundColor: color,
                    filter: `blur(${particleBlur}px)`,
                    opacity,
                    mixBlendMode: 'screen',
                    pointerEvents: 'none',
                }}
            />
        );
    });

    return (
        <div
            style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                overflow: 'hidden',
            }}
        >
            {/* Blurred + warm-tinted content */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    filter: `
                        blur(${blurAmount}px)
                        brightness(${1 + brightness})
                        saturate(${1 + warmth * 0.5})
                    `,
                }}
            >
                {children}
            </div>

            {/* Warm overlay tint */}
            {warmth > 0 && (
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundColor: `rgba(255, 200, 100, ${warmth * 0.15})`,
                        mixBlendMode: 'overlay',
                        pointerEvents: 'none',
                    }}
                />
            )}

            {/* Bokeh particles */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    pointerEvents: 'none',
                }}
            >
                {particles}
            </div>

            {/* Soft vignette for dreamy edges */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    pointerEvents: 'none',
                    background:
                        'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.3) 100%)',
                }}
            />
        </div>
    );
};
