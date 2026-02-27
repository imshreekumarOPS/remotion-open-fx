import { interpolate } from 'remotion';
import type { EasingFn } from './easing';

export interface InterpOptions {
    easing?: EasingFn;
    extrapolateLeft?: 'clamp' | 'extend' | 'wrap';
    extrapolateRight?: 'clamp' | 'extend' | 'wrap';
}

// ─── Core ────────────────────────────────────────────────────────────────────

/**
 * Clamp-by-default interpolation.
 * The safest and most common animation primitive.
 *
 * @example
 * const opacity = interp(frame, [0, 30], [0, 1]);
 */
export const interp = (
    frame: number,
    inputRange: [number, number],
    outputRange: [number, number],
    options?: InterpOptions,
): number =>
    interpolate(frame, inputRange, outputRange, {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        ...options,
    });

/**
 * Get normalized progress in [0, 1] for a frame window.
 * Optionally apply an easing function.
 *
 * @example
 * const p = progress(frame, 30, 60, Easing.easeOutCubic);
 * // At frame 30 → 0.0, at frame 90 → 1.0, values eased
 */
export const progress = (
    frame: number,
    startFrame: number,
    durationFrames: number,
    easing?: EasingFn,
): number => {
    const raw = interp(frame, [startFrame, startFrame + durationFrames], [0, 1]);
    return easing ? easing(raw) : raw;
};

// ─── Spring Physics ─────────────────────────────────────────────────────────

export interface SpringOptions {
    frame: number;
    from?: number;
    to?: number;
    damping?: number; // default 10  — higher = less bounce
    stiffness?: number; // default 100 — higher = faster
    mass?: number; // default 1   — higher = heavier/slower
    fps?: number; // default 30
}

/**
 * Physics spring animation — no pre-set duration, settles naturally.
 * Use for UI elements, character motion, camera work.
 *
 * @example
 * const y = springValue({
 *   frame,
 *   from: 100,
 *   to: 0,
 *   damping: 12,
 *   stiffness: 200,
 * });
 */
export const springValue = ({
    frame,
    from = 0,
    to = 1,
    damping = 10,
    stiffness = 100,
    mass = 1,
    fps = 30,
}: SpringOptions): number => {
    const omega = Math.sqrt(stiffness / mass);
    const zeta = damping / (2 * Math.sqrt(stiffness * mass));
    const t = frame / fps;

    let disp: number;
    if (zeta < 1) {
        const omegaD = omega * Math.sqrt(1 - zeta * zeta);
        disp =
            1 -
            Math.exp(-zeta * omega * t) *
            (Math.cos(omegaD * t) +
                (zeta / Math.sqrt(1 - zeta * zeta)) * Math.sin(omegaD * t));
    } else {
        disp = 1 - Math.exp(-omega * t) * (1 + omega * t);
    }

    const clamped = Math.max(-0.5, Math.min(1.5, disp)); // allow slight overshoot
    return from + (to - from) * clamped;
};

// ─── Stagger ─────────────────────────────────────────────────────────────────

export interface StaggerOptions {
    frame: number;
    index: number;
    count: number;
    durationFrames: number;
    delayPerItem?: number; // frames between each item's start
    easing?: EasingFn;
}

/**
 * Stagger — get per-item progress for list animations.
 * Each item starts slightly after the previous.
 *
 * @example
 * {items.map((item, i) => {
 *   const p = stagger({ frame, index: i, count: items.length, durationFrames: 20, delayPerItem: 4 });
 *   return <div style={{ opacity: p, transform: `translateY(${(1 - p) * 20}px)` }}>{item}</div>;
 * })}
 */
export const stagger = ({
    frame,
    index,
    count,
    durationFrames,
    delayPerItem = 5,
    easing,
}: StaggerOptions): number => {
    const startFrame = index * delayPerItem;
    return progress(frame, startFrame, durationFrames, easing);
};

// ─── Oscillators ─────────────────────────────────────────────────────────────

/**
 * Sine wave oscillator — repeating smooth wave.
 *
 * @example
 * const y = oscillate({ frame, frequency: 2, fps: 30, amplitude: 10 });
 * // Oscillates between -10 and +10, completing 2 cycles per second
 */
export const oscillate = ({
    frame,
    frequency = 1,
    fps = 30,
    amplitude = 1,
    phase = 0,
}: {
    frame: number;
    frequency?: number;
    fps?: number;
    amplitude?: number;
    phase?: number;
}): number => {
    const t = frame / fps;
    return Math.sin(2 * Math.PI * frequency * t + phase) * amplitude;
};

/**
 * Looping progress — progress that loops back to 0 after each cycle.
 *
 * @example
 * const loop = loopProgress(frame, 60); // 0→1 every 60 frames
 */
export const loopProgress = (
    frame: number,
    cycleDuration: number,
): number => (frame % cycleDuration) / cycleDuration;

/**
 * Ping-pong — bounces between 0 and 1.
 *
 * @example
 * const scale = 1 + pingPong(frame, 30) * 0.1;
 */
export const pingPong = (
    frame: number,
    cycleDuration: number,
): number => {
    const t = loopProgress(frame, cycleDuration * 2);
    return t < 0.5 ? t * 2 : 2 - t * 2;
};
