import { CSSProperties } from 'react';
import { interp } from '../utils/interpolate';
import { easeOutCubic, easeOutBack, easeOutElastic } from '../utils/easing';
import type { EasingFn } from '../utils/easing';

export interface EntranceOptions {
    frame: number;
    startFrame?: number;
    durationFrames?: number;
    easing?: EasingFn;
}

// ─── Fade ────────────────────────────────────────────────────────────────────

/**
 * Fade in from transparent to visible.
 * @example
 * <div style={fadeIn({ frame, startFrame: 0, durationFrames: 30 })} />
 */
export const fadeIn = ({
    frame,
    startFrame = 0,
    durationFrames = 30,
    easing = easeOutCubic,
}: EntranceOptions): CSSProperties => ({
    opacity: interp(frame, [startFrame, startFrame + durationFrames], [0, 1], {
        easing,
    }),
});

// ─── Slide ───────────────────────────────────────────────────────────────────

/** Slide in from the left */
export const slideInLeft = ({
    frame,
    startFrame = 0,
    durationFrames = 30,
    easing = easeOutCubic,
    distance = 100,
}: EntranceOptions & { distance?: number }): CSSProperties => ({
    opacity: interp(frame, [startFrame, startFrame + durationFrames], [0, 1], {
        easing,
    }),
    transform: `translateX(${interp(frame, [startFrame, startFrame + durationFrames], [-distance, 0], { easing })}px)`,
});

/** Slide in from the right */
export const slideInRight = ({
    frame,
    startFrame = 0,
    durationFrames = 30,
    easing = easeOutCubic,
    distance = 100,
}: EntranceOptions & { distance?: number }): CSSProperties => ({
    opacity: interp(frame, [startFrame, startFrame + durationFrames], [0, 1], {
        easing,
    }),
    transform: `translateX(${interp(frame, [startFrame, startFrame + durationFrames], [distance, 0], { easing })}px)`,
});

/** Slide in from the bottom */
export const slideInUp = ({
    frame,
    startFrame = 0,
    durationFrames = 30,
    easing = easeOutCubic,
    distance = 60,
}: EntranceOptions & { distance?: number }): CSSProperties => ({
    opacity: interp(frame, [startFrame, startFrame + durationFrames], [0, 1], {
        easing,
    }),
    transform: `translateY(${interp(frame, [startFrame, startFrame + durationFrames], [distance, 0], { easing })}px)`,
});

/** Slide in from the top */
export const slideInDown = ({
    frame,
    startFrame = 0,
    durationFrames = 30,
    easing = easeOutCubic,
    distance = 60,
}: EntranceOptions & { distance?: number }): CSSProperties => ({
    opacity: interp(frame, [startFrame, startFrame + durationFrames], [0, 1], {
        easing,
    }),
    transform: `translateY(${interp(frame, [startFrame, startFrame + durationFrames], [-distance, 0], { easing })}px)`,
});

// ─── Scale ───────────────────────────────────────────────────────────────────

/** Scale in from small to full size */
export const scaleIn = ({
    frame,
    startFrame = 0,
    durationFrames = 30,
    easing = easeOutBack,
    fromScale = 0.5,
}: EntranceOptions & { fromScale?: number }): CSSProperties => ({
    opacity: interp(frame, [startFrame, startFrame + durationFrames], [0, 1], {
        easing,
    }),
    transform: `scale(${interp(frame, [startFrame, startFrame + durationFrames], [fromScale, 1], { easing })})`,
});

/** Pop in with elastic overshoot */
export const popIn = ({
    frame,
    startFrame = 0,
    durationFrames = 40,
    fromScale = 0,
}: EntranceOptions & { fromScale?: number }): CSSProperties => ({
    opacity: interp(frame, [startFrame, startFrame + 10], [0, 1]),
    transform: `scale(${interp(frame, [startFrame, startFrame + durationFrames], [fromScale, 1], {
        easing: easeOutElastic,
    })})`,
});

// ─── Flip ────────────────────────────────────────────────────────────────────

