import { CSSProperties } from 'react';
import { interp } from '../utils/interpolate';
import { easeOutCubic, easeInOutCubic } from '../utils/easing';
import type { EasingFn } from '../utils/easing';

export interface ThreeDOptions {
    frame: number;
    startFrame?: number;
    durationFrames?: number;
    easing?: EasingFn;
    perspective?: number;
}

/** Rotate in from below (tilt down to flat) */
export const tiltIn = ({
    frame,
    startFrame = 0,
    durationFrames = 40,
    easing = easeOutCubic,
    perspective = 800,
}: ThreeDOptions): CSSProperties => ({
    perspective: `${perspective}px`,
    transform: `rotateX(${interp(frame, [startFrame, startFrame + durationFrames], [45, 0], { easing })}deg)`,
    opacity: interp(
        frame,
        [startFrame, startFrame + durationFrames * 0.4],
        [0, 1],
    ),
});

/** Card flip — rotate 180° around Y axis to reveal back */
export const cardFlip = ({
    frame,
    startFrame = 0,
    durationFrames = 50,
    easing = easeInOutCubic,
    perspective = 1000,
}: ThreeDOptions): { front: CSSProperties; back: CSSProperties } => {
    const rot = interp(
        frame,
        [startFrame, startFrame + durationFrames],
        [0, 180],
        { easing },
    );
    return {
        front: {
            transform: `perspective(${perspective}px) rotateY(${rot}deg)`,
            backfaceVisibility: 'hidden',
            opacity: rot < 90 ? 1 : 0,
        },
        back: {
            transform: `perspective(${perspective}px) rotateY(${rot - 180}deg)`,
            backfaceVisibility: 'hidden',
            opacity: rot >= 90 ? 1 : 0,
        },
    };
};

/** 3D push from depth — element flies toward camera */
export const pushFromDepth = ({
    frame,
    startFrame = 0,
    durationFrames = 35,
    easing = easeOutCubic,
    perspective = 800,
}: ThreeDOptions): CSSProperties => {
    const z = interp(
        frame,
        [startFrame, startFrame + durationFrames],
        [-300, 0],
        { easing },
    );
    return {
        transform: `perspective(${perspective}px) translateZ(${z}px)`,
        opacity: interp(
            frame,
            [startFrame, startFrame + durationFrames * 0.5],
            [0, 1],
        ),
    };
};

/** Parallax depth offset — for layered scene depth effects */
export const parallax = ({
    depthFactor = 1,
    scrollY = 0,
}: {
    frame: number;
    depthFactor?: number;
    scrollY?: number;
}): CSSProperties => ({
    transform: `translateY(${scrollY * depthFactor * -1}px)`,
});
