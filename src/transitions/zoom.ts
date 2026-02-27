import { CSSProperties } from 'react';
import { interp } from '../utils/interpolate';
import { easeInOutCubic } from '../utils/easing';
import type { EasingFn } from '../utils/easing';

const tp = (
    frame: number,
    startFrame: number,
    dur: number,
    ease: EasingFn,
) => interp(frame, [startFrame, startFrame + dur], [0, 1], { easing: ease });

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

/** Cross dissolve — classic cinematic fade */
export const crossDissolve = ({
    frame,
    startFrame,
    durationFrames = 20,
    easing = easeInOutCubic,
}: TransitionOptions): TransitionStyles => {
    const p = tp(frame, startFrame, durationFrames, easing);
    return {
        outStyle: { opacity: 1 - p },
        inStyle: { opacity: p },
    };
};

/** Zoom out transition — outgoing zooms out, incoming appears */
export const zoomOut = ({
    frame,
    startFrame,
    durationFrames = 25,
    easing = easeInOutCubic,
}: TransitionOptions): TransitionStyles => {
    const p = tp(frame, startFrame, durationFrames, easing);
    return {
        outStyle: {
            transform: `scale(${1 + p * 0.3})`,
            opacity: 1 - p,
        },
        inStyle: { opacity: p },
    };
};

/** Zoom in transition — outgoing shrinks, incoming zooms in */
export const zoomIn = ({
    frame,
    startFrame,
    durationFrames = 25,
    easing = easeInOutCubic,
}: TransitionOptions): TransitionStyles => {
    const p = tp(frame, startFrame, durationFrames, easing);
    return {
        outStyle: {
            transform: `scale(${1 - p * 0.3})`,
            opacity: 1 - p,
        },
        inStyle: {
            transform: `scale(${0.7 + p * 0.3})`,
            opacity: p,
        },
    };
};

/** Push Left — outgoing slides left, incoming pushes from right */
export const pushLeft = ({
    frame,
    startFrame,
    durationFrames = 25,
    easing = easeInOutCubic,
}: TransitionOptions): TransitionStyles => {
    const p = tp(frame, startFrame, durationFrames, easing);
    return {
        outStyle: { transform: `translateX(${-p * 100}%)` },
        inStyle: { transform: `translateX(${(1 - p) * 100}%)` },
    };
};

/** Push Right — opposite direction */
export const pushRight = ({
    frame,
    startFrame,
    durationFrames = 25,
    easing = easeInOutCubic,
}: TransitionOptions): TransitionStyles => {
    const p = tp(frame, startFrame, durationFrames, easing);
    return {
        outStyle: { transform: `translateX(${p * 100}%)` },
        inStyle: { transform: `translateX(${-(1 - p) * 100}%)` },
    };
};

/** Dolly zoom — Vertigo effect, zoom + scale inverse */
export const dollyZoom = ({
    frame,
    startFrame,
    durationFrames = 40,
    easing = easeInOutCubic,
    intensity = 0.3,
}: TransitionOptions & { intensity?: number }): TransitionStyles => {
    const p = tp(frame, startFrame, durationFrames, easing);
    return {
        outStyle: {
            transform: `scale(${1 + p * intensity}) perspective(${1000 - p * 400}px) translateZ(${-p * 200}px)`,
            opacity: 1 - p,
        },
        inStyle: { opacity: p },
    };
};

/** Flash frame — single white frame flash between scenes (impact cut) */
export const flashCut = ({
    frame,
    startFrame,
    durationFrames = 8,
}: TransitionOptions): {
    overlay: CSSProperties;
    outStyle: CSSProperties;
    inStyle: CSSProperties;
} => {
    const p = interp(frame, [startFrame, startFrame + durationFrames], [0, 1]);
    const flashOpacity = p < 0.5 ? p * 2 : (1 - p) * 2;
    return {
        overlay: {
            backgroundColor: 'white',
            opacity: flashOpacity,
            position: 'absolute',
            inset: 0,
        },
        outStyle: { opacity: p < 0.5 ? 1 : 0 },
        inStyle: { opacity: p >= 0.5 ? 1 : 0 },
    };
};
