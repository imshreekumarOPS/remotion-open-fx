import { CSSProperties } from 'react';
import { interp } from '../utils/interpolate';
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
    width?: number;
    height?: number;
}

const tp = (
    frame: number,
    startFrame: number,
    dur: number,
    ease: EasingFn,
) => interp(frame, [startFrame, startFrame + dur], [0, 1], { easing: ease });

// ─── Wipes ───────────────────────────────────────────────────────────────────

/**
 * Wipe Left — outgoing scene slides/clips away to the left, incoming reveals from right.
 * @example
 * const { outStyle, inStyle } = wipeLeft({ frame, startFrame: 60, durationFrames: 20 });
 */
export const wipeLeft = ({
    frame,
    startFrame,
    durationFrames = 20,
    easing = easeInOutCubic,
}: TransitionOptions): TransitionStyles => {
    const p = tp(frame, startFrame, durationFrames, easing);
    return {
        outStyle: { clipPath: `inset(0 ${p * 100}% 0 0)` },
        inStyle: { clipPath: `inset(0 0 0 ${(1 - p) * 100}%)` },
    };
};

export const wipeRight = ({
    frame,
    startFrame,
    durationFrames = 20,
    easing = easeInOutCubic,
}: TransitionOptions): TransitionStyles => {
    const p = tp(frame, startFrame, durationFrames, easing);
    return {
        outStyle: { clipPath: `inset(0 0 0 ${p * 100}%)` },
        inStyle: { clipPath: `inset(0 ${(1 - p) * 100}% 0 0)` },
    };
};

export const wipeUp = ({
    frame,
    startFrame,
    durationFrames = 20,
    easing = easeInOutCubic,
}: TransitionOptions): TransitionStyles => {
    const p = tp(frame, startFrame, durationFrames, easing);
    return {
        outStyle: { clipPath: `inset(0 0 ${p * 100}% 0)` },
        inStyle: { clipPath: `inset(${(1 - p) * 100}% 0 0 0)` },
    };
};

export const wipeDown = ({
    frame,
    startFrame,
    durationFrames = 20,
    easing = easeInOutCubic,
}: TransitionOptions): TransitionStyles => {
    const p = tp(frame, startFrame, durationFrames, easing);
    return {
        outStyle: { clipPath: `inset(${p * 100}% 0 0 0)` },
        inStyle: { clipPath: `inset(0 0 ${(1 - p) * 100}% 0)` },
    };
};

/** Diagonal wipe — cinematic diagonal cut */
export const wipeDiagonal = ({
    frame,
    startFrame,
    durationFrames = 25,
    easing = easeInOutCubic,
}: TransitionOptions): TransitionStyles => {
    const p = tp(frame, startFrame, durationFrames, easing);
    const pct = p * 200 - 100;
    return {
        outStyle: {
            clipPath: `polygon(${pct}% 0%, 100% 0%, 100% 100%, ${pct + 100}% 100%)`,
        },
        inStyle: {
            clipPath: `polygon(0 0, ${pct + 100}% 0%, ${pct}% 100%, 0 100%)`,
        },
    };
};

/** Barn doors — center split opening left and right */
export const barnDoors = ({
    frame,
    startFrame,
    durationFrames = 25,
    easing = easeInOutCubic,
}: TransitionOptions): TransitionStyles => {
    const p = tp(frame, startFrame, durationFrames, easing);
    return {
        outStyle: {
            clipPath: `inset(0 ${p * 50}% 0 ${p * 50}%)`,
        },
        inStyle: {
            opacity: p,
        },
    };
};

/** Iris transition — circle reveal from center */
export const irisTransition = ({
    frame,
    startFrame,
    durationFrames = 30,
    easing = easeInOutCubic,
}: TransitionOptions): TransitionStyles => {
    const p = tp(frame, startFrame, durationFrames, easing);
    return {
        outStyle: { clipPath: `circle(${(1 - p) * 75}% at 50% 50%)` },
        inStyle: { clipPath: `circle(${p * 75}% at 50% 50%)` },
    };
};
