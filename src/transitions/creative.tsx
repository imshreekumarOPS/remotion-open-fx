import React, { CSSProperties } from 'react';
import { useCurrentFrame } from 'remotion';
import { interp } from '../utils/interpolate';
import { seededRandom } from '../utils/math';
import { easeInOutCubic } from '../utils/easing';
import type { EasingFn } from '../utils/easing';

export interface TransitionStyles {
    outStyle: CSSProperties;
    inStyle: CSSProperties;
}
export interface TransitionOptions {
    frame: number;
    startFrame: number;
    durationFrames?: number;
    easing?: EasingFn;
}

/** RGB Split Glitch — chromatic aberration channel split */
export const rgbSplitTransition = ({
    frame,
    startFrame,
    durationFrames = 20,
}: TransitionOptions): CSSProperties => {
    const p = interp(frame, [startFrame, startFrame + durationFrames], [0, 1]);
    const splitPeak = Math.sin(p * Math.PI) * 20;
    return {
        filter: `
      drop-shadow(${splitPeak}px 0px 0px rgba(255,0,0,0.7))
      drop-shadow(${-splitPeak}px 0px 0px rgba(0,255,255,0.7))
    `,
    };
};

/** Pixelate — ramps up pixel size then down (great digital transition) */
export const pixelate = ({
    frame,
    startFrame,
    durationFrames = 30,
}: TransitionOptions): CSSProperties => {
    const p = interp(
        frame,
        [startFrame, startFrame + durationFrames],
        [0, 1],
        { easing: easeInOutCubic },
    );
    const size = Math.max(1, Math.round(Math.sin(p * Math.PI) * 30));
    return {
        imageRendering: 'pixelated',
        filter: `blur(0px)`,
        transform: `scale(${size}) scale(${1 / size})`,
    };
};

/**
 * Static/TV glitch overlay component — renders as an overlay layer.
 * Place this on top of your scene during the transition.
 *
 * @example
 * <AbsoluteFill>
 *   <SceneA style={outStyle} />
 *   <SceneB style={inStyle} />
 *   {frame >= 60 && frame <= 80 && <GlitchOverlay startFrame={60} durationFrames={20} />}
 * </AbsoluteFill>
 */
export const GlitchOverlay: React.FC<{
    startFrame: number;
    durationFrames: number;
    intensity?: number;
}> = ({ startFrame, durationFrames, intensity = 1 }) => {
    const frame = useCurrentFrame();
    const p = interp(frame, [startFrame, startFrame + durationFrames], [0, 1]);
    const glitchStrength = Math.sin(p * Math.PI) * intensity;

    const slices = Array.from({ length: 8 }, (_, i) => {
        const seed = i + frame * 13;
        const y = seededRandom(seed * 3) * 100;
        const h = seededRandom(seed * 7) * 10 + 1;
        const x = (seededRandom(seed * 11) - 0.5) * 40 * glitchStrength;
        const opacity = seededRandom(seed * 5) * glitchStrength;

        return (
            <div
                key={i}
                style={{
                    position: 'absolute',
                    top: `${y}%`,
                    left: 0,
                    right: 0,
                    height: `${h}%`,
                    overflow: 'hidden',
                    transform: `translateX(${x}px)`,
                    opacity,
                    backgroundColor: `rgba(${(seededRandom(seed) * 255) | 0},${(seededRandom(seed + 1) * 255) | 0},${(seededRandom(seed + 2) * 255) | 0},0.3)`,
                    mixBlendMode: 'screen',
                }}
            />
        );
    });

    return (
        <div
            style={{
                position: 'absolute',
                inset: 0,
                overflow: 'hidden',
                pointerEvents: 'none',
            }}
        >
            {slices}
        </div>
    );
};

/** VHS rewind — scanlines and color distortion like a tape rewind */
export const vhsRewind = ({
    frame,
    startFrame,
    durationFrames = 25,
}: TransitionOptions): CSSProperties => {
    const p = interp(frame, [startFrame, startFrame + durationFrames], [0, 1]);
    const noise = Math.sin(frame * 47.3) * 0.05;
    return {
        filter: `hue-rotate(${p * 360}deg) saturate(${1 + p * 2}) brightness(${1 + noise})`,
        transform: `scaleY(${1 + noise * 3})`,
    };
};