/** Flip in around Y axis (like a card flip) */
export const flipInY = ({
    frame,
    startFrame = 0,
    durationFrames = 40,
    easing = easeOutCubic,
}: EntranceOptions): CSSProperties => {
    const rotY = interp(
        frame,
        [startFrame, startFrame + durationFrames],
        [-90, 0],
        { easing },
    );
    return {
        opacity: interp(
            frame,
            [startFrame, startFrame + durationFrames * 0.3],
            [0, 1],
        ),
        transform: `perspective(600px) rotateY(${rotY}deg)`,
        backfaceVisibility: 'hidden',
    };
};

/** Flip in around X axis */
export const flipInX = ({
    frame,
    startFrame = 0,
    durationFrames = 40,
    easing = easeOutCubic,
}: EntranceOptions): CSSProperties => {
    const rotX = interp(
        frame,
        [startFrame, startFrame + durationFrames],
        [90, 0],
        { easing },
    );
    return {
        opacity: interp(
            frame,
            [startFrame, startFrame + durationFrames * 0.3],
            [0, 1],
        ),
        transform: `perspective(600px) rotateX(${rotX}deg)`,
        backfaceVisibility: 'hidden',
    };
};

// ─── Reveal / Clip ───────────────────────────────────────────────────────────

/** Reveal from left using clip-path */
export const revealFromLeft = ({
    frame,
    startFrame = 0,
    durationFrames = 30,
    easing = easeOutCubic,
}: EntranceOptions): CSSProperties => {
    const pct = interp(
        frame,
        [startFrame, startFrame + durationFrames],
        [0, 100],
        { easing },
    );
    return {
        clipPath: `inset(0 ${100 - pct}% 0 0)`,
    };
};

/** Reveal from bottom using clip-path */
export const revealFromBottom = ({
    frame,
    startFrame = 0,
    durationFrames = 30,
    easing = easeOutCubic,
}: EntranceOptions): CSSProperties => {
    const pct = interp(
        frame,
        [startFrame, startFrame + durationFrames],
        [100, 0],
        { easing },
    );
    return {
        clipPath: `inset(${pct}% 0 0 0)`,
    };
};

/** Iris reveal — circular expand from center */
export const irisIn = ({
    frame,
    startFrame = 0,
    durationFrames = 40,
    easing = easeOutCubic,
}: EntranceOptions): CSSProperties => {
    const r = interp(
        frame,
        [startFrame, startFrame + durationFrames],
        [0, 150],
        { easing },
    );
    return {
        clipPath: `circle(${r}% at 50% 50%)`,
    };
};

// ─── Combo Entrances ─────────────────────────────────────────────────────────

/** Fly in from bottom with scale — great for feature callouts */
export const flyIn = ({
    frame,
    startFrame = 0,
    durationFrames = 35,
    easing = easeOutBack,
}: EntranceOptions): CSSProperties => {
    const p = interp(frame, [startFrame, startFrame + durationFrames], [0, 1], {
        easing,
    });
    return {
        opacity: Math.min(p * 2, 1),
        transform: `translateY(${(1 - p) * 80}px) scale(${0.7 + p * 0.3})`,
    };
};

/** Glide in — subtle, professional entrance for text/UI */
export const glideIn = ({
    frame,
    startFrame = 0,
    durationFrames = 45,
    easing = easeOutCubic,
    direction = 'up' as 'up' | 'down' | 'left' | 'right',
}: EntranceOptions & {
    direction?: 'up' | 'down' | 'left' | 'right';
}): CSSProperties => {
    const dist = 30;
    const p = interp(frame, [startFrame, startFrame + durationFrames], [0, 1], {
        easing,
    });
    const offsets = {
        up: `translateY(${(1 - p) * dist}px)`,
        down: `translateY(${-(1 - p) * dist}px)`,
        left: `translateX(${(1 - p) * dist}px)`,
        right: `translateX(${-(1 - p) * dist}px)`,
    };
    return { opacity: p, transform: offsets[direction] };
};
