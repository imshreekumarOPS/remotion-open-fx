import React from 'react';
import { useCurrentFrame } from 'remotion';
import { seededRandom } from '../utils/math';

export interface VHSRetroProps {
    /** Overall intensity of the VHS effect (0–1). */
    intensity?: number;
    /** Opacity of the scanlines overlay (0–1). */
    scanlineOpacity?: number;
    /** Strength of the color bleed / chromatic offset. */
    colorBleed?: number;
    /** Whether to animate the noise grain. */
    animateGrain?: boolean;
    children?: React.ReactNode;
}

/**
 * VHS/Retro — Old-school grainy look with scan lines, color distortion,
 * and vertical jitter. Wraps children and applies the VHS filter over them.
 *
 * @example
 * <VHSRetro intensity={0.7}>
 *   <AbsoluteFill><YourScene /></AbsoluteFill>
 * </VHSRetro>
 */
export const VHSRetro: React.FC<VHSRetroProps> = ({
    intensity = 0.6,
    scanlineOpacity = 0.15,
    colorBleed = 3,
    animateGrain = true,
    children,
}) => {
    const frame = useCurrentFrame();
    const seed = animateGrain ? frame : 1;

    // Subtle vertical jitter
    const jitter = seededRandom(frame * 17) * intensity * 4 - intensity * 2;
    // Slight hue rotation for color bleed
    const hueShift = Math.sin(frame * 0.15) * 8 * intensity;
    // Brightness flicker
    const flicker = 1 + (seededRandom(frame * 31) - 0.5) * 0.06 * intensity;

    return (
        <div
            style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                overflow: 'hidden',
            }}
        >
            {/* Content with VHS color distortion */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    transform: `translateY(${jitter}px)`,
                    filter: `
                        hue-rotate(${hueShift}deg)
                        saturate(${1 + intensity * 0.4})
                        brightness(${flicker})
                        contrast(${1 + intensity * 0.15})
                    `,
                }}
            >
                {children}
            </div>

            {/* Chromatic aberration / color bleed */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    pointerEvents: 'none',
                    mixBlendMode: 'screen',
                    opacity: intensity * 0.35,
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        filter: `
                            drop-shadow(${colorBleed}px 0 0 rgba(255,0,0,0.5))
                            drop-shadow(${-colorBleed}px 0 0 rgba(0,255,255,0.5))
                        `,
                    }}
                />
            </div>

            {/* Film grain (SVG noise) */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    pointerEvents: 'none',
                    opacity: intensity * 0.6,
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
                    <filter id={`vhs-grain-${seed}`}>
                        <feTurbulence
                            type="fractalNoise"
                            baseFrequency="0.8"
                            numOctaves={4}
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
                        filter={`url(#vhs-grain-${seed})`}
                    />
                </svg>
            </div>

            {/* Scanlines */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    pointerEvents: 'none',
                    opacity: scanlineOpacity * intensity,
                    backgroundImage: `repeating-linear-gradient(
                        to bottom,
                        transparent 0px,
                        transparent 3px,
                        rgba(0,0,0,0.6) 3px,
                        rgba(0,0,0,0.6) 5px
                    )`,
                }}
            />

            {/* Occasional tracking glitch band */}
            {seededRandom(frame * 7) > 0.92 && (
                <div
                    style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: `${seededRandom(frame * 13) * 100}%`,
                        height: `${2 + seededRandom(frame * 19) * 6}%`,
                        backgroundColor: 'rgba(255,255,255,0.08)',
                        transform: `translateX(${(seededRandom(frame * 23) - 0.5) * 20}px)`,
                        pointerEvents: 'none',
                    }}
                />
            )}
        </div>
    );
};
