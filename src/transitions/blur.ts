import { CSSProperties } from 'react';
import { interp } from '../utils/interpolate';
import { easeInOutCubic, easeInOutSine } from '../utils/easing';

export interface TransitionStyles {
    outStyle: CSSProperties;
    inStyle: CSSProperties;
}
export interface TransitionOptions {
    frame: number;
    startFrame: number;
    durationFrames?: number;
}

/** Cross Blur — both scenes blurred through mid-point */
export const crossBlur = ({
    frame,
    startFrame,
    durationFrames = 30,
}: TransitionOptions): TransitionStyles => {
    const p = interp(
        frame,
        [startFrame, startFrame + durationFrames],
        [0, 1],
        { easing: easeInOutCubic },
    );
    const blurAmount = Math.sin(p * Math.PI) * 20;
    return {
        outStyle: { filter: `blur(${blurAmount}px)`, opacity: 1 - p },
        inStyle: { filter: `blur(${blurAmount}px)`, opacity: p },
    };
};

/** Focus Pull — rack focus from sharp to blurry (scene out) then in (new scene) */
export const focusPull = ({
    frame,
    startFrame,
    durationFrames = 40,
    maxBlur = 15,
}: TransitionOptions & { maxBlur?: number }): TransitionStyles => {
    const p = interp(
        frame,
        [startFrame, startFrame + durationFrames],
        [0, 1],
        { easing: easeInOutSine },
    );
    return {
        outStyle: {
            filter: `blur(${p * maxBlur}px)`,
            opacity: 1 - Math.min(p * 1.5, 1),
        },
        inStyle: {
            filter: `blur(${(1 - p) * maxBlur}px)`,
            opacity: Math.max((p - 0.3) * 1.5, 0),
        },
    };
};

/** Motion Blur Wipe — directional motion blur smear */
export const motionBlurWipe = ({
    frame,
    startFrame,
    durationFrames = 20,
    direction = 'horizontal' as 'horizontal' | 'vertical',
}: TransitionOptions & {
    direction?: 'horizontal' | 'vertical';
}): TransitionStyles => {
    const p = interp(frame, [startFrame, startFrame + durationFrames], [0, 1]);
    const blurPeak = Math.sin(p * Math.PI) * 15;
    return {
        outStyle: {
            filter: `blur(${blurPeak}px)`,
            transform:
                direction === 'horizontal'
                    ? `translateX(${-p * 100}%) scaleX(${1 + blurPeak * 0.05})`
                    : `translateY(${-p * 100}%)`,
        },
        inStyle: {
            filter: `blur(${blurPeak}px)`,
            transform:
                direction === 'horizontal'
                    ? `translateX(${(1 - p) * 100}%)`
                    : `translateY(${(1 - p) * 100}%)`,
        },
    };
};
