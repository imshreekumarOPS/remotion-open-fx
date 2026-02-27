import { CSSProperties } from 'react';
import { interp } from '../utils/interpolate';
import { easeInCubic, easeInBack } from '../utils/easing';
import type { EasingFn } from '../utils/easing';

export interface ExitOptions {
    frame: number;
    startFrame: number;
    durationFrames?: number;
    easing?: EasingFn;
}

export const fadeOut = ({
    frame,
    startFrame,
    durationFrames = 30,
    easing = easeInCubic,
}: ExitOptions): CSSProperties => ({
    opacity: interp(frame, [startFrame, startFrame + durationFrames], [1, 0], {
        easing,
    }),
});

export const slideOutLeft = ({
    frame,
    startFrame,
    durationFrames = 30,
    easing = easeInCubic,
    distance = 100,
}: ExitOptions & { distance?: number }): CSSProperties => ({
    opacity: interp(frame, [startFrame, startFrame + durationFrames], [1, 0], {
        easing,
    }),
    transform: `translateX(${interp(frame, [startFrame, startFrame + durationFrames], [0, -distance], { easing })}px)`,
});

export const slideOutRight = ({
    frame,
    startFrame,
    durationFrames = 30,
    easing = easeInCubic,
    distance = 100,
}: ExitOptions & { distance?: number }): CSSProperties => ({
    opacity: interp(frame, [startFrame, startFrame + durationFrames], [1, 0], {
        easing,
    }),
    transform: `translateX(${interp(frame, [startFrame, startFrame + durationFrames], [0, distance], { easing })}px)`,
});

export const slideOutUp = ({
    frame,
    startFrame,
    durationFrames = 30,
    easing = easeInCubic,
    distance = 60,
}: ExitOptions & { distance?: number }): CSSProperties => ({
    opacity: interp(frame, [startFrame, startFrame + durationFrames], [1, 0], {
        easing,
    }),
    transform: `translateY(${interp(frame, [startFrame, startFrame + durationFrames], [0, -distance], { easing })}px)`,
});

export const slideOutDown = ({
    frame,
    startFrame,
    durationFrames = 30,
    easing = easeInCubic,
    distance = 60,
}: ExitOptions & { distance?: number }): CSSProperties => ({
    opacity: interp(frame, [startFrame, startFrame + durationFrames], [1, 0], {
        easing,
    }),
    transform: `translateY(${interp(frame, [startFrame, startFrame + durationFrames], [0, distance], { easing })}px)`,
});

export const scaleOut = ({
    frame,
    startFrame,
    durationFrames = 30,
    easing = easeInBack,
    toScale = 0,
}: ExitOptions & { toScale?: number }): CSSProperties => ({
    opacity: interp(frame, [startFrame, startFrame + durationFrames], [1, 0], {
        easing,
    }),
    transform: `scale(${interp(frame, [startFrame, startFrame + durationFrames], [1, toScale], { easing })})`,
});

export const irisOut = ({
    frame,
    startFrame,
    durationFrames = 40,
    easing = easeInCubic,
}: ExitOptions): CSSProperties => {
    const r = interp(
        frame,
        [startFrame, startFrame + durationFrames],
        [150, 0],
        { easing },
    );
    return { clipPath: `circle(${r}% at 50% 50%)` };
};

/** Burst out — scale up while fading out (like a cinematic cut) */
export const burstOut = ({
    frame,
    startFrame,
    durationFrames = 20,
    easing = easeInCubic,
}: ExitOptions): CSSProperties => {
    const p = interp(frame, [startFrame, startFrame + durationFrames], [0, 1], {
        easing,
    });
    return {
        opacity: 1 - p,
        transform: `scale(${1 + p * 0.3})`,
    };
};
