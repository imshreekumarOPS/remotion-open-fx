import React from 'react';
import { useCurrentFrame } from 'remotion';

/**
 * Film Grain — animated noise grain over your scene.
 * Uses SVG feTurbulence for authentic grain.
 *
 * @example
 * <AbsoluteFill>
 *   <YourScene />
 *   <FilmGrain intensity={0.08} />
 * </AbsoluteFill>
 */
export const FilmGrain: React.FC<{
    intensity?: number;
    animate?: boolean;
}> = ({ intensity = 0.06, animate = true }) => {
    const frame = useCurrentFrame();
    const seed = animate ? frame : 1;

    return (
        <div
            style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                opacity: intensity * 10,
            }}
        >
            <svg
                style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                }}
            >
                <filter id={`grain-${seed}`}>
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.65"
                        numOctaves={3}
                        seed={seed}
                        stitchTiles="stitch"
                        result="noise"
                    />
                    <feColorMatrix
                        type="saturate"
                        values="0"
                        in="noise"
                        result="gray"
                    />
                    <feBlend in="SourceGraphic" in2="gray" mode="overlay" />
                </filter>
                <rect
                    width="100%"
                    height="100%"
                    filter={`url(#grain-${seed})`}
                />
            </svg>
        </div>
    );
};

/**
 * VHS Scanlines — horizontal scan lines for retro/lo-fi aesthetic.
 */
export const Scanlines: React.FC<{
    opacity?: number;
    lineHeight?: number;
    gap?: number;
    color?: string;
}> = ({
    opacity = 0.15,
    lineHeight = 2,
    gap = 4,
    color = '0,0,0',
}) => (
        <div
            style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                opacity,
                backgroundImage: `repeating-linear-gradient(
        to bottom,
        transparent 0px,
        transparent ${gap}px,
        rgba(${color},0.8) ${gap}px,
        rgba(${color},0.8) ${gap + lineHeight}px
      )`,
            }}
        />
    );

/**
 * Chromatic Aberration — RGB channel offset for glitch/lo-fi look.
 */
export const ChromaticAberration: React.FC<{
    intensity?: number;
    animate?: boolean;
}> = ({ intensity = 3, animate = false }) => {
    const frame = useCurrentFrame();
    const shift = animate
        ? intensity * Math.sin(frame * 0.2)
        : intensity;

    return (
        <div
            style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                mixBlendMode: 'screen',
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    filter: `drop-shadow(${shift}px 0 0 rgba(255,0,0,0.5))
                 drop-shadow(${-shift}px 0 0 rgba(0,255,255,0.5))`,
                }}
            />
        </div>
    );
};

/**
 * Color Burn/Dodge vignette — dynamic exposure vignette.
 */
export const ExposureVignette: React.FC<{
    intensity?: number;
    mode?: 'darken' | 'lighten';
}> = ({ intensity = 0.6, mode = 'darken' }) => (
    <div
        style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background:
                mode === 'darken'
                    ? `radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,${intensity}) 100%)`
                    : `radial-gradient(ellipse at center, rgba(255,255,255,${intensity}) 0%, transparent 60%)`,
        }}
    />
);
