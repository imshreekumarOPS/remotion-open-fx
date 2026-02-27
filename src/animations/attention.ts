import { CSSProperties } from 'react';
import { oscillate, pingPong, loopProgress } from '../utils/interpolate';
import { lerp, seededRandom } from '../utils/math';

export interface AttentionOptions {
    frame: number;
    intensity?: number; // 0–1 scale for effect strength
}

/**
 * Pulse — rhythmic scale pulse. Great for live indicators or CTA buttons.
 * @example <div style={pulse({ frame, intensity: 0.15, frequency: 1.5 })} />
 */
export const pulse = ({
    frame,
    intensity = 0.1,
    frequency = 1,
    fps = 30,
}: AttentionOptions & {
    frequency?: number;
    fps?: number;
}): CSSProperties => {
    const scale = 1 + oscillate({ frame, frequency, fps, amplitude: intensity });
    return { transform: `scale(${scale})` };
};

/**
 * Shake — horizontal shake. Great for error states or impact moments.
 */
export const shake = ({
    frame,
    intensity = 10,
    frequency = 4,
    fps = 30,
}: AttentionOptions & {
    frequency?: number;
    fps?: number;
}): CSSProperties => {
    const x = oscillate({ frame, frequency, fps, amplitude: intensity });
    return { transform: `translateX(${x}px)` };
};

/**
 * Bounce — vertical bounce loop.
 */
export const bounce = ({
    frame,
    intensity = 15,
    cycleDuration = 30,
}: AttentionOptions & { cycleDuration?: number }): CSSProperties => {
    const p = pingPong(frame, cycleDuration);
    const y = Math.abs(Math.sin(p * Math.PI)) * intensity;
    return { transform: `translateY(${-y}px)` };
};

/**
 * Wiggle — random jitter/shake. Great for text effects or screen shake.
 */
export const wiggle = ({
    frame,
    intensity = 5,
}: AttentionOptions): CSSProperties => {
    const x = (seededRandom(frame * 7.3) - 0.5) * 2 * intensity;
    const y = (seededRandom(frame * 3.7) - 0.5) * 2 * intensity;
    return { transform: `translate(${x}px, ${y}px)` };
};

/**
 * Flash — rapid opacity flash. Great for impact, alerts, lightning.
 */
export const flash = ({
    frame,
    intensity = 1,
    cycleDuration = 10,
}: AttentionOptions & { cycleDuration?: number }): CSSProperties => {
    const p = loopProgress(frame, cycleDuration);
    return { opacity: p < 0.5 ? intensity : 1 };
};

/**
 * Swing — pendulum rotation. Great for hanging/dangling elements.
 */
export const swing = ({
    frame,
    intensity = 15,
    frequency = 0.8,
    fps = 30,
}: AttentionOptions & {
    frequency?: number;
    fps?: number;
}): CSSProperties => {
    const rot = oscillate({ frame, frequency, fps, amplitude: intensity });
    return {
        transform: `rotate(${rot}deg)`,
        transformOrigin: 'top center',
    };
};

/**
 * Heartbeat — double-pulse like a real heartbeat. Great for like buttons.
 */
export const heartbeat = ({
    frame,
    intensity = 0.15,
    cycleDuration = 45,
}: AttentionOptions & { cycleDuration?: number }): CSSProperties => {
    const t = loopProgress(frame, cycleDuration);
    // Two quick pulses then rest
    const pulse1 = t < 0.12 ? Math.sin((t / 0.12) * Math.PI) : 0;
    const pulse2 =
        t > 0.18 && t < 0.3
            ? Math.sin(((t - 0.18) / 0.12) * Math.PI) * 0.6
            : 0;
    const scale = 1 + (pulse1 + pulse2) * intensity;
    return { transform: `scale(${scale})` };
};

/**
 * Glimmer — moving highlight shimmer. Great for gold/luxury elements.
 */
export const glimmer = ({
    frame,
    cycleDuration = 90,
}: AttentionOptions & { cycleDuration?: number }): CSSProperties => {
    const p = loopProgress(frame, cycleDuration);
    const pos = lerp(-100, 200, p);
    return {
        backgroundImage: `linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.4) 50%, transparent 60%)`,
        backgroundPosition: `${pos}% 0`,
        backgroundSize: '200% 100%',
    };
};
